// tests/integration_tests.rs

mod setup;
use async_graphql::{EmptyMutation, EmptySubscription, Request, Response, Schema};
use backend::graphql::mutations::game_board::GameBoardMutation;
use backend::graphql::mutations::user::UserMutation;
use backend::graphql::query::game_board::GameBoardQuery;
use backend::graphql::query::user::UserQuery;
use backend::models::game_board::{GameBoard, NewGameBoard};
use backend::models::user::{NewUser, User};
use chrono::Utc;
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};
use setup::{
    create_test_database, drop_test_database, establish_super_connection, get_test_database_url,
    rollback_migrations, run_migrations_sync, setup_test_db, TestDB,
};

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
async fn test_setup() {
    let mut super_conn = establish_super_connection()
        .await
        .expect("Couldn't create super_conn");
    println!("Successfully created super_conn");
    let test_db = create_test_database(&mut super_conn)
        .await
        .expect("Couldn't create test_db");
    println!("Successfully created test_db: {}", test_db);
    let test_db_url = get_test_database_url(&test_db);
    println!("Current test_db_url: {}", test_db_url);
    run_migrations_sync(&test_db_url);
    let _test_db_pool =
        backend::db::pool::create_pool(&test_db_url).expect("failed to create pool");

    println!("Now attempting to delete test_db");
    // Await the spawned task to ensure it completes
    let drop_task = tokio::spawn(async move {
        drop_test_database(&mut super_conn, &test_db)
            .await
            .expect("didn't drop test database oopsie");
    });
    drop_task.await.expect("Failed to drop database task");
    println!("Should have deleted test_db by now");
    // assert!(false, "Forcing failure");
}

#[tokio::test]
async fn test_testdb_struct() {
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");
    println!("Created test_db for {}", test_db.test_db_name);
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}

#[tokio::test]
async fn test_create_user_model() {
    // Set up test database and schema
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");

    // Insert a test user into the database
    {
        let new_user: NewUser = NewUser {
            created_at: Utc::now(),
            updated_at: Utc::now(),
            username: "testuser".to_string(),
        };

        let mut conn = test_db.pool.get().await.unwrap();
        // Dereference the pooled connection to get the underlying AsyncPgConnection
        // let conn: &mut AsyncPgConnection = &mut *conn;
        println!("Created async connection object from pool");

        // Perform user creation inside the transaction
        let created_user: User = User::create(&mut conn, new_user).await.unwrap();
        println!(
            "Created user: {}, id: {}",
            created_user.username, created_user.id
        );

        // Assert that the created user matches expectations
        assert_eq!(created_user.username, "testuser");
    }

    // Tear down test_db
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}

#[tokio::test]
async fn test_create_user_graphql() {
    // Set up test database and schema
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");

    // Build graphql schema with Query and Mutation types
    let schema: Schema<UserQuery, UserMutation, EmptySubscription> =
        Schema::build(UserQuery, UserMutation, EmptySubscription)
            .data(test_db.pool.clone())
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
    // Ensure an ID was returned
    assert!(created_user["id"].as_i64().is_some());

    // Tear down test_db
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}

#[tokio::test]
async fn test_get_user_graphql() {
    // Set up test database and schema
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");
    // Insert testUser
    let user1 = NewUser {
        username: "testUser".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };
    let mut conn = test_db.pool.get().await.unwrap();
    User::create(&mut conn, user1).await.unwrap();

    // Only testing UserQuery, so no need for mutation or subscription
    let schema: Schema<UserQuery, EmptyMutation, EmptySubscription> =
        Schema::build(UserQuery, EmptyMutation, EmptySubscription)
            .data(test_db.pool.clone())
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

    // Tear down test_db
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}

#[tokio::test]
async fn test_all_users_graphql() {
    // Set up test database and schema
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");

    // Grab connection from pool, start a transaction from connection
    let mut conn = test_db.pool.get().await.unwrap();

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

    User::create(&mut conn, user1).await;
    User::create(&mut conn, user2).await;

    // Build the GraphQL schema with Query and Mutation types
    let schema: Schema<UserQuery, UserMutation, EmptySubscription> =
        Schema::build(UserQuery, UserMutation, EmptySubscription)
            .data(test_db.pool.clone())
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

    // Tear down test_db
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}

#[tokio::test]
async fn test_create_game_board_model() {
    // Set up test database and schema
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");

    // Insert a test user into the database
    let new_user: NewUser = NewUser {
        created_at: Utc::now(),
        updated_at: Utc::now(),
        username: "testuser".to_string(),
    };

    let mut conn = test_db.pool.get().await.unwrap();
    println!("Created async connection object from pool");

    // Perform user creation inside the transaction
    let created_user: User = User::create(&mut conn, new_user).await.unwrap();
    println!(
        "Created user: {}, id: {}",
        created_user.username, created_user.id
    );

    // Assert that the created user matches expectations
    assert_eq!(created_user.username, "testuser");

    // Insert a test game board into the database
    let new_game_board: NewGameBoard = NewGameBoard {
        user_id: created_user.id,
        board_name: "testBoard".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };

    let created_game_board: GameBoard = GameBoard::create(&mut conn, new_game_board).await.unwrap();

    println!(
        "Created gameBoard: {}, id: {}, user_id: {}",
        created_game_board.board_name, created_game_board.id, created_game_board.user_id
    );

    // Assert that the created board game matches expectations
    assert_eq!(created_game_board.board_name, "testBoard");
    assert_eq!(created_game_board.user_id, created_user.id);

    // Tear down test_db
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}

#[tokio::test]
async fn test_get_game_board_graphql() {
    // Set up test database and schema
    let mut test_db: TestDB = TestDB::new().await.expect("Failed to initialize test_db");

    // Insert testUser
    let user1 = NewUser {
        username: "testUser".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };
    let mut conn = test_db.pool.get().await.unwrap();
    let new_user: User = User::create(&mut conn, user1).await.unwrap();

    // Insert testGameBoard from testUser
    let game_board1 = NewGameBoard {
        created_at: Utc::now(),
        updated_at: Utc::now(),
        user_id: new_user.id,
        board_name: "test_board".to_string(),
    };
    GameBoard::create(&mut conn, game_board1).await.unwrap();

    // Build graphql schema
    let schema: Schema<GameBoardQuery, GameBoardMutation, EmptySubscription> =
        Schema::build(GameBoardQuery, GameBoardMutation, EmptySubscription)
            .data(test_db.pool.clone())
            .finish();

    // Define the GraphQL query
    let query = r#"
        query {
            getGameBoard(id: 1) {
                id
                createdAt
                updatedAt
                userId
                boardName            
            }
        }
    "#;

    // Execute query and get response
    let request: Request = Request::new(query);
    let response: Response = Schema::execute(&schema, request).await;

    // Print the errors to see what went wrong
    if !response.errors.is_empty() {
        println!("GraphQL errors: {:?}", response.errors);
    } else {
        println!("GraphQL data: {:?}", response.data);
    }

    // Assess results
    // Check that the response does not contain errors
    assert!(response.errors.is_empty());

    let data = response.data.into_json().unwrap();
    let game_board = data["getGameBoard"].clone();

    // Validate game_board
    assert_eq!(game_board["id"], 1);
    assert_eq!(game_board["boardName"], "test_board");
    assert_eq!(game_board["userId"], 1);

    // Tear down test_db
    let successfully_droppped: bool = test_db.close().await.expect("Failed to close test_db");
    assert!(successfully_droppped, "Close method returned false");
}
