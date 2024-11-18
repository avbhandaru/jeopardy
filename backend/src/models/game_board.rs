// models/game_board.rs

use crate::db::schema::game_boards;
use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};
use serde_json::{json, Value};

/// Diesel Game Board model with async-graphql support
#[derive(Queryable, Selectable, Insertable, Debug, SimpleObject, Builder)]
#[diesel(table_name = game_boards)]
pub struct GameBoard {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub board_name: String,
    pub grid: Value,
}

#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = game_boards)]
pub struct NewGameBoard {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub board_name: String,
    pub grid: Value,
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
        mut new_game_board: NewGameBoard,
    ) -> Result<Self, diesel::result::Error> {
        if new_game_board.grid == json!({}) {
            let default_grid = json!({
                "categories": ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"],
                "questions": [
                    ["", "", "", "", ""],
                    ["", "", "", "", ""],
                    ["", "", "", "", ""],
                    ["", "", "", "", ""],
                    ["", "", "", "", ""]
                ]
            });
            new_game_board.grid = default_grid;
        }

        diesel::insert_into(game_boards::table)
            .values(&new_game_board)
            .get_result(conn)
            .await
    }
}
