// graphql/mutations/player.rs

use crate::db::pool::DBPool;
use crate::models::player::{NewPlayer, Player, UpdatePlayer};
use async_graphql::{Context, InputObject, Object, Result};

#[derive(InputObject)]
pub struct CreatePlayerInput {
    pub game_id: i64,
    pub player_name: String,
}

#[derive(Default)]
pub struct PlayerMutation;

#[Object]
impl PlayerMutation {
    /// Create a new player
    async fn create_player(&self, ctx: &Context<'_>, input: CreatePlayerInput) -> Result<Player> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;

        let new_player: NewPlayer = NewPlayer {
            game_id: input.game_id,
            player_name: input.player_name,
        };

        let player: Player = Player::create(&mut conn, new_player).await?;
        Ok(player)
    }

    async fn update_player_score(
        &self,
        ctx: &Context<'_>,
        player_id: i64,
        score: i32,
    ) -> Result<Player> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let updated_player = Player::update_player(
            &mut conn,
            player_id,
            UpdatePlayer {
                player_name: None,
                score: Some(score),
            },
        )
        .await?;
        Ok(updated_player)
    }
}
