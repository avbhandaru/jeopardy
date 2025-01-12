// src/graphql/mutations/games.ts

import { gql } from "@apollo/client";

export const CREATE_GAME_MUTATION = gql`
  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      id
      createdAt
      updatedAt
      gameBoardId
      userId
    }
  }
`;
