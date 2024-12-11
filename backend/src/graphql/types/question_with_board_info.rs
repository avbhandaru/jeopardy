// src/graphql/types/question_with_board_info.rs

use crate::models::question::Question;
use async_graphql::SimpleObject;

#[derive(SimpleObject, Debug)]
pub struct QuestionWithBoardInfo {
    pub question: Question,
    pub category: String,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}
