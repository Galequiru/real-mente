use reqwest::Client;
use rocket::serde::{json::{serde_json, Json}, Deserialize, Serialize};
use rocket_db_pools::mongodb::Collection;

use super::*;
use crate::{models::{PendingPayment, Proveedor}, with_message};

const URL_MP: &str = "http://mercadopago_integration:8001";

#[derive(Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct ExternalReference {
	pub email: String,
	pub products: Vec<String>
}

async fn check_existing_product(
	collection: &Collection<Proveedor>,
	email: &str,
	products: &[String],
) -> Result<(), Custom<Json<Value>>> {
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
	if user.cenarios.iter().any(
		|cenario| products.contains(cenario)
	) {
		Err(Custom(Status::BadRequest,
			Json(json!({
				"status": "error",
				"message": "At least one of the products already is owned"
			}))
		))
	// search on the users's waiting for payment products
	} else if user.pendings.into_iter().flat_map(|pending| pending.products).any(
		|cenario| products.contains(&cenario)
	) {
		Err(Custom(Status::BadRequest,
			Json(json!({
				"status": "error",
				"message": "At least one of the products is already pending"
			}))
		))
	} else {
		Ok(())
	}
}

async fn register_payment(
	collection: &Collection<Proveedor>,
	payment_id: String,
	payment_data: ExternalReference
) -> Result<Custom<Json<Value>>, Custom<Json<Value>>> {
	let mut user = collection
		.find_one(doc! {
			"email": payment_data.email,
		}, None)
		.await
		// error with database
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

	user.pendings.push(PendingPayment {
		payment_id: payment_id,
		products: payment_data.products
	});

	let result = collection.update_one(
		doc! { "email": &user.email },
		doc! { "$set": { "pendings": user.pendings } },
		None
	)
	.await
	.map_err(with_message!("Error updating user info"))?;

	if result.modified_count != 0 {
		Ok(Custom(Status::Ok,
			Json(json!({
				"status": "success",
				"message": "User's pending list updated successfully"
			}))
		))
	} else {
		Err(Custom(Status::InternalServerError,
			Json(json!({
				"status": "error",
				"message": "Error when updating users pending list"
			}))
		))
	}
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
		.collection("proveedores");

	check_existing_product(
		&collection,
		&data.email,
		&data.products
	).await?;

	let client = Client::new();
	let body = json!({
		"email": &data.email,
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

	if status.is_success() {
		register_payment(
			&collection,
			body["id"].as_str().unwrap().to_string(),
			serde_json::from_str(
				body["external_reference"].as_str().unwrap()
			).unwrap()
		).await
	} else {
		// forward the status and message
		Err(Custom(
			Status { code: status.into() },
			Json(json!({
				"status": "error",
				"message": body["message"].as_str().unwrap()
			}))
		))
	}
}
