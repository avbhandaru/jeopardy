// src/app/hooks/useGameBoardData.tsx

import { useState, useEffect } from "react";
import {
  GameBoard,
  BoardQuestion,
  Question,
  DetailedBoardQuestion,
  useGameBoardDataQuery,
  useCreateBoardQuestionMutation,
  useCreateQuestionMutation,
  useUpdateBoardQuestionMutation,
  useUpdateQuestionMutation,
  useGetGameBoardQuery,
  CreateQuestionInput,
  CreateBoardQuestionInput,
  UpdateQuestionInput,
  UpdateBoardQuestionInput,
  GameBoardDataDocument,
} from "@/__generated__/graphql";

interface UserGameBoardDataProps {
  gameBoardId: number;
}

export function useGameBoardData({ gameBoardId }: UserGameBoardDataProps) {
  const {
    loading,
    error,
    data,
    refetch: refetchGameBoardData,
  } = useGameBoardDataQuery({
    variables: { gameBoardId },
  });
  const {
    loading: loadingGameBoard,
    error: errorGameBoard,
    data: dataGameBoard,
  } = useGetGameBoardQuery({
    variables: { gameBoardId },
  });

  const [createQuestion] = useCreateQuestionMutation();
  const [createBoardQuestion] = useCreateBoardQuestionMutation();
  const [updateBoardQuestion] = useUpdateBoardQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();

  const [gameBoardMatrix, setGameBoardMatrix] = useState<
    (DetailedBoardQuestion | null)[][]
  >([]);
  const [displayCategories, setDisplayCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const questionsWithBoardInfo = data.fetchGameBoardData
        .questions as DetailedBoardQuestion[];
      const categories = data.fetchGameBoardData.categories;

      const displayCategories =
        categories.length < 5
          ? categories.concat(
              Array(5 - categories.length).fill("Dummy Category")
            )
          : categories;

      const gameBoardMatrix: (DetailedBoardQuestion | null)[][] = Array.from(
        { length: 5 },
        () => Array(5).fill(null)
      );

      questionsWithBoardInfo.forEach((q) => {
        const { gridRow: row, gridCol: col } = q.boardQuestion;
        if (col !== -1 && row >= 0 && row < 5) {
          gameBoardMatrix[row][col] = q;
        }
      });

      setGameBoardMatrix(gameBoardMatrix);
      setDisplayCategories(displayCategories);
    }
  }, [data]);

  async function createNewQuestion(questionInput: CreateQuestionInput) {
    const result = await createQuestion({
      variables: { input: questionInput },
    });
    return result;
  }

  async function createNewBoardQuestion(
    boardQuestionInput: CreateBoardQuestionInput
  ) {
    await createBoardQuestion({
      variables: { input: boardQuestionInput },
    });
  }

  async function updateExistingQuestion(updateInput: UpdateQuestionInput) {
    await updateQuestion({
      variables: { input: updateInput },
    });
  }

  async function updateExistingBoardQuestion(
    updateBoardQuestionInput: UpdateBoardQuestionInput
  ) {
    await updateBoardQuestion({
      variables: { input: updateBoardQuestionInput },
    });
  }

  return {
    loading: loading || loadingGameBoard,
    error: error || errorGameBoard,
    gameBoardMatrix,
    displayCategories,
    gameBoard: dataGameBoard?.getGameBoard,
    createNewQuestion,
    createNewBoardQuestion,
    updateExistingQuestion,
    updateExistingBoardQuestion,
    refetchGameBoardData,
  };
}
