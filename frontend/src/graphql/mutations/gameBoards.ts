import { gql } from "@apollo/client";

export const ADD_GAMEBOARD_MUTATION = gql`
  mutation CreateGameBoard($input: CreateGameBoardInput!) {
    createGameBoard(input: $input) {
      id
      createdAt
      updatedAt
      userId
      title
    }
  }
`;

export const UPDATE_GAMEBOARD_TITLE = gql`
  mutation UpdateTitle($id: Int!, $newTitle: String!) {
    updateTitle(id: $id, newTitle: $newTitle) {
      id
      createdAt
      updatedAt
      userId
      title
    }
  }
`;
