// src/models/board_question.rs

use crate::db::schema::board_questions;
use crate::models::game_board::GameBoard;
use crate::models::question::Question;
use async_graphql::SimpleObject;
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

#[derive(Identifiable, Associations, Queryable, Selectable, Debug, SimpleObject, Builder)]
#[diesel(primary_key(board_id, question_id))]
#[diesel(table_name = board_questions)]
#[diesel(belongs_to(GameBoard, foreign_key = board_id))]
#[diesel(belongs_to(Question, foreign_key = question_id))]
pub struct BoardQuestion {
    pub board_id: i64,
    pub question_id: i64,
    pub category: String,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}

#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = board_questions)]
pub struct NewBoardQuestion {
    pub board_id: i64,
    pub question_id: i64,
    pub category: String,
    pub daily_double: bool,
    pub points: i32,
    pub grid_row: i32,
    pub grid_col: i32,
}

#[derive(Debug, AsChangeset)]
#[diesel(table_name = board_questions)]
pub struct UpdateBoardQuestion {
    pub category: Option<String>,
    pub daily_double: Option<bool>,
    pub points: Option<i32>,
    pub grid_row: Option<i32>,
    pub grid_col: Option<i32>,
}

impl BoardQuestion {
    /// Create a new board_question association
    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_board_question: NewBoardQuestion,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(board_questions::table)
            .values(&new_board_question)
            .get_result(conn)
            .await
    }

    /// Find all questions associated with a game board
    pub async fn find_by_board(
        conn: &mut AsyncPgConnection,
        board_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        board_questions::table
            .filter(board_questions::board_id.eq(board_id))
            .load::<Self>(conn)
            .await
    }

    /// Find boardquestion by question id
    pub async fn find_by_question(
        conn: &mut AsyncPgConnection,
        question_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        board_questions::table
            .filter(board_questions::question_id.eq(question_id))
            .load::<Self>(conn)
            .await
    }

    /// Find a boardquestion by board id and question id
    pub async fn find_by_board_and_question(
        conn: &mut AsyncPgConnection,
        board_id: i64,
        question_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        board_questions::table
            .filter(board_questions::board_id.eq(board_id))
            .filter(board_questions::question_id.eq(question_id))
            .first(conn)
            .await
    }

    pub async fn update_board_question(
        conn: &mut AsyncPgConnection,
        board_id: i64,
        question_id: i64,
        updated_fields: UpdateBoardQuestion,
    ) -> Result<Self, diesel::result::Error> {
        diesel::update(board_questions::table.find((board_id, question_id)))
            .set(&updated_fields)
            .get_result(conn)
            .await
    }
}
