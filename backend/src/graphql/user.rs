// graphql/user.rs

use crate::db::DBPool;
use crate::models::user::NewUser;
use crate::models::user::User as UserModel;
use async_graphql::{Context, InputObject, Object, Result, SimpleObject};
use chrono::{DateTime, Utc};

#[derive(SimpleObject)]
pub struct User {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub username: String,
}

// Not sure what this does yet, but I think creates User object as we defined in models/
impl From<UserModel> for User {
    fn from(user_model: UserModel) -> Self {
        User {
            id: user_model.id,
            created_at: user_model.created_at,
            updated_at: user_model.updated_at,
            username: user_model.username,
            // Map other fields
        }
    }
}

pub struct UserQuery;

#[Object]
impl UserQuery {
    async fn get_user(&self, ctx: &Context<'_>, id: i64) -> Result<User> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        let user_model: UserModel = UserModel::find_by_id(&mut conn, id).await?;
        let user: User = User::from(user_model);
        Ok(user)
    }

    async fn all_users(&self, ctx: &Context<'_>) -> Result<Vec<User>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        let user_models: Vec<UserModel> = UserModel::all(&mut conn).await?;
        let users: Vec<User> = user_models.into_iter().map(User::from).collect();

        Ok(users)
    }
}

#[derive(InputObject)]
pub struct CreateUserInput {
    pub id: i64,
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
            id: input.id,
            username: input.username,
            created_at: input.created_at,
            updated_at: input.updated_at,
        };

        let user_model: UserModel = UserModel::create(&mut conn, new_user).await?;
        let user: User = User::from(user_model);
        Ok(user)
    }
}
