// models/player.rs

use chrono::{DateTime, Utc};

use crate::db::schema::players;
use crate::models::game::Game;
use async_graphql::SimpleObject;
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

/// Represents a player in the application.
///
/// This struct supports Diesel for database interactions
/// and integrates with async-graphql for GraphQL APIs. It is
/// associated with the `Game` struct.
#[derive(
    Identifiable, Associations, Queryable, SimpleObject, Selectable, Debug, Builder, Clone,
)]
#[diesel(table_name = players)]
#[diesel(belongs_to(Game))]
pub struct Player {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub game_id: i64,
    pub player_name: String,
    pub score: i32,
}

/// Represents a new player to be inserted into the database.
#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = players)]
pub struct NewPlayer {
    pub game_id: i64,
    pub player_name: String,
}

/// Represents the fields to update in an existing player record.
#[derive(Debug, AsChangeset)]
#[diesel(table_name = players)]
pub struct UpdatePlayer {
    pub player_name: Option<String>,
    pub score: Option<i32>,
}

impl Player {
    /// Find a player by their unique ID.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `player_id` - The unique identifier of the player to fetch.
    ///
    /// # Returns
    /// A `Result` containing the player or a Diesel error.
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        player_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        players::table.find(player_id).first(conn).await
    }

    /// Fetch all players associated with a specific game.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `game_id` - The unique identifier of the game.
    ///
    /// # Returns
    /// A `Result` containing a vector of players or a Diesel error.
    pub async fn fetch_by_game_id(
        conn: &mut AsyncPgConnection,
        game_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        players::table
            .filter(players::game_id.eq(game_id))
            .load::<Self>(conn)
            .await
    }

    /// Create a new player in the database.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `new_player` - A `NewPlayer` instance containing the player's data.
    ///
    /// # Returns
    /// A `Result` containing the newly created player or a Diesel error.
    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_player: NewPlayer,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(players::table)
            .values(&new_player)
            .get_result(conn)
            .await
    }

    /// Update an existing player record.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `player_id` - The unique identifier of the player to update.
    /// * `updated_fields` - An `UpdatePlayer` instance containing the updated fields.
    ///
    /// # Returns
    /// A `Result` containing the updated player or a Diesel error.
    pub async fn update_player(
        conn: &mut AsyncPgConnection,
        player_id: i64,
        updated_fields: UpdatePlayer,
    ) -> Result<Self, diesel::result::Error> {
        diesel::update(players::table.find(player_id))
            .set(&updated_fields)
            .get_result(conn)
            .await
    }

    /// Delete a player by their unique ID.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `player_id` - The unique identifier of the player to delete.
    ///
    /// # Returns
    /// A `Result` containing the deleted player or a Diesel error.
    pub async fn delete(
        conn: &mut AsyncPgConnection,
        player_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        let player = Player::find_by_id(conn, player_id).await?;
        diesel::delete(players::table.find(player_id))
            .execute(conn)
            .await?;
        Ok(player)
    }
}
