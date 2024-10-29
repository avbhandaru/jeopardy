// models/game_board.rs

use crate::db::schema::game_boards;
use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

// Diesel Game Board model with asyn-graphql support
#[derive(Queryable, Selectable, Insertable, Debug, SimpleObject)]
#[diesel(table_name = game_boards)]
pub struct GameBoard {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub board_name: String,
}

#[derive(Debug, Insertable)]
#[diesel(table_name = game_boards)]
pub struct NewGameBoard {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub board_name: String,
}

impl GameBoard {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        game_board_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        game_boards::table.find(game_board_id).first(conn).await
    }

    pub async fn find_by_user(
        conn: &mut AsyncPgConnection,
        target_user_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        game_boards::table
            .filter(game_boards::user_id.eq(target_user_id))
            .load::<Self>(conn)
            .await
    }

    pub async fn all(conn: &mut AsyncPgConnection) -> Result<Vec<Self>, diesel::result::Error> {
        game_boards::table.load::<Self>(conn).await
    }

    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_game_board: NewGameBoard,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(game_boards::table)
            .values(&new_game_board)
            .get_result(conn)
            .await
    }
}
