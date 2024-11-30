// graphql/mutations/game_board.rs

use crate::db::pool::DBPool;
use crate::models::board_question::{BoardQuestion, NewBoardQuestion};
use crate::models::game_board::{GameBoard, NewGameBoard};
use crate::models::question::{NewQuestion, Question};
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
    /// Create a new gameboard with example question
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
        // Create example question and associate it with this gameboard
        let example_question: Question = Question::create(
            &mut conn,
            NewQuestion {
                user_id: input.user_id,
                question: "Example Question".to_string(),
                answer: "Example Answer".to_string(),
            },
        )
        .await?;
        // Create an example boardquestiondata association
        let _example_board_question_data = BoardQuestion::create(
            &mut conn,
            NewBoardQuestion {
                board_id: game_board.id,
                question_id: example_question.id,
                category: "Example Category".to_string(),
                daily_double: false,
                points: 100,
                grid_row: 0,
                grid_col: 0,
            },
        )
        .await?;
        Ok(game_board)
    }

    /// Update gameboard title
    async fn update_title(
        &self,
        ctx: &Context<'_>,
        id: i64,
        new_title: String,
    ) -> Result<GameBoard> {
        let pool = ctx.data::<DBPool>().expect("Expected DBPool");
        let mut conn = pool.get().await.expect("Expected connection");
        let game_board = GameBoard::update_title(&mut conn, id, new_title).await?;
        Ok(game_board)
    }
}
