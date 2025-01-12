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
  query GetGameBoardsFromUser($userId: Int!) {
    getGameBoardsFromUser(userId: $userId) {
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
