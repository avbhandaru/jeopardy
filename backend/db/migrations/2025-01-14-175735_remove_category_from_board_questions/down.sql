-- This file should undo anything in `up.sql`
ALTER TABLE board_questions
ADD COLUMN category TEXT;