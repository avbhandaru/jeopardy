import { gql } from "@apollo/client";

// Define the GraphQL mutation
export const ADD_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
