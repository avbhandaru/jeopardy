// graphql/mutatons/question.rs

use crate::db::pool::DBPool;
use crate::models::question::{NewQuestion, Question};
use async_graphql::{Context, InputObject, Object, Result};
use chrono::{DateTime, Utc};
use deadpool_diesel::Pool;
use diesel_async::{pooled_connection::AsyncDieselConnectionManager, AsyncPgConnection};

#[derive(InputObject)]
pub struct CreateQuestionInput {
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: i64,
    pub question_text: String,
    pub answer: String,
}

#[derive(Default)]
pub struct QuestionMutation;

#[Object]
impl QuestionMutation {
    async fn create_question(
        &self,
        ctx: &Context<'_>,
        input: CreateQuestionInput,
    ) -> Result<Question> {
        let pool: &Pool<AsyncDieselConnectionManager<AsyncPgConnection>> =
            ctx.data::<DBPool>().expect("Cant get DBPool from context");
        let mut conn = pool.get().await?;
        let new_question: NewQuestion = NewQuestion {
            created_at: input.created_at,
            updated_at: input.updated_at,
            user_id: input.user_id,
            question_text: input.question_text,
            answer: input.answer,
        };
        let question: Question = Question::create(&mut conn, new_question).await?;
        Ok(question)
    }
}
