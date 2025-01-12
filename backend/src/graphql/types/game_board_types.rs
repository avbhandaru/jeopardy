// src/graphql/types/game_board_types.rs

use crate::models::board_question::BoardQuestion;
use crate::models::question::Question;
use async_graphql::SimpleObject;

#[derive(SimpleObject, Debug)]
pub struct DetailedBoardQuestion {
    pub board_question: BoardQuestion,
    pub question: Question, // Include the actual question data
}

#[derive(SimpleObject, Debug)]
pub struct GameBoardData {
    pub categories: Vec<String>,
    pub questions: Vec<DetailedBoardQuestion>, // Replace BoardQuestion with DetailedBoardQuestion
}
