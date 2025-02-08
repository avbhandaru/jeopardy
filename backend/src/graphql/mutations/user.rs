// graphql/mutations/user.rs

use crate::db::pool::DBPool;
use crate::models::user::User;
use async_graphql::{Context, InputObject, Object, Result};

#[derive(InputObject)]
pub struct CreateUserInput {
    pub username: String,
    pub firebase_uid: String,
}

// Define the mutation root for User
#[derive(Default)]
pub struct UserMutation;

#[Object]
impl UserMutation {
    async fn create_user(&self, ctx: &Context<'_>, input: CreateUserInput) -> Result<User> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        let user: User = User::create(&mut conn, input.username, input.firebase_uid).await?;
        Ok(user)
    }
}
