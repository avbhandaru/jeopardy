// graphql/mutations/user.rs

use crate::db::pool::DBPool;
use crate::models::user::{NewUser, User};
use async_graphql::{Context, InputObject, Object, Result};
use chrono::{DateTime, Utc};

#[derive(InputObject)]
pub struct CreateUserInput {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub username: String,
}

// Define the mutation root for User
pub struct UserMutation;

#[Object]
impl UserMutation {
    async fn create_user(&self, ctx: &Context<'_>, input: CreateUserInput) -> Result<User> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        let new_user: NewUser = NewUser {
            created_at: input.created_at,
            updated_at: input.updated_at,
            username: input.username,
        };

        let user: User = User::create(&mut conn, new_user).await?;
        Ok(user)
    }
}
