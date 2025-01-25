import { gql } from "@apollo/client";

export const BOARD_MAPPING_QUERY = gql`
  query FindGameBoardMapping($gameBoardId: Int!, $questionId: Int!) {
    findGameBoardMapping(gameBoardId: $gameBoardId, questionId: $questionId) {
      boardId
      questionId
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;

export const ALL_BOARD_MAPPINGS_QUERY = gql`
  query FetchGameBoardMappings($gameBoardId: Int!) {
    fetchGameBoardMappings(gameBoardId: $gameBoardId) {
      boardId
      questionId
      dailyDouble
      points
      gridRow
      gridCol
    }
  }
`;
