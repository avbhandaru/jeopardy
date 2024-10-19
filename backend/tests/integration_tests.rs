// tests/integration_tests.rs

mod setup;
use async_graphql::Response;
use async_graphql::{EmptyMutation, EmptySubscription, Request, Schema};
use axum::response;
use backend::db::pool::DBPool;
use backend::db::schema::users::dsl::*;
use backend::graphql::user::UserMutation;
use backend::graphql::user::UserQuery;
// Import users table and columns
use backend::models::user::NewUser;
use backend::models::user::User;
use chrono::Utc;
use diesel::prelude::*;
// Import Diesel prelude
use diesel::ExpressionMethods;
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};
use http::request;
// use serde_json::json;
use dotenv::dotenv;
use setup::{rollback_migrations, run_migrations_sync, setup_test_db};
use std::env;

#[tokio::test]
async fn test_check_backtrace() {
    let backtrace = std::env::var("RUST_BACKTRACE").unwrap_or_else(|_| "not set".to_string());
    println!("RUST_BACKTRACE is set to: {}", backtrace);
    assert!(true); // This is just to ensure the test passes
}

#[tokio::test]
async fn test_compiles() {
    assert!(true);
}

#[tokio::test]
async fn test_setup_test_db() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let pool: DBPool = setup_test_db().await.unwrap();

    // Fetch a connection from the pool to verify that it works
    let mut conn = pool.get().await?;
    // Dereference the pooled connection to get the underlying AsyncPgConnection
    let conn: &mut AsyncPgConnection = &mut *conn;

    // Check if the 'users' table exists in the test DB
    let table_exists = diesel::dsl::sql::<diesel::sql_types::Bool>(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')",
    )
    .get_result::<bool>(&mut *conn)
    .await?;

    // Assert table exists
    assert!(
        table_exists,
        "'users' table should exist in the test database"
    );
    Ok(())
}

#[tokio::test]
async fn test_migrations() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Load environment variables (e.g., DATABASE_URL)
    dotenv::dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Run migrations synchronously
    run_migrations_sync(&database_url)?;

    let mut conn = AsyncPgConnection::establish(&database_url).await.unwrap();

    // Check if the 'users' table exists by querying its metadata
    let table_exists: bool = diesel::dsl::sql::<diesel::sql_types::Bool>(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')",
    )
    .get_result::<bool>(&mut conn)
    .await?;

    // Ensure that the 'users' table exists
    assert!(
        table_exists,
        "'users' table should exist after running migrations"
    );

    // Roll back migrations
    rollback_migrations(&database_url)?;

    // Check again if 'users' table exsits (it should not)
    let table_exists_after_rollback: bool = diesel::dsl::sql::<diesel::sql_types::Bool>(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')",
    )
    .get_result(&mut conn)
    .await?;

    // Ensure that the 'users' table no longer exists after rollback
    assert!(
        !table_exists_after_rollback,
        "'users' table should not exist after rolling back migrations"
    );

    Ok(())
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

    // Insert testUser
    let user1 = NewUser {
        username: "testUser".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };
    let mut conn = pool.get().await.unwrap();
    User::create(&mut conn, user1).await?;

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
    assert_eq!(user["username"], "testUser");
    assert_eq!(user["id"], 1); // Ensure an ID was returned

    Ok(())
}

#[tokio::test]
async fn test_all_users_graphql() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Set up test database and schema
    let pool: DBPool = setup_test_db().await.unwrap();

    // Grab connection from pool, start a transaction from connection
    let mut conn = pool.get().await.unwrap();

    // Insert test users
    let user1 = NewUser {
        username: "user1".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };
    let user2 = NewUser {
        username: "user2".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };

    User::create(&mut conn, user1).await?;
    User::create(&mut conn, user2).await?;

    // Build the GraphQL schema with Query and Mutation types
    let schema: Schema<UserQuery, UserMutation, EmptySubscription> =
        Schema::build(UserQuery, UserMutation, EmptySubscription)
            .data(pool.clone())
            .finish();

    // Define the GraphQL query string for allUsers
    let query = r#"
        query {
            allUsers {
                id
                username
                createdAt
                updatedAt
            }
        }
    "#;

    // Execute the query and get the response
    let request = Request::new(query);
    let response = Schema::execute(&schema, request).await;

    // Print errors to see what went wrong if anything
    if !response.errors.is_empty() {
        println!("GraphQL errors: {:?}", response.errors);
    } else {
        println!("GraphQL data: {:?}", response.data);
    }

    // Check that response has no errors
    assert!(response.errors.is_empty());

    // Extract the "allUsers" data from response
    let data = response.data.into_json().unwrap();
    let users_data = data["allUsers"].as_array().unwrap();

    // Validate returned users matches what we expect
    assert_eq!(users_data.len(), 2);

    // Check the first user
    let user1_data = &users_data[0];
    assert_eq!(user1_data["username"], "user1");
    assert!(user1_data["id"].as_i64().is_some());
    assert!(user1_data["createdAt"].as_str().is_some());
    assert!(user1_data["updatedAt"].as_str().is_some());

    // Check the second user
    let user2_data = &users_data[1];
    assert_eq!(user2_data["username"], "user2");
    assert!(user2_data["id"].as_i64().is_some());
    assert!(user2_data["createdAt"].as_str().is_some());
    assert!(user2_data["updatedAt"].as_str().is_some());

    Ok(())
}
