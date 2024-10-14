// tests/setup.rs

use backend::db::pool::create_pool;
use backend::db::pool::DBPool;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenv::dotenv;
use std::env;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./db/migrations");

pub async fn setup_test_db() -> DBPool {
    dotenv().ok();
    let database_url: String = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    // Build pool without need for async/await
    let pool = create_pool(&database_url).expect("Failed to create pool");

    {
        // Get a connection from the pool
        // let mut conn = pool.get().await.unwrap();

        // Run pending migrations
        // conn.run_pending_migrations(MIGRATIONS).await.unwrap();
    }

    pool
}
