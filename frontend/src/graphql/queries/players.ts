// src/graphql/queries/players.ts

import { gql } from "@apollo/client";

export const PLAYER_QUERY = gql`
  query FindPlayer($playerId: Int!) {
    findPlayer(playerId: $playerId) {
      id
      createdAt
      updatedAt
      playerName
      gameId
      score
    }
  }
`;

export const FETCH_PLAYERS_QUERY = gql`
  query FetchPlayersFromGame($gameId: Int!) {
    fetchPlayersFromGame(gameId: $gameId) {
      id
      createdAt
      updatedAt
      playerName
      gameId
      score
    }
  }
`;
