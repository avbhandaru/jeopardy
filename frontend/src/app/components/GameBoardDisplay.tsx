// src/app/components/GameBoardDisplay.tsx

"use client";
import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import QuestionCell from "./QuestionCell";
import {
  Question,
  GameBoard,
  BoardQuestionGql,
  useBoardQuestionsFromBoardQuery,
} from "@/generated/graphql";
import EditTitleDialog from "./EditTitleDialog";
import EditQuestionModal from "./EditQuestionModal";

const GameBoardDisplay = ({ board_uuid }: { board_uuid: string }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const { loading, error, data } = useBoardQuestionsFromBoardQuery({
    variables: { boardId: parseInt(board_uuid, 10) },
  });

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
  const questionsMatrix: (BoardQuestionGql | null)[][] = Array.from(
    { length: maxRows },
    () => Array(5).fill(null)
  );

  // Populate the matrix with BoardQuestions
  boardQuestions.forEach((bq) => {
    const row = bq.gridRow; // 0-based index (0 to 4)
    const col = bq.gridCol; // 0-based index (0 to 4)

    if (col !== -1 && row >= 0 && row < 5) {
      questionsMatrix[row][col] = bq;
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

  const handleOpenQuestionModal = (question: Question) => {
    setCurrentQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleSaveQuestionModal = (updatedQuestion: Question) => {
    // Update the question in your state or send to backend
    // Example:
    // setQuestions(prev => prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    console.log("Updating Question");
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
          {questionsMatrix.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((bq, colIndex) => {
                const question = bq
                  ? questionsMap.get(bq.question.id) ?? null
                  : null;
                return (
                  <QuestionCell
                    key={`${rowIndex}-${colIndex}`}
                    question={question}
                    points={bq?.points || 0}
                    dailyDouble={bq?.dailyDouble || false}
                    onClick={() => {
                      if (question) {
                        // handleOpen(question.question, question.answer);
                        handleOpenQuestionModal(question);
                      }
                    }}
                  />
                );
              })}
            </React.Fragment>
          ))}
          {isQuestionModalOpen && currentQuestion && (
            <EditQuestionModal
              open={isQuestionModalOpen}
              question={currentQuestion}
              onClose={handleCloseQuestionModal}
              onSave={handleSaveQuestionModal}
            />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default GameBoardDisplay;
