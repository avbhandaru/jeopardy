use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{EmptySubscription, MergedObject, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{extract::Extension, response::Html, routing::get, Router};
use backend::db::pool::create_app_pool;
use backend::graphql::mutations::{game_board::GameBoardMutation, user::UserMutation};
use backend::graphql::query::{game_board::GameBoardQuery, user::UserQuery};
use std::net::SocketAddr;

#[derive(MergedObject, Default)]
struct QueryRoot(UserQuery, GameBoardQuery);

#[derive(MergedObject, Default)]
struct MutationRoot(UserMutation, GameBoardMutation);

async fn graphql_playground() -> Html<String> {
    Html(playground_source(GraphQLPlaygroundConfig::new("/graphql")))
}

async fn graphql_handler(
    Extension(schema): Extension<Schema<QueryRoot, MutationRoot, EmptySubscription>>,
    req: GraphQLRequest,
) -> impl axum::response::IntoResponse {
    GraphQLResponse::from(schema.execute(req.0).await)
}

#[tokio::main]
async fn main() {
    let mut schema_builder: async_graphql::SchemaBuilder<
        QueryRoot,
        MutationRoot,
        EmptySubscription,
    > = Schema::build(
        QueryRoot::default(),
        MutationRoot::default(),
        EmptySubscription,
    );

    // Try to get a connection from our DBPool
    let pool = create_app_pool().expect("Failed to create DBPool");

    schema_builder = schema_builder.data(pool.clone());

    let schema = schema_builder.finish();

    let app = Router::new()
        .route("/graphql", get(graphql_playground).post(graphql_handler))
        .layer(Extension(schema));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));

    println!("Server running at http://{}", &addr);

    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
