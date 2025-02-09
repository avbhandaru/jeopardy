import { gql } from "@apollo/client";

export const ALL_USERS_QUERY = gql`
  query fetchAllUsers {
    fetchAllUsers {
      id
      firebaseUid
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
      firebaseUid
      username
      createdAt
      updatedAt
    }
  }
`;

export const FIND_USER_BY_FIREBASE_UID_QUERY = gql`
  query findUserByFirebaseUid($firebaseUid: String!) {
    findUserByFirebaseUid(firebaseUid: $firebaseUid) {
      id
      firebaseUid
      username
      createdAt
      updatedAt
    }
  }
`;
