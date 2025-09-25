use std::fmt::Debug;

use rocket::serde::{Deserialize, Serialize};
use crate::models::Proveedor;

use super::*;

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct RegisterParams {
    email: String,
    senha: String,
    nome: String
}

#[post("/register", data = "<data>", format = "json")]
pub async fn register(
    db: Connection<MainDatabase>,
    data: Json<RegisterParams>
) -> Custom<Json<Value>> {
    let collection = db
    .database(DATABASE)
    .collection::<Proveedor>("proveedores");

    // check if a user is registered with that email
    if let Ok(Some(usuario)) = collection
    .find_one(doc! {
        "email": data.email.clone()
    }, None)
    .await {
        return Custom(Status::Conflict,
            Json(json!({
                "status": "error",
                "message": format!("User with email '{}' already exists with name: {}", usuario.email, usuario.nome)
            }))
        )
    }
    let params = data.into_inner();
    match collection
    .insert_one(Proveedor::new(
        params.email,
        params.senha,
        params.nome
    ), None)
    .await {
        Ok(_) => {
            Custom(Status::Ok,
                Json(json!({
                    "status": "success",
                    "message": "User registered successfully"
                }))
            )
        },
        Err(e) => response_from_error(e, "Error registering user")
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct LoginParams {
    email: String,
    senha: String
}

#[post("/login", data = "<data>", format = "json")]
pub async fn login(
    db: Connection<MainDatabase>,
    data: Json<LoginParams>
) -> Custom<Json<Value>> {

    match db
    .database(DATABASE)
    .collection::<Proveedor>("proveedores")
    .find_one(doc! {
        "email": data.email.clone(),
        "senha": data.senha.clone()
    }, None)
    .await {
        Ok(Some(usuario)) => {
            Custom(Status::Ok,
                Json(json!({
                    "status": "success",
                    "message": "User authenticated",
                    "data": usuario
                }))
            )
        },
        Ok(None) => {
            Custom(Status::BadRequest,
                Json(json!({
                    "status": "success",
                    "message": "User does not exist"
                }))
            )
        },
        Err(e) => response_from_error(e, "Error authenticating user")
    }
}