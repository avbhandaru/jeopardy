-- Your SQL goes here
-- migrations/YYYYMMDDHHMMSS_seed_mock_data/up.sql

INSERT INTO users (username, firebase_uid) VALUES
('jeopardy_master', gen_random_uuid()),
('quiz_wizard', gen_random_uuid()),
('daily_double_dominator', gen_random_uuid()),
('category_king', gen_random_uuid()),
('clue_collector', gen_random_uuid()),
('Mudkip', gen_random_uuid());

INSERT INTO game_boards (user_id, title) VALUES
(1, 'General Knowledge Board'),
(2, 'Science & Nature Trivia'),
(3, 'Pop Culture Quiz'),
(4, 'History Challenge'),
(5, 'Literature & Arts'),
(6, 'Mudkip Lore');


INSERT INTO questions (user_id, question, answer) VALUES
(1, 'What is the capital of France?', 'Paris'),
(2, 'What is the chemical symbol for water?', 'H2O'),
(3, 'Who wrote "To Kill a Mockingbird"?', 'Harper Lee'),
(4, 'In which year did World War II end?', '1945'),
(5, 'What is the largest planet in our solar system?', 'Jupiter');


INSERT INTO game_board_question_mappings (board_id, question_id, daily_double, points, grid_row, grid_col) VALUES
(1, 1, FALSE, 200, 1, 1),
(1, 2, TRUE, 400, 2, 2),
(2, 3, FALSE, 600, 3, 3),
(3, 4, FALSE, 800, 4, 4),
(4, 5, FALSE, 1000, 5, 5);
