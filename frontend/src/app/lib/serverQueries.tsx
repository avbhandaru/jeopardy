// src/app/lib/serverQueries.tsx

import { gql } from "@apollo/client";
import client from "./apolloClient";

export const GET_GAMEBOARD_QUERY = gql`
  query GetGameBoard($gameBoardId: Int!) {
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

export async function fetchGameBoard(gameBoardId: number) {
  const { data } = await client.query({
    query: GET_GAMEBOARD_QUERY,
    variables: { gameBoardId },
    fetchPolicy: "network-only", // Ensure no cache is used
  });

  if (!data?.findGameBoard) {
    throw new Error(`GameBoard with ID ${gameBoardId} not found`);
  }

  return data.findGameBoard;
}
