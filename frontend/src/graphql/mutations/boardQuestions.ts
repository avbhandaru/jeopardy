import { gql } from "@apollo/client";

export const ADD_BOARD_QUESTION = gql`
  mutation createBoardQuestion($input: CreateBoardQuestionInput!) {
    associateQuestionWithBoard(input: $input) {
      boardId
      questionId
      category
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;

export const UPDATE_BOARD_QUESTION = gql`
  mutation UpdateBoardQuestion($input: UpdateBoardQuestionInput!) {
    updateBoardQuestion(input: $input) {
      boardId
      questionId
      category
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;
