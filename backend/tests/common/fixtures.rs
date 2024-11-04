// tests/common/fixtures.rs

use super::factories::{create_test_game_board, create_test_question, create_test_user};
use backend::models::game_board::GameBoard;
use backend::models::question::Question;
use backend::models::user::User;
use diesel_async::AsyncPgConnection;

pub struct TestFixtures {
    pub user: User,
    pub game_board: Option<GameBoard>,
    pub questions: Option<Vec<Question>>,
}

impl TestFixtures {
    /// Initializes fixtures with a default user.
    pub async fn new(conn: &mut AsyncPgConnection) -> Self {
        let user: User = create_test_user(conn, None).await;

        Self {
            user,
            game_board: None,
            questions: None,
        }
    }

    /// Adds a game board to the fixtures.
    pub async fn with_game_board(mut self, conn: &mut AsyncPgConnection) -> Self {
        let game_board: GameBoard = create_test_game_board(conn, self.user.id, None).await;
        self.game_board = Some(game_board);
        self
    }

    /// Adds a question to the fixtures
    pub async fn with_question(mut self, conn: &mut AsyncPgConnection) -> Self {
        let question: Question = create_test_question(conn, self.user.id, None).await;
        let questions: Vec<Question> = vec![question];
        self.questions = Some(questions);
        self
    }
}
