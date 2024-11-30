import { gql } from "@apollo/client";

export const BOARD_QUESTIONS_QUERY = gql`
  query boardQuestionsFromBoard($boardId: Int!) {
    boardQuestionsByBoard(boardId: $boardId) {
      board {
        id
        createdAt
        updatedAt
        userId
        title
      }
      question {
        id
        createdAt
        updatedAt
        userId
        question
        answer
      }
      category
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;
