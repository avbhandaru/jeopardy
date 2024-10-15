// backend/src/db/pool.rs

use diesel_async::pooled_connection::deadpool::BuildError;
use diesel_async::pooled_connection::{deadpool::Pool, AsyncDieselConnectionManager};
use diesel_async::AsyncPgConnection;
use dotenv::dotenv;
use std::env;


pub type DBPool = Pool<AsyncPgConnection>;

pub fn create_pool(database_url: &String) -> Result<DBPool, BuildError> {
    let manager = AsyncDieselConnectionManager::<AsyncPgConnection>::new(database_url);
    let pool = Pool::builder(manager).build();
    pool
}

pub fn create_app_pool() -> Result<DBPool, BuildError> {
    dotenv().ok();
    let database_url: String = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    create_pool(&database_url)
}
