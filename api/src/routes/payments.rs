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
