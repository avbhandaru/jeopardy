// src/app/hooks/useGameBoardData.tsx

import { useState, useMemo } from "react";
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
} from "@/generated/graphql";

interface UserGameBoardDataProps {
  gameBoardId: number;
}

export function useGameBoardData({ gameBoardId }: UserGameBoardDataProps) {
  const { loading, error, data } = useGameBoardDataQuery({
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

  // Compute derived data once `data` is available
  const {
    gameBoard,
    questionsWithBoardInfo,
    questionsMap,
    gameBoardMatrix,
    displayCategories,
  } = useMemo(() => {
    if (!data || !dataGameBoard) {
      return {
        gameBoard: null as GameBoard | null,
        questionsWithBoardInfo: [] as DetailedBoardQuestion[],
        questionsMap: new Map<number, Question>(),
        boardQuestionsMatrix: [] as (BoardQuestion | null)[][],
        displayCategories: [] as string[],
      };
    }
    const questionsWithBoardInfo = data.fetchGameBoardData
      .questions as DetailedBoardQuestion[];

    const categories = data.fetchGameBoardData.categories;

    const displayCategories =
      categories.length < 5
        ? categories.concat(Array(5 - categories.length).fill("Dummy Category"))
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

    // Create a questions map for quick lookup
    const questionsMap = new Map<number, Question>(
      questionsWithBoardInfo.map((q) => [q.question.id, q.question])
    );

    return {
      gameBoard: dataGameBoard?.getGameBoard,
      questionsWithBoardInfo,
      questionsMap,
      gameBoardMatrix,
      displayCategories,
    };
  }, [data]);

  async function createNewQuestion(questionInput: CreateQuestionInput) {
    const result = await createQuestion({
      variables: { input: questionInput },
      refetchQueries: [
        { query: GameBoardDataDocument, variables: { gameBoardId } },
      ],
    });
    return result;
  }

  async function createNewBoardQuestion(
    boardQuestionInput: CreateBoardQuestionInput
  ) {
    await createBoardQuestion({
      variables: { input: boardQuestionInput },
      refetchQueries: [
        { query: GameBoardDataDocument, variables: { gameBoardId } },
      ],
    });
  }

  async function updateExistingQuestion(updateInput: UpdateQuestionInput) {
    await updateQuestion({
      variables: { input: updateInput },
      refetchQueries: [
        { query: GameBoardDataDocument, variables: { gameBoardId } },
      ],
    });
  }

  async function updateExistingBoardQuestion(
    updateBoardQuestionInput: UpdateBoardQuestionInput
  ) {
    await updateBoardQuestion({
      variables: { input: updateBoardQuestionInput },
      refetchQueries: [
        { query: GameBoardDataDocument, variables: { gameBoardId } },
      ],
    });
  }

  return {
    loading,
    error,
    questionsWithBoardInfo,
    questionsMap,
    gameBoardMatrix,
    displayCategories,
    gameBoard,
    createNewQuestion,
    createNewBoardQuestion,
    updateExistingQuestion,
    updateExistingBoardQuestion,
  };
}
