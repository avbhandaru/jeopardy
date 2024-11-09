// tests/common/fixtures.rs

use super::factories::{create_test_game_board, create_test_question, create_test_user};
use backend::models::game_board::{GameBoard, NewGameBoard};
use backend::models::question::{NewQuestion, Question};
use backend::models::user::{NewUser, User};
use chrono::Utc;
use diesel_async::AsyncPgConnection;

/// Creates a test fixture with mudkip as test user. Mudkip has one gameboard.
/// Mudkip has 10 questions.
///
/// # Parameters
/// - `conn`: A mutable reference to the database connection.
///
/// # Returns
/// - `User`: The created `User` instance.
///
/// # Panics
/// - If test fixture creation fails
///
/// # Examples
///
/// ```rust
/// let mudkip = mudkip_fixture(conn).await;
/// ```
pub async fn mudkip_fixture(conn: &mut AsyncPgConnection) -> User {
    let mudkip_user: User = create_test_user(
        conn,
        Some(NewUser {
            created_at: Utc::now(),
            updated_at: Utc::now(),
            username: "Mudkip".to_string(),
        }),
    )
    .await;

    let mudkip_game_board: GameBoard = create_test_game_board(
        conn,
        mudkip_user.id,
        Some(NewGameBoard {
            created_at: Utc::now(),
            updated_at: Utc::now(),
            user_id: mudkip_user.id,
            board_name: "Mudkip's Board".to_string(),
        }),
    )
    .await;

    // Create the 10 questions for mudkip
    for i in 1..=10 {
        let question_text = format!("Question {}", i);
        let answer_text = format!("Answer {}", i);
        let new_question: NewQuestion = NewQuestion {
            created_at: Utc::now(),
            updated_at: Utc::now(),
            user_id: mudkip_user.id,
            question_text: question_text,
            answer: answer_text,
        };
        create_test_question(conn, mudkip_user.id, Some(new_question)).await;
        println!("Created question {}", i);
    }

    mudkip_user
}
