import { gql } from "@apollo/client";

export const ADD_GBQMAPPING = gql`
  mutation CreateMapping($input: CreateGameBoardMappingInput!) {
    createMapping(input: $input) {
      boardId
      questionId
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;

export const UPDATE_GBQMAPPING = gql`
  mutation UpdateMapping($input: UpdateGameBoardMappingInput!) {
    updateMapping(input: $input) {
      boardId
      questionId
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;
