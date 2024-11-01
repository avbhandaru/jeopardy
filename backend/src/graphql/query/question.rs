// graphql/query/question.rs

use crate::db::pool::DBPool;
use crate::models::question::Question;
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct QuestionQuery;

#[Object]
impl QuestionQuery {
    async fn get_question(&self, ctx: &Context<'_>, id: i64) -> Result<Question> {
        let pool = ctx
            .data::<DBPool>()
            .expect("Cannot get DBPool from context");
        let mut conn = pool.get().await?;
        let question: Question = Question::find_by_id(&mut conn, id).await?;
        Ok(question)
    }

    async fn get_question_from_user(
        &self,
        ctx: &Context<'_>,
        user_id: i64,
    ) -> Result<Vec<Question>> {
        let pool = ctx.data::<DBPool>().expect("Cant get DBPool from context");
        let mut conn = pool.get().await?;
        let questions: Vec<Question> = Question::find_by_user(&mut conn, user_id).await?;
        Ok(questions)
    }
}
