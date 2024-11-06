// tests/common/factories.rs

use backend::models::game_board::{GameBoard, NewGameBoard, NewGameBoardBuilder};
use backend::models::question::{NewQuestion, NewQuestionBuilder, Question};
use backend::models::user::{NewUser, NewUserBuilder, User};
use chrono::Utc;
use diesel_async::AsyncPgConnection;

/// Creates a new test user with default values.
///
/// # Parameters
/// - `conn`: A mutable reference to the database connection.
/// - `overrides`: Optional `NewUser` struct to override default fields.
///
/// # Returns
/// - `User`: The created `User` instance.
///
/// # Panics
/// - If user creation fails.
///
/// # Examples
///
/// ```rust
/// let user = create_test_user(conn, None).await;
/// let custom_user = create_test_user(conn, Some(NewUser { username: "custom".to_string(), ..Default::default() })).await;
/// ```
pub async fn create_test_user(conn: &mut AsyncPgConnection, overrides: Option<NewUser>) -> User {
    let mut builder: NewUserBuilder = NewUserBuilder::default();

    if let Some(overrides) = overrides {
        builder.username(overrides.username);
        builder.created_at(overrides.created_at);
        builder.updated_at(overrides.updated_at);
    } else {
        builder.created_at(Utc::now());
        builder.updated_at(Utc::now());
        builder.username("defaultuser".to_string());
    }

    let new_user: NewUser = builder.build().expect("Failed to build new user");

    User::create(conn, new_user)
        .await
        .expect("Failed to create test user")
}

/// Creates a new test game board with default values
///
/// # Paremeters
/// - `conn`: A mutable reference to the database connection
/// - `user_id`: a valid 'user_id' to associate game board with a user
/// - `overrides`: Optional `NewGameBoard` struct to override default fields
///
/// # Returns
/// - `GameBoard`: The created `GameBoard` instance
///
/// # Panics
/// - If gameboard creation fails
///
/// # Examples
///
/// ```rust
/// let game_board = create_test_game_board(conn, 7, None).await;
/// let custom_game_board = create_test_game_board(conn, 7,
///                             Some(NewGameBoard {
///                                 board_name: "custom".to_string(),
///                                 ..Default::default()
///                             })).await;
/// ```
pub async fn create_test_game_board(
    conn: &mut AsyncPgConnection,
    user_id: i64,
    overrides: Option<NewGameBoard>,
) -> GameBoard {
    let mut builder: NewGameBoardBuilder = NewGameBoardBuilder::default();

    if let Some(overrides) = overrides {
        builder.created_at(overrides.created_at);
        builder.updated_at(overrides.updated_at);
        builder.board_name(overrides.board_name);
        builder.user_id(user_id);
    } else {
        builder.created_at(Utc::now());
        builder.updated_at(Utc::now());
        builder.user_id(user_id);
        builder.board_name("defaultboard".to_string());
    }

    let new_game_board: NewGameBoard = builder.build().expect("Faild to build new game board");

    GameBoard::create(conn, new_game_board)
        .await
        .expect("Failed to create test game board")
}

/// Creates a new question with default values
///
/// # Parameters
/// - `conn`: A mutable reference to the database connection.
/// - `user_id`: a valid 'user_id' to associate question with a user
/// - `overrides`: Optional `NewQuestion` struct to override default fields.
///
/// # Returns
/// - `Question`: The created `Question` instance.
///
/// # Panics
/// - If question creation fails.
///
/// # Examples
///
/// ```rust
/// let question = create_test_question(conn, 7, None).await;
/// let custom_question = create_test_question(conn, 7,
///                     Some(NewQuestion { question_text: "custom".to_string(), answer: "custom".to_string(), ..Default::default() })
///                     ).await;
/// ```
pub async fn create_test_question(
    conn: &mut AsyncPgConnection,
    user_id: i64,
    overrides: Option<NewQuestion>,
) -> Question {
    let mut builder: NewQuestionBuilder = NewQuestionBuilder::default();

    if let Some(overrides) = overrides {
        builder.created_at(overrides.created_at);
        builder.updated_at(overrides.updated_at);
        builder.user_id(user_id);
        builder.question_text(overrides.question_text);
        builder.answer(overrides.answer);
    } else {
        builder.created_at(Utc::now());
        builder.updated_at(Utc::now());
        builder.user_id(user_id);
        builder.question_text("defaultquestion".to_string());
        builder.answer("defaultanswer".to_string());
    }

    let new_question: NewQuestion = builder.build().expect("Failed to build new question");
    Question::create(conn, new_question)
        .await
        .expect("Failed to create test question")
}
