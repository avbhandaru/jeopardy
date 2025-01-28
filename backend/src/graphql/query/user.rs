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
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        let user: User = User::find_by_id(&mut conn, user_id).await?;
        Ok(user)
    }

    /// Fetch all users in database
    async fn fetch_all_users(&self, ctx: &Context<'_>) -> Result<Vec<User>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        let users: Vec<User> = User::all(&mut conn).await?;
        Ok(users)
    }
}
