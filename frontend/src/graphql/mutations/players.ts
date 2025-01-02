// src/graphql/mutations/players.ts

import { gql } from "@apollo/client";

export const ADD_PLAYER_MUTATION = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      id
      createdAt
      updatedAt
      gameId
      playerName
    }
  }
`;

export const UPDATE_PLAYER_SCORE = gql`
  mutation UpdatePlayerScore($playerId: Int!, $newScore: Int!) {
    updatePlayerScore(playerId: $playerId, score: $newScore) {
      id
      createdAt
      updatedAt
      gameId
      playerName
      score
    }
  }
`;

export const UPDATE_PLAYER_NAME = gql`
  mutation UpdatePlayerName($playerId: Int!, $newName: String!) {
    updatePlayerName(playerId: $playerId, playerName: $newName) {
      id
      createdAt
      updatedAt
      gameId
      playerName
      score
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation DeletePlayer($playerId: Int!) {
    deletePlayer(playerId: $playerId) {
      id
      createdAt
      updatedAt
      gameId
      playerName
      score
    }
  }
`;
