// graphql/query/player.rs

use crate::db::pool::DBPool;
use crate::models::player::Player;
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct PlayerQuery;

#[Object]
impl PlayerQuery {
    /// Fetch a single player by id
    async fn player(&self, ctx: &Context<'_>, player_id: i64) -> Result<Player> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let player: Player = Player::find_by_id(&mut conn, player_id).await?;
        Ok(player)
    }

    /// Fetch all players by game id
    async fn fetch_players_from_game(
        &self,
        ctx: &Context<'_>,
        game_id: i64,
    ) -> Result<Vec<Player>> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let players = Player::find_by_game_id(&mut conn, game_id).await?;
        Ok(players)
    }
}
