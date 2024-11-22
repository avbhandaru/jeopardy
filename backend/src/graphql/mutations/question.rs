// graphql/mutatons/question.rs

use crate::db::pool::DBPool;
use crate::models::question::{NewQuestion, Question};
use async_graphql::{Context, InputObject, Object, Result};

#[derive(InputObject)]
pub struct CreateQuestionInput {
    pub user_id: i64,
    pub question: String,
    pub answer: String,
}

#[derive(Default)]
pub struct QuestionMutation;

#[Object]
impl QuestionMutation {
    /// Create a new quesiton
    async fn create_question(
        &self,
        ctx: &Context<'_>,
        input: CreateQuestionInput,
    ) -> Result<Question> {
        let pool = ctx.data::<DBPool>().expect("Cant get DBPool from context");
        let mut conn = pool.get().await.expect("Failed to get connection");
        let new_question: NewQuestion = NewQuestion {
            user_id: input.user_id,
            question: input.question,
            answer: input.answer,
        };
        let question: Question = Question::create(&mut conn, new_question).await?;
        Ok(question)
    }
}
