// src/graphql/schema.rs

use crate::db::pool::DBPool;
use async_graphql::{EmptySubscription, MergedObject, Schema};

use super::{
    mutations::{
        board_question::BoardQuestionMutation, game_board::GameBoardMutation,
        question::QuestionMutation, user::UserMutation,
    },
    query::{
        board_question::BoardQuestionQuery, game_board::GameBoardQuery, question::QuestionQuery,
        user::UserQuery,
    },
};

#[derive(MergedObject, Default)]
pub struct RootQuery(UserQuery, GameBoardQuery, QuestionQuery, BoardQuestionQuery);

#[derive(MergedObject, Default)]
pub struct RootMutation(
    UserMutation,
    GameBoardMutation,
    QuestionMutation,
    BoardQuestionMutation,
);

pub type AppSchema = Schema<RootQuery, RootMutation, EmptySubscription>;

pub fn create_schema(pool: DBPool) -> AppSchema {
    Schema::build(
        RootQuery::default(),
        RootMutation::default(),
        EmptySubscription,
    )
    .data(pool.clone())
    .finish()
}
