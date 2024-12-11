import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query getAllUsers{
    allUsers {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
