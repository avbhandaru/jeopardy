// graphql/query/question.rs

use crate::models::board_question::BoardQuestion;
use crate::models::game_board::GameBoard;
use crate::models::question::Question;
use crate::{db::pool::DBPool, graphql::types::detailed_board_question::DetailedBoardQuestion};
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct QuestionQuery;

#[Object]
impl QuestionQuery {
    /// Fetch a single question by id
    async fn question(&self, ctx: &Context<'_>, question_id: i64) -> Result<Question> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let question: Question = Question::find_by_id(&mut conn, question_id).await?;
        Ok(question)
    }

    /// Fetch all questions from a user
    async fn get_question_from_user(
        &self,
        ctx: &Context<'_>,
        user_id: i64,
    ) -> Result<Vec<Question>> {
        let pool = ctx.data::<DBPool>().expect("Cant get DBPool from context");
        let mut conn = pool.get().await?;
        let questions: Vec<Question> = Question::find_by_user(&mut conn, user_id).await?;
        Ok(questions)
    }

    /// Fetch all questions
    async fn all_questions(&self, ctx: &Context<'_>) -> Result<Vec<Question>> {
        let pool = ctx.data::<DBPool>().expect("Cant get DBPool from context");
        let mut conn = pool.get().await?;
        let questions: Vec<Question> = Question::all(&mut conn).await?;
        Ok(questions)
    }

    /// Fetch questions from list of ids
    async fn get_questions_from_ids(
        &self,
        ctx: &Context<'_>,
        question_ids: Vec<i64>,
    ) -> Result<Vec<Question>> {
        let pool = ctx.data::<DBPool>().expect("Can't get DBPool from context");
        let mut conn = pool.get().await?;
        let questions: Vec<Question> = Question::find_by_ids(&mut conn, question_ids).await?;
        Ok(questions)
    }

    /// Fetch GameBoards associated with specific quesiton, including association attributes
    async fn game_boards(
        &self,
        ctx: &Context<'_>,
        question_id: i64,
    ) -> Result<Vec<DetailedBoardQuestion>> {
        let pool = ctx.data::<DBPool>().expect("Can't get DBPool from context");
        let mut conn = pool.get().await?;
        let board_questions = BoardQuestion::find_by_question(&mut conn, question_id).await?;

        let mut results = Vec::new();

        for bq in board_questions {
            let game_board = GameBoard::find_by_id(&mut conn, bq.board_id).await?;
            results.push(DetailedBoardQuestion {
                board: game_board,
                question: Question::find_by_id(&mut conn, bq.question_id).await?,
                category: bq.category,
                daily_double: bq.daily_double,
                points: bq.points,
                grid_row: bq.grid_row,
                grid_col: bq.grid_col,
            });
        }

        Ok(results)
    }
}
