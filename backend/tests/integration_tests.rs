// tests/integration_tests.rs

mod setup;
use core::error;

use async_graphql::Response;
use async_graphql::{EmptyMutation, EmptySubscription, Request, Schema};
use backend::db::pool::DBPool;
use backend::db::schema::users::dsl::*;
use backend::graphql::user::UserMutation;
use backend::graphql::user::UserQuery;
// Import users table and columns
use backend::models::user::NewUser;
use backend::models::user::User;
use chrono::Utc;
use diesel::prelude::*; // Import Diesel prelude
use diesel::ExpressionMethods;
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};
use http::request;
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

#[tokio::test]
async fn test_create_user_graphql() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Set up test database and schema
    let pool: DBPool = setup_test_db().await.unwrap();

    // Build graphql schema with Query and Mutation types
    let schema: Schema<UserQuery, UserMutation, EmptySubscription> =
        Schema::build(UserQuery, UserMutation, EmptySubscription)
            .data(pool.clone())
            .finish();

    // Define the GraphQL mutation string
    let mutation = r#"
        mutation {
            createUser(input: {
                createdAt: "2024-10-10T12:00:00Z",
                updatedAt: "2024-10-10T12:00:00Z",
                username: "testuser"
            }) {
                id
                username
                createdAt
                updatedAt
            }
        }
    "#;

    // Execute the mutation and get a response
    let request: Request = Request::new(mutation);
    let response: Response = Schema::execute(&schema, request).await;

    // Print the errors to see what went wrong
    if !response.errors.is_empty() {
        println!("GraphQL errors: {:?}", response.errors);
    } else {
        println!("GraphQL data: {:?}", response.data);
    }

    // Check that the response does not contain errors
    assert!(response.errors.is_empty());

    // Extract the "createUser" data from the response
    let data = response.data.into_json().unwrap();
    let created_user = data["createUser"].clone();

    // Validate that the returned user matches what we expect
    assert_eq!(created_user["username"], "testuser");
    assert!(created_user["id"].as_i64().is_some()); // Ensure an ID was returned

    Ok(())
}

#[tokio::test]
async fn test_get_user_graphql() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Set up test database and schema
    let pool: DBPool = setup_test_db().await.unwrap();

    // Only testing UserQuery, so no need for mutation or subscription
    let schema: Schema<UserQuery, EmptyMutation, EmptySubscription> =
        Schema::build(UserQuery, EmptyMutation, EmptySubscription)
            .data(pool.clone())
            .finish();

    // Define Graphql query
    let query = r#"
        query {
            getUser(id: 1) {
                id
                username
                createdAt
                updatedAt
            }
        }
    "#;

    // Execute the query and store response
    let request: Request = Request::new(query);
    let response: Response = Schema::execute(&schema, request).await;

    // Print the errors to see what went wrong
    if !response.errors.is_empty() {
        println!("GraphQL errors: {:?}", response.errors);
    } else {
        println!("GraphQL data: {:?}", response.data);
    }

    // Check that the response does not contain errors
    assert!(response.errors.is_empty());

    // Extract the "createUser" data from the response
    let data = response.data.into_json().unwrap();
    let user = data["getUser"].clone();

    // Validate that the returned user matches what we expect
    assert_eq!(user["username"], "Akhil");
    assert_eq!(user["id"], 1); // Ensure an ID was returned

    Ok(())
}
