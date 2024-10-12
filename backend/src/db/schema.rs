// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int8,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        username -> Text,
    }
}
