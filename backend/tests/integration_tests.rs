// tests/integration_tests.rs

mod setup;
// use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use backend::db::pool::DBPool;
use backend::db::schema::users::dsl::*; // Import users table and columns
                                        // use backend::graphql::user::UserQuery;
use backend::models::user::NewUser;
use backend::models::user::User;
use chrono::Utc;
use diesel::prelude::*; // Import Diesel prelude
use diesel::ExpressionMethods;
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};
// use serde_json::json;
use setup::setup_test_db;

#[tokio::test]
async fn test_compiles() {
    assert!(true);
}

#[tokio::test]
async fn test_migrations() {
    let _pool: DBPool = setup_test_db().await.unwrap();
}

#[tokio::test]
async fn test_create_user_model() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Set up test database and schema
    let pool: DBPool = setup_test_db().await.unwrap();

    // Insert a test user into the database
    {
        let new_user: NewUser = NewUser {
            created_at: Utc::now(),
            updated_at: Utc::now(),
            username: "testuser".to_string(),
        };

        let mut conn = pool.get().await?;
        // Dereference the pooled connection to get the underlying AsyncPgConnection
        let conn: &mut AsyncPgConnection = &mut *conn;
        println!("Created async connection object from pool");

        // Start a transaction
        conn.begin_test_transaction().await?;

        // Perform user creation inside the transaction
        let created_user: User = User::create(&mut *conn, new_user).await?;
        println!(
            "Created user: {}, id: {}",
            created_user.username, created_user.id
        );

        // Assert that the created user matches expectations
        assert_eq!(created_user.username, "testuser");
    }

    Ok(())
}
