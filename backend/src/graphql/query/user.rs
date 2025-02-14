// graphql/query/user.rs/

use crate::db::pool::DBPool;
use crate::models::user::User;
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct UserQuery;

#[Object]
impl UserQuery {
    /// Find user by id
    async fn find_user(&self, ctx: &Context<'_>, user_id: i64) -> Result<User> {
        let pool = ctx.data::<DBPool>().map_err(|e| {
            async_graphql::Error::new(format!("Cannot get DBPool from context: {:?}", e))
        })?;
        let mut conn = pool
            .get()
            .await
            .map_err(|e| async_graphql::Error::new(format!("Failed to get connection: {}", e)))?;

        let user: User = User::find_by_id(&mut conn, user_id).await?;
        Ok(user)
    }

    /// Find user by firebase UID
    async fn find_user_by_firebase_uid(
        &self,
        ctx: &Context<'_>,
        firebase_uid: String,
    ) -> Result<User> {
        let pool = ctx.data::<DBPool>().map_err(|e| {
            async_graphql::Error::new(format!("Cannot get DBPool from context: {:?}", e))
        })?;
        let mut conn = pool
            .get()
            .await
            .map_err(|e| async_graphql::Error::new(format!("Failed to get connection: {}", e)))?;

        let user: User = User::find_by_firebase_uid(&mut conn, firebase_uid).await?;
        Ok(user)
    }

    /// Fetch all users in database
    async fn fetch_all_users(&self, ctx: &Context<'_>) -> Result<Vec<User>> {
        let pool = ctx.data::<DBPool>().map_err(|e| {
            async_graphql::Error::new(format!("Cannot get DBPool from context: {:?}", e))
        })?;
        let mut conn = pool
            .get()
            .await
            .map_err(|e| async_graphql::Error::new(format!("Failed to get connection: {}", e)))?;

        let users: Vec<User> = User::all(&mut conn).await?;
        Ok(users)
    }
}
