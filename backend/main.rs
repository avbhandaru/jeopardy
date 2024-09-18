use async_graphql::{
    Schema,
    EmptyMutation,
    EmptySubscription,
    Object
};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{
    routing::{get, post},
    Router};
use axum_server;
// use diesel::prelude::*;
// use diesel_async::{RunQueryDsl, AsyncConnection, AsyncPgConnection};
use dotenv::dotenv;
// use lib;
use std::env;
// use std::sync::Arc;
// use chrono::NaiveDateTime;
use std::net::SocketAddr;

#[test]
fn it_compiles() {
    assert!(true);
}

// Ordinary diesel model setup
// table! {
//     users {
//         id -> BigInt,
//         created_at -> Timestamp,
//         updated_at -> Timestamp,
//         username -> Text,
//     }
// }

// Diesel User Model
// #[derive(Queryable, Selectable, Insertable, Debug)]
// #[diesel(table_name = users)]
// struct User {
//     id: i64,
//     created_at: NaiveDateTime,
//     updated_at: NaiveDateTime,
//     username: String,
// }

// GraphQL Query Struct
struct Query;

#[Object]
impl Query {
    // async fn users<'a>(self, ctx: &Context<'_>) -> Vec<User> {
    //     let conn = ctx.data::<Arc<AsyncPgConnection>>().unwrap();
    //     get_users(conn).await
    // }
    async fn hello(&self) -> &str {
        "Hello world!"
    }
}

// Fetch users from the database
// async fn get_users(conn: &AsyncPgConnection) -> Vec<User> {
//     users::table
//         .filter(users::id.gt(0))
//         .load(conn)
//         .await.unwrap()
// }


// Graphql handler
async fn graphql_handler(schema: Schema<Query, EmptyMutation, EmptySubscription>, request: GraphQLRequest) -> GraphQLResponse {
    schema.execute(request.into_inner()).await.into()
}

// Start Server
async fn start_server() {
    // Build the GraphQL Schema
    let schema: Schema<Query, EmptyMutation, EmptySubscription> = Schema::build(Query, EmptyMutation, EmptySubscription).finish();

    // Create Router with single route
    let app = Router::new()
        .route("/hello", get(hello_world))
        .route("/graphql", post( move |request: GraphQLRequest| graphql_handler(schema.clone(), request)));

    println!("Created app!");

    // Run the server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
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
    let _server_handle = tokio::spawn(async { start_server().await; });

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

    // // Establish a database connection
    // let connection = AsyncPgConnection::establish(&database_url).await.unwrap();

    // let connection = Arc::new(connection); // Wrap connection in Arc for thread safety

    // // Create GraphQL schema
    // let schema = Schema::build(Query, EmptyMutation, EmptySubscription)
    //     .data(connection.clone()) // Pass the connection to the schema
    //     .finish();

    // // Create the Axum router with GraphQL route
    // let app = Router::new()
    //     .route("/graphql", get(graphql_playground).post(graphql_handler))
    //     .layer(Extension(schema)); // Attach schema to the router
    

    // // Launch the Rocket server
    // println!("GraphQL API running at http://localhost:3030/graphql");

    // // Start the Axum server
    // let addr = SocketAddr::from(([127, 0, 0, 1], 3030));
    // println!("GraphQL API running at http://{}", addr);
    // axum::Server::bind(&addr)
    //     .serve(app.into_make_service())
    //     .await
    //     .unwrap();
}