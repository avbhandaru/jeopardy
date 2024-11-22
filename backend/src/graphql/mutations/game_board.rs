// graphql/mutations/game_board.rs

use crate::db::pool::DBPool;
use crate::models::game_board::{GameBoard, NewGameBoard};
use async_graphql::{Context, InputObject, Object, Result};

#[derive(InputObject)]
pub struct CreateGameBoardInput {
    pub user_id: i64,
    pub title: String,
}

#[derive(Default)]
pub struct GameBoardMutation;

#[Object]
impl GameBoardMutation {
    /// Create a new gameboard
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
            user_id: input.user_id,
            title: input.title,
        };
        let game_board: GameBoard = GameBoard::create(&mut conn, new_game_board).await?;
        Ok(game_board)
    }
}
