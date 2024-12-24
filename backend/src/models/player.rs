// models/player.rs

use chrono::{DateTime, Utc};

use crate::db::schema::players;
use crate::models::game::Game;
use async_graphql::SimpleObject;
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

#[derive(
    Identifiable, Associations, Queryable, SimpleObject, Selectable, Debug, Builder, Clone,
)]
#[diesel(table_name = players)]
#[diesel(belongs_to(Game))]
pub struct Player {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub game_id: i64,
    pub player_name: String,
    pub score: i32,
}

#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = players)]
pub struct NewPlayer {
    pub game_id: i64,
    pub player_name: String,
}

#[derive(Debug, AsChangeset)]
#[diesel(table_name = players)]
pub struct UpdatePlayer {
    pub player_name: Option<String>,
    pub score: Option<i32>,
}

impl Player {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        player_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        players::table.find(player_id).first(conn).await
    }

    pub async fn find_by_game_id(
        conn: &mut AsyncPgConnection,
        game_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        players::table
            .filter(players::game_id.eq(game_id))
            .load::<Self>(conn)
            .await
    }

    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_player: NewPlayer,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(players::table)
            .values(&new_player)
            .get_result(conn)
            .await
    }

    pub async fn update_player(
        conn: &mut AsyncPgConnection,
        player_id: i64,
        updated_fields: UpdatePlayer,
    ) -> Result<Self, diesel::result::Error> {
        diesel::update(players::table.find(player_id))
            .set(&updated_fields)
            .get_result(conn)
            .await
    }
}
