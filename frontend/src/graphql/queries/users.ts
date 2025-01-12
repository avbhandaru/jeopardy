import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query getAllUsers {
    allUsers {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_QUERY = gql`
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
