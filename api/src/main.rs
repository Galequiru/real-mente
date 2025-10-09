mod db;
mod models;
mod routes;

use rocket::{launch, routes};
use rocket_db_pools::Database;
use rocket_cors::CorsOptions;

use routes::{users, materias, auth, payments};

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions::default().to_cors().unwrap();
    rocket::build()
    .attach(db::MainDatabase::init())
    .attach(cors)
    .mount(
        "/auth",
        routes![
            auth::register,
            auth::login
        ]
    )
    .mount(
        "/users",
        routes![
            users::add,
            users::get_all,
            users::get_by_id,
            users::update,
            users::delete
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
    .mount(
        "/payments",
        routes![
            payments::create_payment,
            payments::check_user_payments
        ]
    )
}