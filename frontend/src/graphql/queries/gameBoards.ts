import { gql } from "@apollo/client";

export const ALL_GAMEBOARDS_QUERY = gql`
  query getAllGameBoards {
    allGameBoards {
      id
      createdAt
      updatedAt
      userId
      boardName
      grid
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
      boardName
      grid
    }
  }
`;

export const GAMEBOARD_QUERY = gql`
  query GetGameBoard($id: Int!) {
    getGameBoard(id: $id) {
      id
      createdAt
      updatedAt
      userId
      boardName
      grid {
        categories
        questions
      }
    }
  }
`;
