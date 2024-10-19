// tests/setup.rs

use backend::db::pool::create_pool;
use backend::db::pool::DBPool;
use diesel::pg::PgConnection;
use diesel::Connection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenv::dotenv;
use std::env;
use std::error::Error;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("../backend/db/migrations");

pub fn run_migrations_sync(database_url: &str) -> Result<(), Box<dyn Error + Send + Sync>> {
    println!("Running test setup migrations!");
    let mut conn: PgConnection = PgConnection::establish(database_url)?;
    conn.run_pending_migrations(MIGRATIONS)?;
    Ok(())
}

pub fn rollback_migrations(database_url: &str) -> Result<(), Box<dyn Error + Send + Sync>> {
    println!("Rolling back test setup migrations");
    let mut conn: PgConnection = PgConnection::establish(database_url)?;
    conn.revert_all_migrations(MIGRATIONS)?;
    Ok(())
}

pub async fn setup_test_db() -> Result<DBPool, Box<dyn Error + Send + Sync>> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Rollback migrations, and propagate any errors
    rollback_migrations(&database_url)?;

    // Run migrations synchronously, and propagate any errors
    run_migrations_sync(&database_url)?;

    // Build async pool to manage multiple async connections
    let pool: DBPool = create_pool(&database_url).expect("Failed to create pool");

    Ok(pool)
}
