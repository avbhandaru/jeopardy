-- Your SQL goes here
-- grid_cells needs to be "2 way door decision" vs 1 way
CREATE TABLE IF NOT EXISTS game_boards (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    board_name TEXT NOT NULL,
    grid JSONB NOT NULL DEFAULT '[]',  -- JSONB column to store the grid
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TRIGGER game_boards_updated_at
    BEFORE UPDATE
    ON game_boards
    FOR EACH ROW
EXECUTE PROCEDURE diesel_set_updated_at();
