// models/users.rs

use crate::schema::users;
use chrono::{DateTime, Utc};
use diesel::{prelude::*, sql_types::Timestamp};
use diesel_async::{AsyncPgConnection, RunQueryDsl};

table! {
    users {
        id -> BigInt,
        username -> Text,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

// Diesel User Model with async-graphql support
#[derive(Queryable, Selectable, Insertable, Debug)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i64,
    pub username: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub id: i64,
    pub username: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl User {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        user_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        users::table.find(user_id).first(conn).await
    }

    pub async fn all(conn: &mut AsyncPgConnection) -> Result<Vec<Self>, diesel::result::Error> {
        users.load::<Self>(conn).await
    }

    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_user: NewUser,
    ) -> Result<Self, diesel::result::Error> {
        users::table
            .insert_into(users)
            .values(&new_user)
            .get_result(conn)
            .await
    }
}
