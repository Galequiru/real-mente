mod db;
mod models;
mod routes;

use rocket::{launch, routes};
use rocket_db_pools::Database;

use routes::{proveedores, materias};

#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(db::MainDatabase::init())
    .mount(
        "/login", 
        routes![
            proveedores::authenticate
        ]
    )
    .mount(
        "/proveedores",
        routes![
            proveedores::add,
            proveedores::get_all,
            proveedores::get_by_id,
            proveedores::update,
            proveedores::delete
        ]
    )
    .mount(
        "/materias",
        routes![
            materias::add,
            materias::get_all,
            materias::get_by_id,
            materias::update,
            materias::delete
        ]
    )
}