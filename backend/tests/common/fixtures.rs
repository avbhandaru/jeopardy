// tests/common/fixtures.rs

use super::factories::{create_test_game_board, create_test_question, create_test_user};
use backend::models::board_question::{BoardQuestion, NewBoardQuestion};
use backend::models::game_board::{GameBoard, NewGameBoard};
use backend::models::question::{NewQuestion, Question};
use backend::models::user::{NewUser, User};
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
            username: "Mudkip".to_string(),
        }),
    )
    .await;

    let _mudkip_game_board: GameBoard = create_test_game_board(
        conn,
        mudkip_user.id,
        Some(NewGameBoard {
            user_id: mudkip_user.id,
            title: "Mudkip's Board".to_string(),
        }),
    )
    .await;

    // Create the 10 questions for mudkip
    for i in 1..=10 {
        let question_text = format!("Question {}", i);
        let answer_text = format!("Answer {}", i);
        let new_question: NewQuestion = NewQuestion {
            user_id: mudkip_user.id,
            question: question_text,
            answer: answer_text,
        };
        create_test_question(conn, mudkip_user.id, Some(new_question)).await;
        println!("Created question {}", i);
    }

    mudkip_user
}

pub async fn mudkip_board_with_questions(
    conn: &mut AsyncPgConnection,
) -> (GameBoard, Vec<BoardQuestion>) {
    let user = mudkip_fixture(conn).await;

    // Fetch questions from user
    let questions = Question::find_by_user(conn, user.id).await.unwrap();

    // Fetch board
    let boards = GameBoard::find_by_user(conn, user.id).await.unwrap();
    let board = boards.into_iter().next().unwrap();

    let category = "Water Types".to_string();
    let daily_double = false;

    let board_questions_data = vec![
        (questions[0].id, 100, 0, 0),
        (questions[1].id, 200, 1, 0),
        (questions[2].id, 300, 2, 0),
        (questions[3].id, 400, 3, 0),
        (questions[4].id, 500, 4, 0),
    ];

    let mut created_board_questions = Vec::new();
    for (question_id, points, grid_row, grid_col) in board_questions_data {
        let new_board_question = NewBoardQuestion {
            board_id: board.id,
            question_id,
            category: category.clone(),
            daily_double,
            points,
            grid_row,
            grid_col,
        };

        let board_question = BoardQuestion::create(conn, new_board_question)
            .await
            .unwrap();
        created_board_questions.push(board_question);
    }

    (board, created_board_questions)
}
