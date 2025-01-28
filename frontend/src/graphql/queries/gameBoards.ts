import { gql } from "@apollo/client";

export const ALL_GAMEBOARDS_QUERY = gql`
  query fetchAllGameBoards {
    fetchAllGameBoards {
      id
      createdAt
      updatedAt
      userId
      title
      categories
    }
  }
`;

export const USER_GAMEBOARDS_QUERY = gql`
  query FetchGameBoardsFromUser($userId: Int!) {
    fetchGameBoardsFromUser(userId: $userId) {
      id
      createdAt
      updatedAt
      userId
      title
      categories
    }
  }
`;

export const GAMEBOARD_QUERY = gql`
  query FindGameBoard($gameBoardId: Int!) {
    findGameBoard(gameBoardId: $gameBoardId) {
      id
      createdAt
      updatedAt
      userId
      title
      categories
    }
  }
`;
