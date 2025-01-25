// src/graphql/queries/games.ts

import { gql } from "@apollo/client";

export const GAME_QUERY = gql`
  query FindGame($gameId: Int!) {
    findGame(gameId: $gameId) {
      id
      createdAt
      updatedAt
      gameBoardId
      userId
    }
  }
`;

export const PLAYER_GAMES_QUERY = gql`
  query FetchGamesFromUser($userId: Int!) {
    fetchGamesFromUser(userId: $userId) {
      id
      createdAt
      updatedAt
      userId
      gameBoardId
    }
  }
`;
