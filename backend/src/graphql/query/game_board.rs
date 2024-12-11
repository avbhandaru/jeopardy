// graphql/query/game_board.rs

use crate::graphql::types::question_with_board_info::QuestionWithBoardInfo;
use crate::models::game_board::GameBoard;
use crate::models::question::Question;
use crate::{db::pool::DBPool, models::board_question::BoardQuestion};
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct GameBoardQuery;

#[Object]
impl GameBoardQuery {
    /// Fetch questions associated with specific gameboard, including association attributes
    async fn questions_with_board_info(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
    ) -> Result<Vec<QuestionWithBoardInfo>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let board_questions = BoardQuestion::find_by_board(&mut conn, game_board_id).await?;

        if board_questions.is_empty() {
            return Ok(Vec::new());
        }

        // Extract all question IDs to batch fetch
        let question_ids: Vec<i64> = board_questions.iter().map(|bq| bq.question_id).collect();

        // Batch fetch all Questions in a single query
        let questions = Question::find_by_ids(&mut conn, question_ids)
            .await
            .map_err(|e| async_graphql::Error::new(format!("Failed to fetch questions: {}", e)))?;

        // Create a map for quick lookup
        let question_map: std::collections::HashMap<i64, Question> =
            questions.into_iter().map(|q| (q.id, q)).collect();

        let results = board_questions
            .into_iter()
            .filter_map(|bq| {
                question_map
                    .get(&bq.question_id)
                    .map(|question| QuestionWithBoardInfo {
                        question: question.clone(),
                        category: bq.category.clone(),
                        daily_double: bq.daily_double,
                        points: bq.points,
                        grid_row: bq.grid_row,
                        grid_col: bq.grid_col,
                    })
            })
            .collect();

        Ok(results)
    }

    /// Fetch a single gameboard by id
    async fn get_game_board(&self, ctx: &Context<'_>, game_board_id: i64) -> Result<GameBoard> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let game_board: GameBoard = GameBoard::find_by_id(&mut conn, game_board_id)
            .await
            .map_err(|e| {
                async_graphql::Error::new(format!(
                    "Failed to fetch game board with ID {}: {}",
                    game_board_id, e
                ))
            })?;
        Ok(game_board)
    }

    /// Fetch all gameboards associated with a specific user
    async fn get_game_board_from_user(
        &self,
        ctx: &Context<'_>,
        user_id: i64,
    ) -> Result<Vec<GameBoard>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await.map_err(|e| {
            async_graphql::Error::new(format!("Failed to get DB connection: {}", e))
        })?;
        let game_boards = GameBoard::find_by_user(&mut conn, user_id).await?;
        Ok(game_boards)
    }

    /// Fetch all gameboards in the system
    async fn all_game_boards(&self, ctx: &Context<'_>) -> Result<Vec<GameBoard>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let game_boards = GameBoard::all(&mut conn).await?;
        Ok(game_boards)
    }
}
