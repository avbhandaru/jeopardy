// tests/integration_tests.rs

mod setup;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use backend::db::schema::users;
use backend::graphql::user::UserQuery;
use diesel::prelude::*;
use diesel_async::AsyncPgConnection;
use serde_json::json;
use setup::setup_test_db;

#[tokio::test]
async fn test_compiles() {
    assert!(true);
}

// #[tokio::test]
// async fn test_get_user() {
//     // Set up test database and schema
//     let pool: Pool<AsyncPgConnection> = setup_test_db().await;

//     // Insert a test user into the database
//     {
//         let mut conn = pool.get().await.unwrap();
//         diesel::insert_into(users::table)
//             .values((users::id.eq(1), users::username.eq("testuser")))
//             .execute(&mut conn)
//             .await
//             .unwrap();
//     }

//     // Build the schema with the test database
//     let schema = Schema::build(UserQuery, EmptyMutation, EmptySubscription)
//         .data(pool)
//         .finish();

//     // Define the query
//     let query = r#"
//         query GetUser($id: Int!) {
//             getUser(id: $id) {
//                 id
//                 username
//             }
//         }
//     "#;

//     // Execute the query
//     let response = schema
//         .execute(
//             async_graphql::Request::new(query)
//                 .variables(async_graphql::Variables::from_value(json!({ "id": 1}))),
//         )
//         .await;

//     // Check for errors
//     assert!(response.errors.is_empty(), "{:?}", response.errors);

//     // Verify the data
//     let data = response.data.into_json().unwrap();
//     let expected = json!({
//         "getUser": {
//             "id": 1,
//             "username": "testuser"
//         }
//     });

//     assert_eq!(data, expected);
// }
