# Jeopardy Backend Notes

These are notes which explain the tools we chose and why. We're writing our backend with Rust, because we like crabs.

## Tools

### diesel
Disel is an ORM and Querybuilder for Rust. It allows us to connect to and interact with our PostgresDB. We will be using diesel migrations to format our database. Diesel works with Axum, and GraphQL.

### axum
We use axum as a web app framework for Rust. (think Flask for Python). We use Axum to create a backend server that handles route requests. We're going to be making our api with graphQL.

### tower-http

We use tower-http as a middleware between our frontend and backend. It allows our Axum server to accept http requests from a different origin (our frontend). Without middleware, our frontend and backend can't talk to each other.

## Run

Eventually we will build and execute everything with Bazel. In the meantime, we're simply using rust's builtin cargo build tools.

If you haven't started your postgresDB with docker, do that first. Then, use cargo to start the backend.

```sh
cargo run //backend
```