import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query fetchAllUsers {
    fetchAllUsers {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export const FIND_USER_QUERY = gql`
  query findUser($userId: Int!) {
    findUser(userId: $userId) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
