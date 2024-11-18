import { gql } from "@apollo/client";

export const ADD_GAMEBOARD_MUTATION = gql`
  mutation CreateGameBoard($input: CreateGameBoardInput!) {
    createGameBoard(input: $input) {
      id
      createdAt
      updatedAt
      userId
      boardName
      grid
    }
  }
`;
