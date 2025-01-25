import { gql } from "@apollo/client";

export const ADD_GAMEBOARD_MUTATION = gql`
  mutation CreateGameBoard($input: CreateGameBoardInput!) {
    createGameBoard(input: $input) {
      id
      createdAt
      updatedAt
      userId
      title
      categories
    }
  }
`;

export const UPDATE_GAME_BOARD_TITLE = gql`
  mutation UpdateGameBoardTitle($boardId: Int!, $title: String!) {
    updateGameBoard(input: { boardId: $boardId, title: $title }) {
      id
      title
      categories
    }
  }
`;

export const UPDATE_GAMEBOARD_CATEGORY = gql`
  mutation UpdateGameBoardCategory(
    $gameBoardId: Int!
    $index: Int!
    $category: String!
  ) {
    updateGameBoardCategory(
      gameBoardId: $gameBoardId
      index: $index
      category: $category
    ) {
      id
      createdAt
      updatedAt
      userId
      title
      categories
    }
  }
`;
