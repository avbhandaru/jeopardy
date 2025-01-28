-- Your SQL goes here
CREATE TABLE IF NOT EXISTS game_boards (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    categories TEXT[] NOT NULL DEFAULT '{"Category 1", "Category 2", "Category 3", "Category 4", "Category 5"}',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TRIGGER game_boards_updated_at
    BEFORE UPDATE
    ON game_boards
    FOR EACH ROW
EXECUTE PROCEDURE diesel_set_updated_at();


-- Enforce non-NULL elements in the array
ALTER TABLE game_boards
ADD CONSTRAINT non_null_categories_elements CHECK (
    array_position(categories, NULL) IS NULL
);