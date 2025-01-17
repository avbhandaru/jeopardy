// src/graphql/query/game_board_question_mapping.rs

use crate::db::pool::DBPool;
use crate::graphql::types::game_board_types::DetailedBoardQuestion;
use crate::models::game_board_question_mapping::GameBoardQuestionMapping;
use crate::models::question::Question;
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct GameBoardMappingQuery;

#[Object]
impl GameBoardMappingQuery {
    /// Fetch a GameBoard-Question mapping by board id and question id
    async fn find_game_board_mapping(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
        question_id: i64,
    ) -> Result<GameBoardQuestionMapping> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let mapping = GameBoardQuestionMapping::find_mapping_by_board_and_question(
            &mut conn,
            game_board_id,
            question_id,
        )
        .await?;
        Ok(mapping)
    }

    /// Fetch all GameBoard-Question mappings for a specific GameBoard
    async fn find_game_board_mappings(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
    ) -> Result<Vec<GameBoardQuestionMapping>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let mappings =
            GameBoardQuestionMapping::find_mappings_by_board_id(&mut conn, game_board_id).await?;

        Ok(mappings)
    }

    /// Fetch DetailedBoardQuestion from game_board_id and question_id
    async fn find_detailed_board_question(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
        question_id: i64,
    ) -> Result<DetailedBoardQuestion> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let mapping = GameBoardQuestionMapping::find_mapping_by_board_and_question(
            &mut conn,
            game_board_id,
            question_id,
        )
        .await?;
        let question = Question::find_by_id(&mut conn, question_id).await?;

        let detailed_board_question = DetailedBoardQuestion { mapping, question };

        Ok(detailed_board_question)
    }

    /// Fetch game board data
    async fn find_detailed_board_questions(
        &self,
        ctx: &Context<'_>,
        game_board_id: i64,
    ) -> Result<Vec<DetailedBoardQuestion>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let questions =
            GameBoardQuestionMapping::find_detailed_mappings_by_board_id(&mut conn, game_board_id)
                .await?;

        Ok(questions)
    }
}
