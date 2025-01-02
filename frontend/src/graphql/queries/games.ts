// src/graphql/queries/games.ts

import { gql } from "@apollo/client";

export const GAME_QUERY = gql`
  query GetGame($gameId: Int!) {
    getGame(gameId: $gameId) {
      id
      createdAt
      updatedAt
      gameBoardId
      userId
    }
  }
`;
