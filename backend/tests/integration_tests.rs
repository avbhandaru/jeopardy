// tests/integration_tests.rs

mod setup;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use backend::db::pool::DBPool;
use backend::db::schema::users::dsl::*; // Import users table and columns
use backend::graphql::user::UserQuery;
use backend::models::user::NewUser;
use backend::models::user::User;
use chrono::{DateTime, Utc};
use diesel::prelude::*; // Import Diesel prelude
use diesel::ExpressionMethods;
use diesel_async::RunQueryDsl;
use serde_json::json;
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
            id: 1,
            created_at: Utc::now(),
            updated_at: Utc::now(),
            username: "testuser".to_string(),
        };

        let mut conn = pool.get().await?;

        let created_user: User = User::create(&mut *conn, new_user).await?;

        assert_eq!(created_user.username, "testuser");
    }

    // Fetch the user from the database to verify insertion
    {
        let mut conn = pool.get().await?;
        let user: User = users
            .filter(username.eq("testuser"))
            .first(&mut conn)
            .await?;
        assert_eq!(user.username, "testuser");
    }

    Ok(())
}
