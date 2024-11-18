// @generated automatically by Diesel CLI.

diesel::table! {
    game_boards (id) {
        id -> Int8,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        user_id -> Int8,
        board_name -> Text,
        grid -> Jsonb,
    }
}

diesel::table! {
    questions (id) {
        id -> Int8,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        user_id -> Int8,
        question_text -> Text,
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

diesel::joinable!(game_boards -> users (user_id));
diesel::joinable!(questions -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(game_boards, questions, users,);
