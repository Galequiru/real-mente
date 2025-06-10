pub mod proveedores;
pub mod materias;

use rocket::{
    get, post, put, delete,
    futures::TryStreamExt, http::Status,
    response::status::Custom,
    serde::json::{Json, json, Value}
};
use mongodb::bson::{oid::ObjectId, doc, to_document};
use rocket_db_pools::Connection;

use crate::db::MainDatabase;

const DATABASE: &str = "database";

// using macros to implement the basic CRUD operations

#[macro_export] macro_rules! impl_create {
    ($tipo:ty, $collection:literal)  => {

#[post("/add", data="<data>", format="json")]
pub async fn add(
    db: Connection<MainDatabase>,
    data: Json<$tipo>
) -> Custom<Json<Value>> {
    match db
    .database(DATABASE)
    .collection::<$tipo>($collection)
    .insert_one(data.into_inner(), None)
    .await {
        Ok(res) => {
            return Custom(Status::Created,
                Json(json!({
                    "status": "success",
                    "message": format!("Object created with id: {}", res.inserted_id.as_object_id().unwrap())
                }))
            )
        },
        Err(e) => {
            return Custom(Status::InternalServerError,
                Json(json!({
                    "status": "error",
                    "message": format!("Error creating object: {}", e)
                }))
            );
        }
    }
}}}

#[macro_export] macro_rules! impl_get_all {
    ($tipo:ty, $collection:literal) => {

#[get("/get", format = "json")]
pub async fn get_all(
    db: Connection<MainDatabase>
) -> Custom<Json<Value>> {

    match db.database(DATABASE)
    .collection::<$tipo>($collection)
    .find(None, None)
    .await {
        Ok(itens) => {
            Custom(Status::Ok,
                Json(json!({
                    "status": "success",
                    "data": itens.try_collect::<Vec<_>>()
                    .await.unwrap()
                }))
            )
        },
        Err(e) => {
            Custom(Status::InternalServerError,
                Json(json!({
                    "status": "error",
                    "message": format!("Error reading data: {}", e)
                }))
            )
        }
    }
}}}

#[macro_export] macro_rules! impl_get_by_id {
    ($tipo:ty, $collection:literal) => {

#[get("/get/<id>", format="json")]
pub async fn get_by_id (
    db: Connection<MainDatabase>,
    id: &str
) -> Custom<Json<Value>> {
    let obj_id = ObjectId::parse_str(id);

    if obj_id.is_err() {
        return Custom(Status::BadRequest,
            Json(json!({
                "status": "success",
                "message": "Invalid ID"
            }))
        );
    }

    match db.database(DATABASE)
    .collection::<$tipo>($collection)
    .find_one(doc!{"_id": obj_id.unwrap()}, None)
    .await {
        Ok(Some(item)) => {
            Custom(Status::Ok,
                Json(json!({
                    "status": "success",
                    "data": item
                }))
            )
        },
        Ok(None) => {
            Custom(Status::NotFound,
                Json(json!({
                    "status": "success",
                    "message": "No objects with such ID"
                }))
            )
        },
        Err(e) => {
            Custom(Status::InternalServerError,
                Json(json!({
                    "status": "error",
                    "message": format!("Error reading data: {}", e)
                }))
            )
        }
    }
}}}

#[macro_export] macro_rules! impl_update {
    ($tipo: ty, $collection: literal) => {

#[put("/update/<id>", data = "<data>", format = "json")]
pub async fn update(
    db: Connection<MainDatabase>,
    id: &str,
    data: Json<$tipo>
) -> Custom<Json<Value>> {
    let obj_id = ObjectId::parse_str(id);

    if obj_id.is_err() {
        return Custom(Status::BadRequest,
            Json(json!({
                "status": "error",
                "message": "Invalid ID"
            }))
        );
    }

    match db.database(DATABASE)
    .collection::<$tipo>($collection)
    .update_one(
        doc! {"_id": obj_id.unwrap()},
        doc! {
            "$set": to_document(&data.into_inner()).unwrap()
        },
        None
    )
    .await {
        Ok(res) => {
            if res.modified_count == 0 {
                Custom(Status::BadRequest,
                    Json(json!({
                        "status": "success",
                        "message": "No object with such ID"
                    }))
                )
            } else {
                Custom(Status::Ok,
                    Json(json!({
                        "status": "success",
                        "message": "Object updated successfully"
                    }))
                )
            }
        },
        Err(e) => {
            Custom(Status::InternalServerError,
                Json(json!({
                    "status": "success",
                    "message": format!("Error updating object: {}", e)
                }))
            )
        }
    }
}}}

#[macro_export] macro_rules! impl_delete {
    ($tipo: ty, $collection: literal) => {

#[delete("/delete/<id>", format = "json")]
pub async fn delete(
    db: Connection<MainDatabase>,
    id: &str
) -> Custom<Json<Value>> {
    let obj_id = ObjectId::parse_str(id);

    if obj_id.is_err() {
        return Custom(Status::BadRequest,
            Json(json!({
                "status": "error",
                "message": "Invalid ID"
            }))
        );
    }

    match db.database(DATABASE)
    .collection::<$tipo>($collection)
    .delete_one(
        doc! {"_id": obj_id.unwrap()},
        None
    )
    .await {
        Ok(res) => {
            if res.deleted_count == 0 {
                Custom(Status::BadRequest,
                    Json(json!({
                        "status": "success",
                        "message": "No object with such ID"
                    }))
                )
            } else {
                Custom(Status::Ok,
                    Json(json!({
                        "status": "success",
                        "message": "Object deleted successfully"
                    }))
                )
            }
        }
        Err(e) => {
            Custom(Status::InternalServerError,
                Json(json!({
                    "status": "success",
                    "message": format!("Error deleting object: {}", e)
                }))
            )
        }
    }
}}}

#[macro_export] macro_rules! impl_crud {
    ($tipo: ty, $collection: literal) => {
        impl_create!($tipo, $collection);
        impl_get_by_id!($tipo, $collection);
        impl_get_all!($tipo, $collection);
        impl_update!($tipo, $collection);
        impl_delete!($tipo, $collection);
    }
}