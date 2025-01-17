// models/game.rs

use crate::db::schema::games;
use crate::models::user::User;
use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

/// Represents a game in the application.
///
/// This struct supports Diesel for database interactions
/// and integrates with async-graphql for GraphQL APIs. It is
/// associated with the `User` struct.
#[derive(
    Identifiable, Associations, Queryable, Selectable, Debug, SimpleObject, Builder, Clone,
)]
#[diesel(table_name = games)]
#[diesel(belongs_to(User))]
pub struct Game {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub game_board_id: i64,
}

/// Represents a new game to be inserted into the database.
#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = games)]
pub struct NewGame {
    pub user_id: i64,
    pub game_board_id: i64,
}

impl Game {
    /// Find a game by its unique ID.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `game_id` - The unique identifier of the game to fetch.
    ///
    /// # Returns
    /// A `Result` containing the game or a Diesel error.
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        game_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        games::table.find(game_id).first(conn).await
    }

    /// Fetch all games from the database.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    ///
    /// # Returns
    /// A `Result` containing a vector of games or a Diesel error.
    pub async fn all(conn: &mut AsyncPgConnection) -> Result<Vec<Self>, diesel::result::Error> {
        games::table.load::<Self>(conn).await
    }

    /// Fetch all games created by a specific user.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `user_id` - The unique identifier of the user.
    ///
    /// # Returns
    /// A `Result` containing a vector of games or a Diesel error.
    pub async fn fetch_by_user(
        conn: &mut AsyncPgConnection,
        user_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        games::table
            .filter(games::user_id.eq(user_id))
            .load::<Self>(conn)
            .await
    }

    /// Create a new game in the database.
    ///
    /// # Arguments
    /// * `conn` - A mutable reference to an async PostgreSQL connection.
    /// * `new_game` - A `NewGame` instance containing the game's data.
    ///
    /// # Returns
    /// A `Result` containing the newly created game or a Diesel error.
    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_game: NewGame,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(games::table)
            .values(&new_game)
            .get_result(conn)
            .await
    }
}
