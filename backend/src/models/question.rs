// models/question.rs

use crate::db::schema::questions;
use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

/// Disel Question Model with async-graphql suppport
#[derive(Queryable, SimpleObject, Selectable, Insertable, Debug, Builder)]
#[diesel(table_name = questions)]
pub struct Question {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub question_text: String,
    pub answer: String,
}

#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = questions)]
pub struct NewQuestion {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub question_text: String,
    pub answer: String,
}

impl Question {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        question_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        questions::table.find(question_id).first(conn).await
    }

    pub async fn all(conn: &mut AsyncPgConnection) -> Result<Vec<Self>, diesel::result::Error> {
        questions::table.load::<Self>(conn).await
    }

    pub async fn find_by_user(
        conn: &mut AsyncPgConnection,
        user_id: i64,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        questions::table
            .filter(questions::user_id.eq(user_id))
            .load::<Self>(conn)
            .await
    }

    pub async fn create(
        conn: &mut AsyncPgConnection,
        new_question: NewQuestion,
    ) -> Result<Self, diesel::result::Error> {
        diesel::insert_into(questions::table)
            .values(&new_question)
            .get_result(conn)
            .await
    }
}
