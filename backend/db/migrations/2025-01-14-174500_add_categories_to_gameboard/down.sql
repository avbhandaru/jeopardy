-- This file should undo anything in `up.sql`
ALTER TABLE game_boards
DROP CONSTRAINT categories_length,
DROP COLUMN categories;