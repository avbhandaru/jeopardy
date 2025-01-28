import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      createdAt
      updatedAt
      userId
      question
      answer
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
      question
      answer
      createdAt
      updatedAt
      userId
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: Int!) {
    deleteQuestion(questionId: $questionId)
  }
`;
