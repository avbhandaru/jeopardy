extern crate lib;

use chrono::NaiveDateTime;
use diesel::prelude::*;
use diesel_async::{RunQueryDsl, AsyncConnection, AsyncPgConnection};

// ordinary diesel model setup
table! {
    users {
        id -> BigInt,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        username -> Text,
    }
}

#[derive(Queryable, Selectable, Insertable, Debug)]
#[diesel(table_name = users)]
struct User {
    id: i64,
    created_at: NaiveDateTime,
    updated_at: NaiveDateTime,
    username: String,
}

#[tokio::main]
async fn main() {
    // create an async connection
    let data = try_db().await;
    let hello = lib::Greeter::new("Hello");
    for user in data.iter() {
        println!("User: {} {} {} {}", user.id, user.username, user.created_at, user.updated_at);
        hello.print(&user.username);
    }
}

async fn try_db() -> Vec<User> {
    let mut connection = AsyncPgConnection::establish(&std::env::var("DATABASE_URL").unwrap()).await.unwrap();

    let results = diesel::insert_into(users::table)
        .values(&vec![
            users::username.eq("Akhil"),
            users::username.eq("Matt"),
            users::username.eq("Hana"),
            users::username.eq("Alex")
        ])
        .returning(User::as_returning())
        .get_results(&mut connection)
        .await.unwrap();

    println!("New users created: {:?}", results);

    diesel::update(users::table)
        .filter(users::username.eq("Hana"))
        .set(users::username.eq("LetterCook"))
        .execute(&mut connection)
        .await.unwrap();

    // use ordinary diesel query dsl to construct your query
    users::table
        .filter(users::id.gt(0))
        .or_filter(users::username.like("%Luke"))
        .select(User::as_select())
        // execute the query via the provided
        // async `diesel_async::RunQueryDsl`
        .load(&mut connection)
        .await.unwrap()
}
