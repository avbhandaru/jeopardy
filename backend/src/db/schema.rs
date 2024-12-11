// @generated automatically by Diesel CLI.

diesel::table! {
    board_questions (board_id, question_id) {
        board_id -> Int8,
        question_id -> Int8,
        category -> Text,
        daily_double -> Bool,
        points -> Int4,
        grid_row -> Int4,
        grid_col -> Int4,
    }
}

diesel::table! {
    game_boards (id) {
        id -> Int8,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        user_id -> Int8,
        title -> Text,
    }
}

diesel::table! {
    questions (id) {
        id -> Int8,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        user_id -> Int8,
        question -> Text,
        answer -> Text,
    }
}

diesel::table! {
    users (id) {
        id -> Int8,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        username -> Text,
    }
}

diesel::joinable!(board_questions -> game_boards (board_id));
diesel::joinable!(board_questions -> questions (question_id));
diesel::joinable!(game_boards -> users (user_id));
diesel::joinable!(questions -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(board_questions, game_boards, questions, users,);
