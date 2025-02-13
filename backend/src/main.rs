use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{extract::Extension, response::Html, routing::get, Router};
use backend::db::pool::create_app_pool;
use backend::graphql::schema::{create_schema, AppSchema};
use dotenvy::dotenv;
use http::header::{AUTHORIZATION, CONTENT_TYPE};
use http::{HeaderValue, Method};
use std::env;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

async fn graphql_playground() -> Html<String> {
    Html(playground_source(GraphQLPlaygroundConfig::new("/graphql")))
}

async fn graphql_handler(
    schema: Extension<AppSchema>,
    req: GraphQLRequest,
) -> impl axum::response::IntoResponse {
    GraphQLResponse::from(schema.execute(req.0).await)
}

#[tokio::main]
async fn main() {
    // Try to get a connection from our DBPool
    let pool = create_app_pool().expect("Failed to create DBPool");

    // Create graphql schema
    let schema = create_schema(pool);

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

    dotenv().ok();
    let port = env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse::<u16>()
        .expect("PORT must be a number");
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    println!("Server running at http://{}", &addr);

    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
