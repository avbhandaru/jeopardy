// tests/setup.rs

use deadpool_diesel::{Manager, Pool, Runtime};
use diesel_async::AsyncPgConnection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./db/migrations");

pub async fn scetup_test_db() -> Pool<AsyncPgConnection> {
    // Create a manager for AsyncPgConnection
    let manager = Manager::new("postgres://user:password@localhost/test_db", Runtime::Tokio1);

    // Build pool without need for async/await
    let pool = Pool::builder(manager)
        .max_size(4) // Setting pool size to 4 for testing
        .build()
        .unwrap();

    {
        // Get a connection from the pool
        let mut conn = pool.get().await.unwrap();

        // Run pending migrations
        conn.run_pending_migrations(MIGRATIONS).await.unwrap();
    }

    pool
}