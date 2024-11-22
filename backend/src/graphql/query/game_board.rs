// graphql/query/game_board.rs

use crate::graphql::types::question_with_association::QuestionWithAssociationGQL;
use crate::models::game_board::GameBoard;
use crate::models::question::Question;
use crate::{db::pool::DBPool, models::board_question::BoardQuestion};
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct GameBoardQuery;

#[Object]
impl GameBoardQuery {
    /// Fetch questions associated with specific gameboard, including association attributes
    async fn board_questions(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
    ) -> Result<Vec<QuestionWithAssociationGQL>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let board_questions = BoardQuestion::find_by_board(&mut conn, game_board_id).await?;

        let mut results = Vec::new();
        for bq in board_questions {
            let question = Question::find_by_id(&mut conn, bq.question_id).await?;
            results.push(QuestionWithAssociationGQL {
                question,
                category: bq.category,
                daily_double: bq.daily_double,
                points: bq.points,
                grid_row: bq.grid_row,
                grid_col: bq.grid_col,
            });
        }

        Ok(results)
    }

    /// Fetch a single gameboard by id
    async fn get_game_board(&self, ctx: &Context<'_>, id: i64) -> Result<GameBoard> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let game_board: GameBoard = GameBoard::find_by_id(&mut conn, id).await?;
        Ok(game_board)
    }

    /// Fetch all gameboards from user id
    async fn get_game_board_from_user(
        &self,
        ctx: &Context<'_>,
        user_id: i64,
    ) -> Result<Vec<GameBoard>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let game_boards = GameBoard::find_by_user(&mut conn, user_id).await?;
        Ok(game_boards)
    }

    async fn all_game_boards(&self, ctx: &Context<'_>) -> Result<Vec<GameBoard>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let game_boards = GameBoard::all(&mut conn).await?;
        Ok(game_boards)
    }
}
