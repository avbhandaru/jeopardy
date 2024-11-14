use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{EmptySubscription, MergedObject, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{extract::Extension, response::Html, routing::get, Router};
use backend::db::pool::create_app_pool;
use backend::graphql::mutations::{
    game_board::GameBoardMutation, question::QuestionMutation, user::UserMutation,
};
use backend::graphql::query::{
    game_board::GameBoardQuery, question::QuestionQuery, user::UserQuery,
};
use http::header::{AUTHORIZATION, CONTENT_TYPE};
use http::{HeaderValue, Method};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

#[derive(MergedObject, Default)]
struct QueryRoot(UserQuery, GameBoardQuery, QuestionQuery);

#[derive(MergedObject, Default)]
struct MutationRoot(UserMutation, GameBoardMutation, QuestionMutation);

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

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([CONTENT_TYPE, AUTHORIZATION])
        .allow_credentials(true); // In case of cookies or other credentials

    let app = Router::new()
        .route("/graphql", get(graphql_playground).post(graphql_handler))
        .layer(Extension(schema))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));

    println!("Server running at http://{}", &addr);

    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
