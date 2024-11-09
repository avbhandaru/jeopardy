// graphql/mutations/game_board.rs

use crate::db::pool::DBPool;
use crate::models::game_board::{GameBoard, NewGameBoard};
use async_graphql::{Context, InputObject, Object, Result};
use chrono::{DateTime, Utc};

#[derive(InputObject)]
pub struct CreateGameBoardInput {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub board_name: String,
}

#[derive(Default)]
pub struct GameBoardMutation;

#[Object]
impl GameBoardMutation {
    async fn create_game_board(
        &self,
        ctx: &Context<'_>,
        input: CreateGameBoardInput,
    ) -> Result<GameBoard> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");
        let new_game_board: NewGameBoard = NewGameBoard {
            created_at: input.created_at,
            updated_at: input.updated_at,
            user_id: input.user_id,
            board_name: input.board_name,
        };
        let game_board: GameBoard = GameBoard::create(&mut conn, new_game_board).await?;
        Ok(game_board)
    }
}
