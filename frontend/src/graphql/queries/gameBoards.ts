import { gql } from "@apollo/client";

export const ALL_GAMEBOARDS_QUERY = gql`
  query getAllGameBoards {
    allGameBoards {
      id
      createdAt
      updatedAt
      userId
      title
    }
  }
`;

export const USER_GAMEBOARDS_QUERY = gql`
  query GetGameBoardFromUser($userId: Int!) {
    getGameBoardFromUser(userId: $userId) {
      id
      createdAt
      updatedAt
      userId
      title
    }
  }
`;

export const GAMEBOARD_QUERY = gql`
  query GetGameBoard($gameBoardId: Int!) {
    getGameBoard(gameBoardId: $gameBoardId) {
      id
      createdAt
      updatedAt
      userId
      title
    }
  }
`;

export const QUESTIONS_WITH_INFO_QUERY = gql`
  query QuestionsWithBoardInfo($gameBoardId: Int!) {
    questionsWithBoardInfo(gameBoardId: $gameBoardId) {
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
