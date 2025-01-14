-- Your SQL goes here
-- Add the new column with a default value
ALTER TABLE game_boards
ADD COLUMN categories TEXT[] NOT NULL DEFAULT '{"Category 1", "Category 2", "Category 3", "Category 4", "Category 5"}';

-- Backfill existing rows to ensure all rows have a valid value
UPDATE game_boards
SET categories = '{"Category 1", "Category 2", "Category 3", "Category 4", "Category 5"}'
WHERE categories IS NULL;

-- Enforce NOT NULL constraint
ALTER TABLE game_boards
ALTER COLUMN categories SET NOT NULL;

-- Enforce array length constraint
ALTER TABLE game_boards
ADD CONSTRAINT categories_length CHECK (array_length(categories, 1) = 5);

-- Enforce non-NULL elements in the array
ALTER TABLE game_boards
ADD CONSTRAINT non_null_categories_elements CHECK (
    array_position(categories, NULL) IS NULL
);