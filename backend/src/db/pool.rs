// backend/src/db/pool.rs

use deadpool_diesel::{Manager, Pool, Runtime};
use diesel_async::AsyncPgConnection;
use dotenvy::dotenv;
use std::env;

pub type DBPool = Pool<AsyncPgConnection>;

pub fn create_pool() -> DBPool {
    dotenv().ok();

    let database_url: String = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let manager = Manager::new(database_url, Runtime::Tokio1);
    Pool::builder(manager)
        .max_size(16) // Adjust as needed
        .build()
        .expect("Failed to create pool")
}
