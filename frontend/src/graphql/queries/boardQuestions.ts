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

export const GAME_BOARD_DATA_QUERY = gql`
  query gameBoardData($gameBoardId: Int!) {
    fetchGameBoardData(gameBoardId: $gameBoardId) {
      categories
      questions {
        boardQuestion {
          boardId
          questionId
          category
          points
          gridRow
          gridCol
        }
        question {
          id
          question
          answer
        }
      }
    }
  }
`;
