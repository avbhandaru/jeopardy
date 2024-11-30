import { gql } from "@apollo/client";

const ADD_QUESTION_MUTATION = gql`
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
