// src/graphql/query/board_question.rs

use crate::graphql::types::board_question::BoardQuestionGQL;
use crate::models::board_question::BoardQuestion;
use crate::models::question::Question;
use crate::{db::pool::DBPool, models::game_board::GameBoard};
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct BoardQuestionQuery;

#[Object]
impl BoardQuestionQuery {
    /// Fetch a BoardQuestion by board id and question id
    async fn board_question(
        &self,
        ctx: &Context<'_>,
        board_id: i64,
        question_id: i64,
    ) -> Result<BoardQuestionGQL> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let board_question =
            BoardQuestion::find_by_board_and_question(&mut conn, board_id, question_id).await?;
        let board = GameBoard::find_by_id(&mut conn, board_id).await?;
        let question = Question::find_by_id(&mut conn, question_id).await?;
        Ok(BoardQuestionGQL::new(board, question, board_question))
    }

    /// Fetch all BoardQuestions for a specific GameBoard
    async fn board_questions_by_board(
        &self,
        ctx: &Context<'_>,
        board_id: i64,
    ) -> Result<Vec<BoardQuestionGQL>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let board_questions = BoardQuestion::find_by_board(&mut conn, board_id).await?;

        let mut results = Vec::new();
        for bq in board_questions {
            let game_board = GameBoard::find_by_id(&mut conn, bq.board_id).await?;
            let question = Question::find_by_id(&mut conn, bq.question_id).await?;
            results.push(BoardQuestionGQL::new(game_board, question, bq));
        }

        Ok(results)
    }

    /// Fetch all BoardQuestions for a specific Question
    async fn board_questions_by_question(
        &self,
        ctx: &Context<'_>,
        question_id: i64,
    ) -> Result<Vec<BoardQuestionGQL>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let board_questions = BoardQuestion::find_by_question(&mut conn, question_id).await?;

        let mut results = Vec::new();
        for bq in board_questions {
            let game_board = GameBoard::find_by_id(&mut conn, bq.board_id).await?;
            let question = Question::find_by_id(&mut conn, question_id).await?;
            results.push(BoardQuestionGQL::new(game_board, question, bq));
        }

        Ok(results)
    }
}
