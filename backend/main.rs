use async_graphql::{
    Schema,
    EmptyMutation,
    EmptySubscription,
    SimpleObject,
};
use async_graphql_axum::{
    GraphQLRequest,
    GraphQLResponse,
};
use axum::{
    routing::{get, post},
    Router};
use axum_server;
use diesel::prelude::*;
use diesel_async::{RunQueryDsl, AsyncConnection, AsyncPgConnection};
// use diesel_async::AsyncPgConnection;
use dotenv::dotenv;
// use lib;
use std::env;
use std::sync::Arc;
use chrono::NaiveDateTime;
use std::net::SocketAddr;

#[tokio::test]
async fn it_compiles() {
    assert!(true);
}

// Ordinary diesel model setup
table! {
    users {
        id -> BigInt,
        created_at -> Timestamp,
            updated_at -> Timestamp,
        username -> Text,
    }
}

// Diesel User Model with async-graphql support
#[derive(Queryable, Selectable, Insertable, Debug, SimpleObject)]
#[diesel(table_name = users)]
struct User {
    id: i64,
    #[graphql(skip)] // NaiveDateTime not nativelly supported by graphql
    created_at: NaiveDateTime,
    #[graphql(skip)]
    updated_at: NaiveDateTime,
    username: String,
}

// GraphQL Query Struct
struct Query;

#[async_graphql::Object]
impl Query {
    async fn users<'a>(&self, ctx: &async_graphql::Context<'_>) -> Vec<User> {
        // let conn = ctx.data::<Arc<AsyncPgConnection>>().unwrap();
        // Get the Arc<Mutex<AsyncPgConnection>> from the context
        let conn = ctx.data::<Arc<tokio::sync::Mutex<AsyncPgConnection>>>().unwrap();
        let mut conn = conn.lock().await;
        // get_users(&conn).await
        get_users(&mut conn).await
    }
    async fn hello(&self) -> &str {
        "Hello world!"
    }
}

// Fetch users from the database
async fn get_users(conn: &mut AsyncPgConnection) -> Vec<User> {
    users::table
        .filter(users::id.gt(0))
        .load(conn)
        .await.unwrap()
}


// Graphql handler
async fn graphql_handler(schema: Schema<Query, EmptyMutation, EmptySubscription>, request: GraphQLRequest) -> GraphQLResponse {
    // schema.execute(request.into_inner()).await.into()
    async_graphql::Schema::execute(&schema, request.into_inner()).await.into()
}

// Start Server. Optional Postgres connection to add to context
async fn start_server(conn: Option<Arc<tokio::sync::Mutex<AsyncPgConnection>>>) {
    // Build the GraphQL Schema
    let mut schema_builder = Schema::build(Query, EmptyMutation, EmptySubscription);

    // Check if db connection was passed
    if let Some(db_conn) = conn{
        schema_builder = schema_builder.data(db_conn.clone());
    }

    // Finish building schema
    let schema = schema_builder.finish();

    // Create Router with single route
    let app = Router::new()
        .route("/hello", get(hello_world))
        .route("/graphql", post( move |request: GraphQLRequest| graphql_handler(schema.clone(), request)));

    println!("Created app!");

    // Run the server
    let addr: SocketAddr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on {}", addr);

    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

}

#[tokio::test]
async fn graphql_hello_works() {
    println!("Starting graphql test!");

    // Spawn server as background task
    let _server_handle = tokio::spawn(async { start_server(None).await; });

    // Allow some time for server to start
    tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;

    // Create a GraphQL Query
    let client = reqwest::Client::new();
    // This query will trigger the hello() async_graphql::Object we defined above
    let query = r#"{"query":"{ hello }"}"#;
    let response = client
        .post("http://localhost:3000/graphql")
        .header("Content-Type", "application/json")
        .body(query)
        .send()
        .await
        .expect("Failed to send request");

    println!("Created client, sent query request");

    let status = response.status();
    let body = response.text().await.unwrap();
    println!("Response Status: {}", status);
    println!("Response Body: {}", body);

    // Assert that the status is 200
    assert_eq!(status, 200);

    // Assert the response body contains the expected data
    assert!(body.contains(r#"{"data":{"hello":"Hello world!"}}"#));

}

#[tokio::test]
async fn diesel_works() {
    // Load environment variables from .env file
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    println!("{}", database_url);

    // Establish a database connection
    let connection: AsyncPgConnection = AsyncPgConnection::establish(&database_url).await.unwrap();

    // Wrap connection in Arc for thread safety
    // let shared_connection = Arc::new(connection);
    let shared_connection = Arc::new(tokio::sync::Mutex::new(connection));
    // We need to insert this connection into the context when starting our axum server
    // ctx.insert(shared_connection.clone());

    // Spawn server as background task
    let _server_handle = tokio::spawn(async { start_server(Some(shared_connection)).await; });

    // Allow some time for server to start
    tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;

    // Create a GraphQL Query
    let client = reqwest::Client::new();
    // This query will trigger the users() async_graphql::Object we defined above
    let query = r#"{"query":"{ users { id } }"}"#;
    let response = client
        .post("http://localhost:3000/graphql")
        .header("Content-Type", "application/json")
        .body(query)
        .send()
        .await
        .expect("Failed to send request");

    println!("Created client, sent query request");

    let status = response.status();
    let body = response.text().await.unwrap();
    println!("Response Status: {}", status);
    println!("Response Body: {}", body);

    // Assert that the status is 200
    assert_eq!(status, 200);

    // Assert the response body contains the expected data
    assert!(body.contains(r#"{"data":{"users":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8}]}}"#));


}

// Handler that returns "Hello World"
async fn hello_world() -> axum::response::Html<&'static str>{
    axum::response::Html("Hello, world!")
}
// Main function to set up Axum with GraphQL
#[tokio::main]
async fn main() {
    // Load environment variables from .env file
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    println!("{}", database_url);
    // // Establish a database connection
    // let connection = AsyncPgConnection::establish(&database_url).await.unwrap();


}