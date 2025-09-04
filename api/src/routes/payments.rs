use std::env;
use reqwest::Client;
use rocket::serde::{json::Json, Deserialize, Serialize};

use super::*;

const URL_MP: &str = "https://api.mercadopago.com";

#[derive(Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct PaymentRequest {
	pub price: f64,
	pub cenarios: Vec<String>,
	pub title: String
}

#[post("/create_payment", format="json", data = "<data>")]
pub async fn create_payment(
	data: Json<PaymentRequest>
) -> Custom<Json<Value>> {
	let access_token = env::var("MP_ACCESS_TOKEN").unwrap();

	let client = Client::new();
	let body = json!({
		"items": [{
            "title": data.title,
            "quantity": 1,
            "currency_id": "BRL",
            "unit_price": data.price
        }],

		"auto_return": "approved"
	});
	let url = format!("{}/checkout/preferences", URL_MP);

	match client.post(&url)
	.bearer_auth(access_token)
	.json(&body)
	.send()
	.await {
		Ok(res) => match res.json::<Value>().await {
			Ok(obj) => {
				println!("{}", obj);
				Custom(Status::Ok,
					Json(json!({
						"status": "success",
						"data": {
							"init_point": obj["init_point"].to_string()
						}
					}))
				)
			},
			Err(e) => Custom(Status::InternalServerError,
                Json(json!({
					"status": "error",
                    "message": format!("Error reading payment server response: {}", e)
                }))
            ),
		},
		Err(e) => Custom(Status::InternalServerError,
			Json(json!({
				"status": "error",
				"message": format!("Error creating payment: {}", e)
			}))
		),
	}
}