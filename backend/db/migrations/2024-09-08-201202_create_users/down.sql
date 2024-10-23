-- This file should undo anything in `up.sql`
-- we don't want to delete tables with down.sql
DROP TABLE IF EXISTS users;
DROP TRIGGER IF EXISTS users_updated_at ON users;
