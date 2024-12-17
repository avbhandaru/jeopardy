// models/question.rs

use crate::db::schema::questions;
use crate::models::user::User;
use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use derive_builder::Builder;
use diesel::prelude::*;
use diesel_async::{AsyncPgConnection, RunQueryDsl};

/// Disel Question Model with async-graphql suppport
#[derive(
    Identifiable, Associations, Queryable, SimpleObject, Selectable, Debug, Builder, Clone,
)]
#[diesel(table_name = questions)]
#[diesel(belongs_to(User))]
pub struct Question {
    pub id: i64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub question: String,
    pub answer: String,
}

/// Struct for creating new question
#[derive(Debug, Insertable, Builder)]
#[diesel(table_name = questions)]
pub struct NewQuestion {
    pub user_id: i64,
    pub question: String,
    pub answer: String,
}

/// Struct for updating a question
#[derive(Debug, AsChangeset)]
#[diesel(table_name = questions)]
pub struct UpdateQuestion {
    pub question: Option<String>,
    pub answer: Option<String>,
}

impl Question {
    pub async fn find_by_id(
        conn: &mut AsyncPgConnection,
        question_id: i64,
    ) -> Result<Self, diesel::result::Error> {
        questions::table.find(question_id).first(conn).await
    }

    pub async fn find_by_ids(
        conn: &mut AsyncPgConnection,
        ids: Vec<i64>,
    ) -> Result<Vec<Self>, diesel::result::Error> {
        questions::table
            .filter(questions::id.eq_any(ids))
            .load::<Self>(conn)
            .await
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

    pub async fn update_question(
        conn: &mut AsyncPgConnection,
        question_id: i64,
        updated_fields: UpdateQuestion,
    ) -> Result<Self, diesel::result::Error> {
        diesel::update(questions::table.find(question_id))
            .set(&updated_fields)
            .get_result(conn)
            .await
    }

    pub async fn delete_by_id(
        conn: &mut AsyncPgConnection,
        question_id: i64,
    ) -> Result<usize, diesel::result::Error> {
        diesel::delete(questions::table.filter(questions::id.eq(question_id)))
            .execute(conn)
            .await
    }
}
