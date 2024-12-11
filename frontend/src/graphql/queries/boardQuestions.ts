import { gql } from "@apollo/client";

export const BOARD_QUESTIONS_QUERY = gql`
  query boardQuestionsFromBoard($gameBoardId: Int!) {
    boardQuestionsByBoard(gameBoardId: $gameBoardId) {
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
