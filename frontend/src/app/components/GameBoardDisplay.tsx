// src/app/components/GameBoardDisplay.tsx

"use client";
import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import QuestionCell from "./QuestionCell";
import {
  Question,
  BoardQuestion,
  GameBoard,
  BoardQuestionGql,
  CreateQuestionInput,
  CreateBoardQuestionInput,
  UpdateQuestionInput,
  UpdateBoardQuestionInput,
  useBoardQuestionsFromBoardQuery,
  BoardQuestionsFromBoardDocument,
  useCreateQuestionMutation,
  useCreateBoardQuestionMutation,
  useUpdateBoardQuestionMutation,
  useUpdateQuestionMutation,
} from "@/generated/graphql";
import EditTitleDialog from "./EditTitleDialog";
import EditQuestionModal from "./EditQuestionModal";

const GameBoardDisplay = ({
  board_uuid,
  user_uuid,
}: {
  board_uuid: string;
  user_uuid: string;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentBoardQuestion, setCurrentBoardQuestion] = useState<
    Partial<BoardQuestion>
  >({});

  const { loading, error, data } = useBoardQuestionsFromBoardQuery({
    variables: { boardId: parseInt(board_uuid, 10) },
  });

  // Initialize mutation hooks
  const [updateQuestion, { loading: updating, error: updateError }] =
    useUpdateQuestionMutation();
  const [createQuestion, { loading: creating, error: createError }] =
    useCreateQuestionMutation();
  const [createBoardQuestion] = useCreateBoardQuestionMutation();
  const [updateBoardQuestion] = useUpdateBoardQuestionMutation();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) {
    console.log("No gameboards found:", data);
    return <p>No gameboards found.</p>;
  }

  const gameBoard: GameBoard = data.boardQuestionsByBoard[0].board;
  const boardQuestions: BoardQuestionGql[] = data.boardQuestionsByBoard;

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(boardQuestions.map((bq) => bq.category))
  );
  const displayCategories =
    uniqueCategories.length < 5
      ? uniqueCategories.concat(
          Array(5 - uniqueCategories.length).fill("Dummy Category")
        )
      : uniqueCategories;

  // Populate the questions matrix with boardquestions
  const maxRows = 5;
  const boardQuestionsMatrix: (BoardQuestionGql | null)[][] = Array.from(
    { length: maxRows },
    () => Array(5).fill(null)
  );

  // Populate the matrix with BoardQuestions
  boardQuestions.forEach((bq) => {
    const row = bq.gridRow; // 0-based index (0 to 4)
    const col = bq.gridCol; // 0-based index (0 to 4)

    if (col !== -1 && row >= 0 && row < 5) {
      boardQuestionsMatrix[row][col] = bq;
    } else {
      console.warn(
        `Invalid grid position for BoardQuestion ID: ${bq.question.id}`
      );
    }
  });

  // Create a questions map for quick lookup
  const questionsMap = new Map<number, Question>(
    boardQuestions.map((bq) => [bq.question.id, bq.question])
  );

  const handleOpenQuestionModal = (
    question: Question | null,
    boardQuestion: BoardQuestionGql | Partial<BoardQuestion>
  ) => {
    // Convert BoardQuestionGql to regular BoardQuestion
    if ("board" in boardQuestion) {
      const simpleBoardQuestion: Partial<BoardQuestion> = {
        boardId: boardQuestion.board.id,
        questionId: boardQuestion.question.id,
        dailyDouble: boardQuestion.dailyDouble,
        points: boardQuestion.points,
        category: boardQuestion.category,
        gridRow: boardQuestion.gridRow,
        gridCol: boardQuestion.gridCol,
      };
      setCurrentBoardQuestion(simpleBoardQuestion);
    } else {
      // boardQuestion is Partial<BoardQuestion> with gridCol, gridRow
      setCurrentBoardQuestion(boardQuestion);
    }
    setCurrentQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleSaveQuestionModal = async (
    questionInput: Question | CreateQuestionInput,
    boardQuestionInput: Partial<BoardQuestion>
  ) => {
    if (!("id" in questionInput) || !questionInput.id) {
      // input must be CreateQuestionInput, therefore create new question and bq
      const newQuestion: CreateQuestionInput = {
        userId: parseInt(user_uuid, 10), // Assuming user_uuid is stringified i64
        question: questionInput.question || "", // Ensure non-null strings
        answer: questionInput.answer || "",
      };
      try {
        const result = await createQuestion({
          variables: {
            input: newQuestion,
          },
        });

        const newQuestionId = result.data?.createQuestion.id;

        // CREATE NEW BOARDQUESTION
        if (newQuestionId && boardQuestionInput) {
          const newBoardQuestion: CreateBoardQuestionInput = {
            ...(boardQuestionInput as CreateBoardQuestionInput),
            boardId: parseInt(board_uuid, 10),
            questionId: newQuestionId,
          };
          try {
            const resultBq = await createBoardQuestion({
              variables: {
                input: newBoardQuestion,
              },
              refetchQueries: [
                {
                  query: BoardQuestionsFromBoardDocument,
                  variables: { boardId: parseInt(board_uuid, 10) },
                },
              ],
            });
          } catch (err) {
            console.error("Failed to create new board question", err);
          }
        }
      } catch (err) {
        console.error("Failed to create new question:", err);
      }
    } else if ("id" in questionInput && questionInput.id) {
      // questionInput must be Question
      // 1. update question and bq
      // 2. update only question
      // 3. update only bq

      // Find the existing BoardQuestion for this question
      const existingBq = boardQuestions.find(
        (bq) => bq.question.id === questionInput.id
      );
      // Check if board question changed
      if (
        existingBq &&
        boardQuestionInput &&
        ((boardQuestionInput.category !== undefined &&
          boardQuestionInput.category !== existingBq.category) ||
          (boardQuestionInput.dailyDouble !== undefined &&
            boardQuestionInput.dailyDouble !== existingBq.dailyDouble) ||
          (boardQuestionInput.points !== undefined &&
            boardQuestionInput.points !== existingBq.points))
      ) {
        // UPDATE EXISTING BOARDQUESTION
        const updateBoardQuestionInput: UpdateBoardQuestionInput = {
          boardId: parseInt(board_uuid, 10),
          questionId: existingBq.question.id,
          ...boardQuestionInput,
        };
        try {
          updateBoardQuestion({
            variables: { input: updateBoardQuestionInput },
            refetchQueries: [
              {
                query: BoardQuestionsFromBoardDocument,
                variables: { boardId: parseInt(board_uuid, 10) },
              },
            ],
          });
          console.log("Updated boardquestion");
        } catch (err) {
          console.error("Failed to update boardquestion");
        }
      }

      // Find the existing question
      const existingQuestion = questionsMap.get(questionInput.id);
      // Check if question changed
      if (
        existingQuestion &&
        (questionInput.question !== existingQuestion.question ||
          questionInput.answer !== existingQuestion.answer)
      ) {
        //UPDATE EXISTING QUESTION
        const updateInput: UpdateQuestionInput = {
          id: questionInput.id,
          question: questionInput.question,
          answer: questionInput.answer,
        };

        try {
          updateQuestion({
            variables: {
              input: updateInput,
            },
            refetchQueries: [
              {
                query: BoardQuestionsFromBoardDocument,
                variables: { boardId: parseInt(board_uuid, 10) },
              },
            ],
          });
          console.log("Updated Question");
        } catch (err) {
          console.error("Failed to update question:", err);
          // Optionally, display an error message to the user
        }
      }
    }
    handleCloseQuestionModal();
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {gameBoard?.title || "No Title Available"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenEditDialog}
      >
        Edit Title
      </Button>
      <EditTitleDialog
        open={isEditDialogOpen}
        handleClose={handleCloseEditDialog}
        gameBoard={gameBoard}
      />
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Render categories as column headers */}
          {displayCategories.map((category: string, index: number) => (
            <Grid
              key={index}
              size={{ xs: 12 / 5 }}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {category}
            </Grid>
          ))}

          {/* Render questions as rows */}
          {boardQuestionsMatrix.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((bq, colIndex) => {
                const question = bq
                  ? questionsMap.get(bq.question.id) ?? null
                  : null;
                return (
                  <QuestionCell
                    key={`${rowIndex}-${colIndex}`}
                    question={question}
                    bq={bq}
                    onClick={() =>
                      handleOpenQuestionModal(
                        question,
                        bq ?? {
                          dailyDouble: false,
                          category: displayCategories[colIndex],
                          gridCol: colIndex,
                          gridRow: rowIndex,
                          points: 100,
                        }
                      )
                    }
                  />
                );
              })}
            </React.Fragment>
          ))}
          {isQuestionModalOpen && (
            <EditQuestionModal
              open={isQuestionModalOpen}
              user_uuid={parseInt(user_uuid, 10)}
              question={currentQuestion}
              boardQuestion={currentBoardQuestion}
              onClose={handleCloseQuestionModal}
              onSave={handleSaveQuestionModal}
            />
          )}
          {(updating || creating) && <p>Saving changes...</p>}
          {updateError && <p>Error updating question: {updateError.message}</p>}
          {createError && <p>Error creating question: {createError.message}</p>}
        </Grid>
      </Paper>
    </div>
  );
};

export default GameBoardDisplay;
