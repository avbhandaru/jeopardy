-- Your SQL goes here
-- migrations/YYYYMMDDHHMMSS_create_board_questions/up.sql

CREATE TABLE IF NOT EXISTS board_questions (
    board_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    category TEXT NOT NULL,
    daily_double BOOLEAN NOT NULL DEFAULT FALSE,
    points INT NOT NULL,
    grid_row INT NOT NULL,
    grid_col INT NOT NULL,
    PRIMARY KEY (board_id, question_id),
    FOREIGN KEY (board_id) REFERENCES game_boards(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);