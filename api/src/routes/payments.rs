use reqwest::Client;
use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket_db_pools::mongodb::Collection;

use super::*;
use crate::{models::{PendingPayment, User}, with_message};

const URL_MP: &str = "http://mercadopago_integration:8001";

async fn check_existing_product(
	collection: &Collection<User>,
	email: &str,
	products: &[String],
) -> Result<User, Custom<Json<Value>>> {
	let user = collection
		.find_one(doc! {
			"email": email,
		}, None)
		.await
		// error reaching database
		.map_err(
			with_message!("Error fetching user info")
		)?
		// no user found
		.ok_or_else(|| Custom(Status::NotFound,
			Json(json!({
				"status": "error",
				"message": "User does not exist"
			}))
		))?;

	// search on the user's already owned products
	if user.products.iter().any(
		|cenario| products.contains(cenario)
	) {
		Err(Custom(Status::BadRequest,
			Json(json!({
				"status": "error",
				"message": "At least one of the products already is owned"
			}))
		))
	// search on the users's waiting for payment products
	} else if user.pendings.iter().any(|pending| pending.products.iter().any(
		|cenario| products.contains(cenario)
	)) {
		Err(Custom(Status::BadRequest,
			Json(json!({
				"status": "error",
				"message": "At least one of the products is already pending"
			}))
		))
	} else {
		Ok(user)
	}
}

async fn register_payment(
	collection: &Collection<User>,
	mut user: User,
	payment_id: String,
	products: Vec<String>
) -> Result<bool, Custom<Json<Value>>> {
	user.pendings.push(PendingPayment {
		payment_id,
		products
	});

	let result = collection.update_one(
		doc! { "email": &user.email },
		doc! { "$set": { "pendings": user.pendings } },
		None
	)
	.await
	.map_err(with_message!("Error updating user info"))?;

	Ok(result.modified_count != 0)
}

#[derive(Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct PaymentRequest {
	pub email: String,
	pub price: f64,
	pub products: Vec<String>,
	pub title: String
}

#[post("/create_payment", format="json", data = "<data>")]
pub async fn create_payment(
	db: Connection<MainDatabase>,
	data: Json<PaymentRequest>
) -> Result<Custom<Json<Value>>, Custom<Json<Value>>> {
	let collection = db
		.database(DATABASE)
		.collection(USERS_COLLECTION);

	let user = check_existing_product(
		&collection,
		&data.email,
		&data.products
	).await?;

	let client = Client::new();
	let body = json!({
		"email": data.email,
		"price": data.price,
		"title": data.title,
		"products": data.products
	});
	let url = format!("{URL_MP}/create_payment");

	let res = client.post(&url)
		.json(&body)
		.send()
		.await
		.map_err(with_message!("Error creating payment"))?;

	let status = res.status();

	let body = res.json::<Value>()
		.await
		.map_err(with_message!("Error reading payment server response"))?;

	if !status.is_success() {
		// forward the status and message
		return Err(Custom(
			Status { code: status.into() },
			Json(json!({
				"status": "error",
				"message": body["message"].as_str()
					.unwrap_or_default()
			}))
		))
	}
	if register_payment(
		&collection,
		user,
		String::from(body["id"].as_str()
			.ok_or_else(|| Custom(Status::FailedDependency,
				Json(json!({
					"status": "error",
					"message": "The payment server sent an unexpected response"
				}))
			))?
		),
		data.products.clone()
	).await? {
		Ok(Custom(Status::Ok,
			Json(json!({
				"status": "success",
				"message": "Users pending list updated successfully",
				"data": body
			}))
		))
	} else {
		// should not happen since the existance of the user was proven
		// when checking existing products
		Err(Custom(Status::NotFound,
			Json(json!({
				"status": "error",
				"message": "The user is not present on the database"
			}))
		))
	}
}

#[post("/check_user_payments/<email>", format="json")]
pub async fn check_user_payments(
	email: &str,
	db: Connection<MainDatabase>
) -> Result<Custom<Json<Value>>, Custom<Json<Value>>> {
	let collection = db.database(DATABASE)
		.collection::<User>(USERS_COLLECTION);

	let user = collection
		.find_one(doc! {
			"email": email,
		}, None)
		.await
		// error reaching database
		.map_err(
			with_message!("Error fetching user info")
		)?
		// no user found
		.ok_or_else(|| Custom(Status::NotFound,
			Json(json!({
				"status": "error",
				"message": "User does not exist"
			}))
		))?;

	let client = Client::new();

	let mut unlocked_products = vec![];
	let mut unpaid_pendings = vec![];

	// checks every pending payment of the user
	for pending in user.pendings.iter() {
		if check_payment(&pending.payment_id, &client).await? {
			unlocked_products.extend(pending.products.clone());
		} else {
			unpaid_pendings.push(pending.clone());
		}
	};

	update_payments(&collection, user, unlocked_products, unpaid_pendings).await
}

async fn check_payment(
	payment_id: &str,
	client: &Client
) -> Result<bool, Custom<Json<Value>>> {
	let url = format!("{URL_MP}/get_payment/{payment_id}");

	let res = client.post(&url)
		.send()
		.await
		.map_err(with_message!("Error connecting with the payment service"))?;

	// no payment for such id
	if res.status() == 404 {
		return Ok(false)
	}

	let body = res.json::<Value>()
		.await
		.map_err(with_message!("Error reading payment server response"))?;

	let order_status = body["order_status"].as_str()
		.ok_or_else( || Custom(Status::FailedDependency,
			Json(json!({
				"status": "error",
				"message": "The payment server sent an unexpected response"
			}))
		))?;

	Ok(order_status.eq_ignore_ascii_case("paid"))
}

async fn update_payments(
	collection: &Collection<User>,
	mut user: User,
	unlocked_products: Vec<String>,
	pending_payments: Vec<PendingPayment>
) -> Result<Custom<Json<Value>>, Custom<Json<Value>>> {
	user.pendings = pending_payments;
	user.products.extend(unlocked_products);

	let result = collection.update_one(
		doc! { "email": &user.email },
		doc! { "$set": {
			"pendings": &user.pendings,
			"products": &user.products
		} },
		None
	)
	.await
	.map_err(with_message!("Error updating user info"))?;

	// the user was updated
	if result.modified_count != 0 {
		Ok(Custom(Status::Ok,
			Json(json!({
				"status": "success",
				"message": "User's pending and products list updated successfully",
				"data": user
			}))
		))
	// user was found but not updated
	} else if result.matched_count != 0 {
		Ok(Custom(Status::Ok,
			Json(json!({
				"status": "success",
				"message": "The users products and pending list was not modified",
				"data": user
			}))
		))
	// user was not found
	} else {
		Err(Custom(Status::InternalServerError,
			Json(json!({
				"status": "error",
				"message": "The user was not found on the database"
			}))
		))
	}
}
