-- This file should undo anything in `up.sql`
DROP TABLE IF EXISTS questions;
DROP TRIGGER IF EXISTS questions_updated_at on questions;