-- This file should undo anything in `up.sql`
DROP TABLE IF EXISTS game_boards;
DROP TRIGGER IF EXISTS game_boards_updated_at ON game_boards;