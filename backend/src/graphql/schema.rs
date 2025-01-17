// src/graphql/schema.rs

use crate::db::pool::DBPool;
use async_graphql::{EmptySubscription, MergedObject, Schema};

use super::{
    mutations::{
        game::GameMutation, game_board::GameBoardMutation,
        game_board_question_mapping::GameBoardMappingMutation, player::PlayerMutation,
        question::QuestionMutation, user::UserMutation,
    },
    query::{
        game::GameQuery, game_board::GameBoardQuery, game_board_question::GameBoardQuestionQuery,
        game_board_question_mapping::GameBoardMappingQuery, player::PlayerQuery,
        question::QuestionQuery, user::UserQuery,
    },
};

#[derive(MergedObject, Default)]
pub struct RootQuery(
    UserQuery,
    GameBoardQuery,
    QuestionQuery,
    GameBoardQuestionQuery,
    GameBoardMappingQuery,
    GameQuery,
    PlayerQuery,
);

#[derive(MergedObject, Default)]
pub struct RootMutation(
    UserMutation,
    GameBoardMutation,
    QuestionMutation,
    GameBoardMappingMutation,
    GameMutation,
    PlayerMutation,
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
