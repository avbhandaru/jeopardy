// tests/factories.rs

use backend::graphql::mutations::user;
use backend::models::game_board::{GameBoard, NewGameBoard};
use backend::models::question::{NewQuestion, Question};
use backend::models::user::{NewUser, User};
use chrono::Utc;
use diesel_async::AsyncPgConnection;

/// Creates new test user with default values
/// Allows overriding specific fields via the 'overrides' parameter
pub async fn create_test_user(conn: &mut AsyncPgConnection, overrides: Option<NewUser>) -> User {
    let mut builder = NewUser::builder()
        .created_at(Utc::now())
        .updated_at(Utc::now())
        .username("defaultuser");

    if let Some(overrides) = overrides {
        if let Some(username) = overrides.username {
            builder = builder.username(username);
        }
        if let Some(created_at) = overrides.created_at {
            builder = builder.created_at(created_at);
        }
        if let Some(updated_at) = overrides.updated_at {
            builder = builder.updated_at(updated_at);
        }
    }

    let new_user: NewUser = builder.build().expect("Failed to build new user");

    User::create(conn, new_user)
        .await
        .expect("Failed to create test user")
}

/// Creates a new test game board with default values
/// Requires a valid 'user_id' to associate game board with a user
/// Allows overriding specific fields via the 'overrides' parameter
pub async fn create_test_game_board(
    conn: &mut AsyncPgConnection,
    user_id: i64,
    overrides: Option<NewGameBoard>,
) -> GameBoard {
    let builder = NewGameBoard::builder()
        .created_at(Utc::now())
        .updated_at(Utc::now())
        .user_id(user_id)
        .board_name("defaultboard");

    if let Some(overrides) = overrides {
        if let Some(board_name) = overrides.board_name {
            builder = builder.board_name(overrides.board_name);
        }
        if let Some(created_at) = overrides.created_at {
            builder = builder.created_at(overrides.created_at);
        }
        if let Some(updated_at) = overrides.updated_at {
            builder = buider.updated_at(overrides.updated_at);
        }
    }

    let new_game_board = builder.build().expect("Faield to build new game board");

    GameBoard::create(conn, new_game_board)
        .await
        .expect("Failed to create test game board")
}
