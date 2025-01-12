// graphql/mutations/game.rs

use async_graphql::{Context, InputObject, Object, Result};

use crate::db::pool::DBPool;
use crate::models::game::{Game, NewGame};

#[derive(InputObject)]
pub struct CreateGameInput {
    pub user_id: i64,
    pub game_board_id: i64,
}

#[derive(Default)]
pub struct GameMutation;

#[Object]
impl GameMutation {
    async fn create_game(&self, ctx: &Context<'_>, input: CreateGameInput) -> Result<Game> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let new_game: NewGame = NewGame {
            user_id: input.user_id,
            game_board_id: input.game_board_id,
        };
        let game: Game = Game::create(&mut conn, new_game).await?;
        Ok(game)
    }
}
