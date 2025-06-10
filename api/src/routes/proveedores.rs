use rocket::serde::{Deserialize, Serialize};
use super::*;
use crate::{
    impl_crud,
    impl_create, impl_get_by_id, impl_get_all, impl_update, impl_delete,
    models::Proveedor
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct AuthParams {
    email: String,
    senha: String
}

#[post("/auth", data = "<data>", format = "json")]
pub async fn authenticate(
    db: Connection<MainDatabase>,
    data: Json<AuthParams>
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
                    "data": usuario.id.unwrap().to_hex()
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
        Err(e) => {
            Custom(Status::InternalServerError,
                Json(json!({
                    "status": "error",
                    "message": format!("Error authenticating user: {}",e)
                }))
            )
        }
    }
}

impl_crud!(Proveedor, "proveedores");