// graphql/query/game.rs

use crate::db::pool::DBPool;
use crate::models::game::Game;
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct GameQuery;

#[Object]
impl GameQuery {
    /// Fetch a single game by id
    async fn get_game(&self, ctx: &Context<'_>, game_id: i64) -> Result<Game> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let game: Game = Game::find_by_id(&mut conn, game_id).await?;
        Ok(game)
    }

    /// Fetch all games from user
    async fn get_games_from_user(&self, ctx: &Context<'_>, user_id: i64) -> Result<Vec<Game>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let games = Game::find_by_user(&mut conn, user_id).await?;
        Ok(games)
    }
}
