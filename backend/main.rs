extern crate lib;
extern crate dotenv;
extern crate rocket;

use chrono::NaiveDateTime;
use async_graphql::{Schema, EmptyMutation, EmptySubscription};
use async_graphql_rocket::{GraphQLRequest, GraphQLResponse};
use diesel::prelude::*;
use diesel_async::{RunQueryDsl, AsyncConnection, AsyncPgConnection};
use dotenv::dotenv;
use rocket::State;
use std::env;

// ordinary diesel model setup
table! {
    users {
        id -> BigInt,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        username -> Text,
    }
}

// Diesel User Model
#[derive(Queryable, Selectable, Insertable, Debug)]
#[diesel(table_name = users)]
struct User {
    id: i64,
    created_at: NaiveDateTime,
    updated_at: NaiveDateTime,
    username: String,
}

// GraphQL Query Struct
struct Query;

#[async_graphql::Object]
impl Query {
    async fn users<'a>(self, ctx: &async_graphql::Context<'_>) -> Vec<User> {
        let conn = ctx.data::<AsyncPgConnection>().unwrap();
        get_users(conn).await
    }
}

// Fetch users from the database
async fn get_users(conn: &AsyncPgConnection) -> Vec<User> {
    users::table
        .filter(users::id.gt(0))
        .load(conn)
        .await.unwrap()
}

// Rocket GraphQL route handler
#[post("/graphql", data = "<request>")]
async fn graphql_handler(
    schema: &State<Schema<Query, EmptyMutation, EmptySubscription>>,
    request: GraphQLRequest,
) -> GraphQLResponse {
    schema.execute(request.into_inner()).await.into()
}


// Rocket launch function
#[rocket::main]
async fn rocket() {
    // Load environment variables from .env file
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Establish a database connection
    let connection = AsyncPgConnection::establish(&database_url).await.unwrap();

    // Create GraphQL schema
    let schema = Schema::build(Query, EmptyMutation, EmptySubscription)
        .data(connection)
        .finish();

    // Launch the Rocket server
    println!("GraphQL API running at http://localhost:3030/graphql");

    rocket::build()
        .manage(schema)
        .mount("/", routes![graphql_handler])
        .launch()
        .await?;

    Ok(())
}

// #[tokio::main]
// async fn main() {
//     // // create an async connection
//     // let data = try_db().await;
//     // let hello = lib::Greeter::new("Hello");
//     // for user in data.iter() {
//     //     println!("User: {} {} {} {}", user.id, user.username, user.created_at, user.updated_at);
//     //     hello.print(&user.username);
//     // }

//     // Matt testing graphql here
    // // Load environment variables from .env file
    // dotenv().ok();
    // let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // // Establish a database connection
    // let connection = AsyncPgConnection::establish(&database_url).await.unwrap();

//     // Create GraphQL schema
//     let schema = Schema::build(Query, EmptyMutation, EmptySubscription)
//         .data(connection)
//         .finish();

//     // Serve the GraphQL endpoint using Warp
//     let graphql_route = warp::path("graphql")
//         .and(async_graphql_warp::graphql(schema))
//         .and_then(|(schema, request): (_, async_graphql::Request)| async move {
//             Ok::<_, warp::Rejection>(GraphQLResponse::from(schema.execute(request).await))
//         });

//     // Start the Warp server
//     println!("GraphQL API running at http://localhost:3030/graphql");
//     warp::serve(graphql_route).run(([127, 0, 0, 1], 3030)).await;
// }

// async fn try_db() -> Vec<User> {
//     let mut connection = AsyncPgConnection::establish(&std::env::var("DATABASE_URL").unwrap()).await.unwrap();

//     let results = diesel::insert_into(users::table)
//         .values(&vec![
//             users::username.eq("Akhil"),
//             users::username.eq("Matt"),
//             users::username.eq("Hana"),
//             users::username.eq("Alex")
//         ])
//         .returning(User::as_returning())
//         .get_results(&mut connection)
//         .await.unwrap();

//     println!("New users created: {:?}", results);

//     diesel::update(users::table)
//         .filter(users::username.eq("Hana"))
//         .set(users::username.eq("LetterCook"))
//         .execute(&mut connection)
//         .await.unwrap();

//     // use ordinary diesel query dsl to construct your query
//     users::table
//         .filter(users::id.gt(0))
//         .or_filter(users::username.like("%Luke"))
//         .select(User::as_select())
//         // execute the query via the provided
//         // async `diesel_async::RunQueryDsl`
//         .load(&mut connection)
//         .await.unwrap()
// }
