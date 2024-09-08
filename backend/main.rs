extern crate lib;

use diesel::prelude::*;
use diesel_async::{RunQueryDsl, AsyncConnection, AsyncPgConnection};

// ordinary diesel model setup
table! {
    users {
        id -> Integer,
        name -> Text,
    }
}

#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = users)]
struct User {
    id: i32,
    name: String,
}

#[tokio::main]
async fn main() {
    // create an async connection
    let data = try_db().await;
    let hello = lib::Greeter::new("Hello");
    for user in data.iter() {
        println!("User: {} {}", user.id, user.name);
        hello.print(&user.name);
    }
}

async fn try_db() -> Vec<User> {
    let mut connection = AsyncPgConnection::establish(&std::env::var("DATABASE_URL").unwrap()).await.unwrap();

    // use ordinary diesel query dsl to construct your query
    users::table
        .filter(users::id.gt(0))
        .or_filter(users::name.like("%Luke"))
        .select(User::as_select())
        // execute the query via the provided
        // async `diesel_async::RunQueryDsl`
        .load(&mut connection)
        .await.unwrap()
}
