import { gql } from "@apollo/client";

export const ADD_QUESTION_MUTATION = gql`
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
