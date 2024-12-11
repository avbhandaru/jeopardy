import { gql } from "@apollo/client";

export const ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    allQuestions {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;

export const GET_QUESTIONS_FROM_IDS = gql`
  query getQuestionsFromIds($questionIds: [Int!]!) {
    getQuestionsFromIds(questionIds: $questionIds) {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;

export const GET_QUESTION = gql`
  query question($questionId: Int!) {
    question(questionId: $questionId) {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;
