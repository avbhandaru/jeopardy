import { gql } from "@apollo/client";

export const ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    allQuestions {
      id
      createdAt
      updatedAt
      userId
      questionText
      answer
    }
  }
`;

export const GET_QUESTIONS_FROM_IDS = gql`
  query getQuestionsFromIds($ids: [Int!]!) {
    getQuestionsFromIds(ids: $ids) {
      id
      createdAt
      updatedAt
      userId
      questionText
      answer
    }
  }
`;
