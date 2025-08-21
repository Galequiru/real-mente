mod db;
mod models;
mod routes;

use rocket::{launch, routes};
use rocket_db_pools::Database;

use routes::{proveedores, materias, auth};

#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(db::MainDatabase::init())
    .mount(
        "/auth", 
        routes![
            auth::register,
            auth::login
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