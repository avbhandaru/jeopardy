-- This file should undo anything in `up.sql`
DROP TABLE IF EXISTS users;
DROP TRIGGER IF EXISTS users_updated_at ON users;
