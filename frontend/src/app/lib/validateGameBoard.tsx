// src/app/lib/validateGameBoard.tsx

import { DetailedBoardQuestion, GameBoard } from "@/__generated__/types";

export const validateGameBoard = (
  gameBoard: GameBoard,
  gameBoardMatrix: (DetailedBoardQuestion | null)[][]
): boolean => {
  if (!gameBoard.title) return false;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      // Check that all questions have been filled in
      if (!gameBoardMatrix[row][col]) return false;
      // Check that all questions have been assigned a category
      if (!gameBoardMatrix[row][col]!.boardQuestion.category) return false;
      // Check that all questions have been assigned a point value
      if (!gameBoardMatrix[row][col]!.boardQuestion.points) return false;
      // Check that all questions have been assigned a grid row and column
      // Check that all questions have been assigned a daily double status
    }
  }

  return true;
};
