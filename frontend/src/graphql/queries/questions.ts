import { gql } from "@apollo/client";

export const ALL_QUESTIONS_QUERY = gql`
  query fetchAllQuestions {
    fetchAllQuestions {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;

export const FETCH_QUESTIONS_FROM_IDS = gql`
  query fetchQuestionsFromIds($questionIds: [Int!]!) {
    fetchQuestionsFromIds(questionIds: $questionIds) {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;

export const FIND_QUESTION = gql`
  query findQuestion($questionId: Int!) {
    findQuestion(questionId: $questionId) {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;
