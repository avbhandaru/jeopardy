import { gql } from "@apollo/client";

export const ALL_GAMEBOARDS_QUERY = gql`
  query getAllGameBoards {
    allGameBoards {
      id
      createdAt
      updatedAt
      userId
      boardName
      grid
    }
  }
`;
