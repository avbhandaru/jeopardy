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
```

## Deleting Test Databases

In the case that runtime errors stop test database teardowns and you're left with many test databases, run the following query to generate all of the DROP statements:

```sql
SELECT 'DROP DATABASE "' || datname || '";'
FROM pg_database
WHERE datname LIKE 'test_db_%';
```

Copy the results of that query, then run it to delete all databases that match against `'test_db_%'`.
