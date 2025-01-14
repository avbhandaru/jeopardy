// src/graphql/query/board_question.rs

use crate::db::pool::DBPool;
use crate::graphql::types::game_board_types::DetailedBoardQuestion;
use crate::models::board_question::BoardQuestion;
use crate::models::question::Question;
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct BoardQuestionQuery;

#[Object]
impl BoardQuestionQuery {
    /// Fetch a BoardQuestion by board id and question id
    async fn board_question(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
        question_id: i64,
    ) -> Result<BoardQuestion> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let board_question =
            BoardQuestion::find_by_board_and_question(&mut conn, game_board_id, question_id)
                .await?;
        Ok(board_question)
    }

    /// Fetch all BoardQuestions for a specific GameBoard
    async fn board_questions_by_board(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
    ) -> Result<Vec<BoardQuestion>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let board_questions = BoardQuestion::find_by_board(&mut conn, game_board_id).await?;

        Ok(board_questions)
    }

    /// Fetch DetailedBoardQuestion from game_board_id and question_id
    async fn detailed_board_question(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
        question_id: i64,
    ) -> Result<DetailedBoardQuestion> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let board_question =
            BoardQuestion::find_by_board_and_question(&mut conn, game_board_id, question_id)
                .await?;
        let question = Question::find_by_id(&mut conn, question_id).await?;

        let detailed_board_question = DetailedBoardQuestion {
            board_question,
            question,
        };

        Ok(detailed_board_question)
    }

    /// Fetch game board data
    async fn fetch_detailed_board_questions(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
    ) -> Result<Vec<DetailedBoardQuestion>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let questions =
            BoardQuestion::fetch_game_board_data_with_questions(&mut conn, game_board_id).await?;

        Ok(questions)
    }
}
