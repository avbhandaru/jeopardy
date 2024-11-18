import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
