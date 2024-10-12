// backend/src/db/mod.rs

pub mod pool;
pub mod schema;

pub use pool::{create_pool, DBPool}; // Re-exports for easier access
