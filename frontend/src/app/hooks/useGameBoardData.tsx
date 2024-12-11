// src/app/hooks/useGameBoardData.tsx

import { useState, useMemo } from "react";
import {
  GameBoard,
  BoardQuestion,
  Question,
  QuestionWithBoardInfo,
  useQuestionsWithBoardInfoQuery,
  useCreateBoardQuestionMutation,
  useCreateQuestionMutation,
  useUpdateBoardQuestionMutation,
  useUpdateQuestionMutation,
  useGetGameBoardQuery,
  CreateQuestionInput,
  CreateBoardQuestionInput,
  QuestionsWithBoardInfoDocument,
  UpdateQuestionInput,
  UpdateBoardQuestionInput,
} from "@/generated/graphql";

interface UserGameBoardDataProps {
  gameBoardId: number;
}

export function useGameBoardData({ gameBoardId }: UserGameBoardDataProps) {
  const { loading, error, data } = useQuestionsWithBoardInfoQuery({
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
        questionsWithBoardInfo: [] as QuestionWithBoardInfo[],
        questionsMap: new Map<number, Question>(),
        boardQuestionsMatrix: [] as (BoardQuestion | null)[][],
        displayCategories: [] as string[],
      };
    }
    const questionsWithBoardInfo: QuestionWithBoardInfo[] =
      data.questionsWithBoardInfo;

    const uniqueCategories = Array.from(
      new Set(questionsWithBoardInfo.map((q) => q.category))
    );
    const displayCategories =
      uniqueCategories.length < 5
        ? uniqueCategories.concat(
            Array(5 - uniqueCategories.length).fill("Dummy Category")
          )
        : uniqueCategories;

    // Populate the questions matrix with boardquestions
    const maxRows = 5;
    const gameBoardMatrix: (QuestionWithBoardInfo | null)[][] = Array.from(
      { length: maxRows },
      () => Array(5).fill(null)
    );

    questionsWithBoardInfo.forEach((q) => {
      const { gridRow: row, gridCol: col } = q;
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

  // Mutation handlers - these can be called from the component
  async function createNewQuestionAndBoardQuestion(
    questionInput: CreateQuestionInput,
    boardQuestionInput: CreateBoardQuestionInput
  ) {
    const result = await createQuestion({
      variables: { input: questionInput },
    });
    const newQuestionId = result.data?.createQuestion.id;
    if (!newQuestionId) return;

    await createBoardQuestion({
      variables: {
        input: {
          ...boardQuestionInput,
          questionId: newQuestionId,
          boardId: gameBoardId,
        },
      },
      refetchQueries: [
        {
          query: QuestionsWithBoardInfoDocument,
          variables: { gameBoardId },
        },
      ],
    });
  }

  async function updateExistingQuestion(updateInput: UpdateQuestionInput) {
    await updateQuestion({
      variables: { input: updateInput },
      refetchQueries: [
        { query: QuestionsWithBoardInfoDocument, variables: { gameBoardId } },
      ],
    });
  }

  async function updateExistingBoardQuestion(
    updateBoardQuestionInput: UpdateBoardQuestionInput
  ) {
    await updateBoardQuestion({
      variables: { input: updateBoardQuestionInput },
      refetchQueries: [
        { query: QuestionsWithBoardInfoDocument, variables: { gameBoardId } },
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
    createNewQuestionAndBoardQuestion,
    updateExistingQuestion,
    updateExistingBoardQuestion,
  };
}
