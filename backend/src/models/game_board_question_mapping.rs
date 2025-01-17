// src/models/board_question.rs

use crate::models::game_board::GameBoard;
use crate::models::question::Question;
use crate::{
    db::schema::game_board_question_mappings,
    graphql::types::game_board_types::DetailedBoardQuestion,
};
use async_graphql::SimpleObject;
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

#[derive(
    Identifiable, Associations, Queryable, Selectable, Debug, SimpleObject, Builder, Clone,
)]
#[diesel(primary_key(board_id, question_id))]
#[diesel(table_name = game_board_question_mappings)]
#[diesel(belongs_to(GameBoard, foreign_key = board_id))]
#[diesel(belongs_to(Question, foreign_key = question_id))]
pub struct GameBoardQuestionMapping {
    pub board_id: i64,
    pub question_id: i64,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}

#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = game_board_question_mappings)]
pub struct NewGameBoardQuestionMapping {
    pub board_id: i64,
    pub question_id: i64,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}

#[derive(Debug, AsChangeset)]
#[diesel(table_name = game_board_question_mappings)]
pub struct UpdateGameBoardQuestionMapping {
    pub daily_double: Option<bool>,
    pub points: Option<i32>,
    pub grid_row: Option<i32>,
    pub grid_col: Option<i32>,
}

impl GameBoardQuestionMapping {
    /// Create a new game board-question mapping
    pub async fn create_mapping(
        conn: &mut AsyncPgConnection,
        new_mapping: NewGameBoardQuestionMapping,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(game_board_question_mappings::table)
            .values(&new_mapping)
            .get_result(conn)
            .await
    }

    /// Find all mappings for a board
    pub async fn find_mappings_by_board_id(
        conn: &mut AsyncPgConnection,
        board_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        game_board_question_mappings::table
            .filter(game_board_question_mappings::board_id.eq(board_id))
            .load::<Self>(conn)
            .await
    }

    /// Find all mappings for a question
    pub async fn find_mappings_by_question_id(
        conn: &mut AsyncPgConnection,
        question_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        game_board_question_mappings::table
            .filter(game_board_question_mappings::question_id.eq(question_id))
            .load::<Self>(conn)
            .await
    }

    /// Find a mapping from board id and question id
    pub async fn find_mapping_by_board_and_question(
        conn: &mut AsyncPgConnection,
        board_id: i64,
        question_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        game_board_question_mappings::table
            .filter(game_board_question_mappings::board_id.eq(board_id))
            .filter(game_board_question_mappings::question_id.eq(question_id))
            .first(conn)
            .await
    }

    /// Find a mapping by board id, row, and column
    pub async fn find_mapping_by_row_and_col(
        conn: &mut AsyncPgConnection,
        game_board_id: i64,
        row: i32,
        col: i32,
    ) -> Result<Self, diesel::result::Error> {
        game_board_question_mappings::table
            .filter(game_board_question_mappings::board_id.eq(game_board_id))
            .filter(game_board_question_mappings::grid_row.eq(row))
            .filter(game_board_question_mappings::grid_col.eq(col))
            .first(conn)
            .await
    }

    /// Update fields for a specific mapping
    pub async fn update_mapping(
        conn: &mut AsyncPgConnection,
        board_id: i64,
        question_id: i64,
        updated_fields: UpdateGameBoardQuestionMapping,
    ) -> Result<Self, diesel::result::Error> {
        diesel::update(game_board_question_mappings::table.find((board_id, question_id)))
            .set(&updated_fields)
            .get_result(conn)
            .await
    }

    /// Fetch all mappings with questions for a gameboard
    pub async fn find_detailed_mappings_by_board_id(
        conn: &mut AsyncPgConnection,
        game_board_id: i64,
    ) -> Result<Vec<DetailedBoardQuestion>, diesel::result::Error> {
        // Fetch mappings
        let mappings: Vec<GameBoardQuestionMapping> = game_board_question_mappings::table
            .filter(game_board_question_mappings::board_id.eq(game_board_id))
            .order_by((
                game_board_question_mappings::grid_col,
                game_board_question_mappings::grid_row,
            ))
            .load(conn)
            .await?;

        // Fetch questions for each mapping
        let mut detailed_questions = Vec::new();
        for mapping in mappings {
            let question = Question::find_by_id(conn, mapping.question_id).await?;
            detailed_questions.push(DetailedBoardQuestion { mapping, question });
        }

        Ok(detailed_questions)
    }
}
