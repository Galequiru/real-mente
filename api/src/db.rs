use rocket_db_pools::{mongodb::Client, Database};

#[derive(Database)]
#[database("database")]
pub struct MainDatabase(Client);