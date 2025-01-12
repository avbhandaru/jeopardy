// models/game.rs

use crate::db::schema::games;
use crate::models::user::User;
use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

/// Diesel Game model with async-graphql support
#[derive(
    Identifiable, Associations, Queryable, Selectable, Debug, SimpleObject, Builder, Clone,
)]
#[diesel(table_name = games)]
#[diesel(belongs_to(User))]
pub struct Game {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub game_board_id: i64,
}

/// Struct for creating new game
#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = games)]
pub struct NewGame {
    pub user_id: i64,
    pub game_board_id: i64,
}

impl Game {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        game_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        games::table.find(game_id).first(conn).await
    }

    pub async fn all(conn: &mut AsyncPgConnection) -> Result<Vec<Self>, diesel::result::Error> {
        games::table.load::<Self>(conn).await
    }

    pub async fn find_by_user(
        conn: &mut AsyncPgConnection,
        user_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        games::table
            .filter(games::user_id.eq(user_id))
            .load::<Self>(conn)
            .await
    }

    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_game: NewGame,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(games::table)
            .values(&new_game)
            .get_result(conn)
            .await
    }
}
