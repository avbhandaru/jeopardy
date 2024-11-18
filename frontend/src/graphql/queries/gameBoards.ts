import { gql } from "@apollo/client";

export const ALL_GAMEBOARDS_QUERY = gql`
  query {
    allGameBoards {
      id
      createdAt
      updatedAt
      userId
      boardName
    }
  }
`;
