-- Your SQL goes here
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    username TEXT NOT NULL,
    firebase_uid TEXT NOT NULL UNIQUE
);

CREATE TRIGGER users_updated_at
    BEFORE UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE diesel_set_updated_at();
