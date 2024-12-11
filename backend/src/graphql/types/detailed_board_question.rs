// src/graphql/types/board_question.rs

use crate::models::board_question::BoardQuestion;
use crate::models::game_board::GameBoard;
use crate::models::question::Question;
use async_graphql::SimpleObject;

#[derive(SimpleObject, Debug)]
pub struct DetailedBoardQuestion {
    pub board: GameBoard,
    pub question: Question,
    pub category: String,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}

impl DetailedBoardQuestion {
    pub fn new(board: GameBoard, question: Question, board_question: BoardQuestion) -> Self {
        Self {
            board,
            question,
            category: board_question.category,
            daily_double: board_question.daily_double,
            points: board_question.points,
            grid_row: board_question.grid_row,
            grid_col: board_question.grid_col,
        }
    }
}
