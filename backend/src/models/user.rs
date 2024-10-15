// models/users.rs

use crate::db::schema::users;
use chrono::{DateTime, Utc};
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

// Diesel User Model with async-graphql support
#[derive(Queryable, Selectable, Insertable, Debug)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub username: String,
}

#[derive(Debug, Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub username: String,
}

impl User {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        user_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        users::table.find(user_id).first(conn).await
    }

    pub async fn all(conn: &mut AsyncPgConnection) -> Result<Vec<Self>, diesel::result::Error> {
        users::table.load::<Self>(conn).await
    }

    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_user: NewUser,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(users::table)
            .values(&new_user)
            .get_result(conn)
            .await
    }
}
