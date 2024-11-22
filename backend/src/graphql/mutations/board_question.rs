// src/graphql/mutation/board_question.rs

use async_graphql::{Context, InputObject, Object, Result};

use crate::{
    db::pool::DBPool,
    models::{
        board_question::{BoardQuestion, NewBoardQuestion},
        game_board::GameBoard,
        question::Question,
    },
};

#[derive(InputObject)]
pub struct CreateBoardQuestionInput {
    pub board_id: i64,
    pub question_id: i64,
    pub category: String,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}

#[derive(Default)]

pub struct BoardQuestionMutation;

#[Object]
impl BoardQuestionMutation {
    /// Associate a question with a gameboard
    async fn associate_question_with_board(
        &self,
        ctx: &Context<'_>,
        input: CreateBoardQuestionInput,
    ) -> Result<BoardQuestion> {
        let pool = ctx.data::<DBPool>().expect("Can't get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");

        // Validate GameBoard exists
        let _board = match GameBoard::find_by_id(&mut conn, input.board_id).await {
            Ok(b) => b,
            Err(_) => return Err(async_graphql::Error::new("GameBoard not found")),
        };

        // Validate Question Exists
        let _question = match Question::find_by_id(&mut conn, input.question_id).await {
            Ok(q) => q,
            Err(_) => return Err(async_graphql::Error::new("Question not found")),
        };

        // Check for existing association
        if let Ok(existing_bq) =
            BoardQuestion::find_by_board_and_question(&mut conn, input.board_id, input.question_id)
                .await
        {
            return Ok(existing_bq);
        }

        // Proceed with association
        let new_board_question = NewBoardQuestion {
            board_id: input.board_id,
            question_id: input.question_id,
            category: input.category,
            daily_double: input.daily_double,
            points: input.points,
            grid_row: input.grid_row,
            grid_col: input.grid_col,
        };

        let board_question = BoardQuestion::create(&mut conn, new_board_question).await?;
        Ok(board_question)
    }
}
