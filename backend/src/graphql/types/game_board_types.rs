// src/graphql/types/game_board_types.rs

use crate::models::game_board_question_mapping::GameBoardQuestionMapping;
use crate::models::question::Question;
use async_graphql::SimpleObject;

#[derive(SimpleObject, Debug)]
pub struct DetailedBoardQuestion {
    pub mapping: GameBoardQuestionMapping,
    pub question: Question, // Include the actual question data
}

#[derive(SimpleObject, Debug)]
pub struct GameBoardData {
    pub categories: Vec<String>,
    pub questions: Vec<DetailedBoardQuestion>, // Replace BoardQuestion with DetailedBoardQuestion
}
