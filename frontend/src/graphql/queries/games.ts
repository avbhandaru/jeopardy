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

export const PLAYER_GAMES_QUERY = gql`
  query GetGamesFromUser($userId: Int!) {
    getGamesFromUser(userId: $userId) {
      id
      createdAt
      updatedAt
      userId
      gameBoardId
    }
  }
`;
