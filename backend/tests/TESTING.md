# Testing Strategy

## Overview

This project uses integration tests to verify the functionality of the backend services. Tests are written using `tokio::test` and interact with a PostgreSQL test database.

## Setup

- Ensure PostgreSQL is running and accessible.
- Set the `TEST_DATABASE_URL` environment variable to point to the test database.
- Run migrations using Diesel: `diesel migration run`

## Running Tests

Execute the test suite using Cargo:

```bash
cargo test -- --nocapture