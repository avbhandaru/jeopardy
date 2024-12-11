// src/app/components/GameBoardDisplay.tsx

"use client";
import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import QuestionCell from "./QuestionCell";
import { QuestionWithBoardInfo } from "@/generated/graphql";
import EditTitleDialog from "./EditTitleDialog";
import EditQuestionModal from "./EditQuestionModal";
import { useGameBoardData } from "../hooks/useGameBoardData";
import { SaveAction, SaveActionType } from "../types/SaveAction";

const GameBoardDisplay = ({
  board_uuid,
  user_uuid,
}: {
  board_uuid: string;
  user_uuid: string;
}) => {
  const boardId = parseInt(board_uuid, 10);
  const userId = parseInt(user_uuid, 10);

  const {
    loading,
    error,
    gameBoardMatrix,
    displayCategories,
    gameBoard,
    createNewQuestionAndBoardQuestion,
    updateExistingQuestion,
    updateExistingBoardQuestion,
  } = useGameBoardData({ gameBoardId: boardId });

  const [currentGridRow, setCurrentGridRow] = useState<number>(0);
  const [currentGridCol, setCurrentGridCol] = useState<number>(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentQuestionWithInfo, setCurrentQuestionWithInfo] =
    useState<QuestionWithBoardInfo | null>(null);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!gameBoard) {
    console.log("No gameboards found:");
    return <p>No gameboards found.</p>;
  }

  const handleOpenQuestionModal = (
    questionWithInfo: QuestionWithBoardInfo | null,
    gridRow: number,
    gridCol: number
  ) => {
    setCurrentQuestionWithInfo(questionWithInfo);
    setCurrentGridRow(gridRow);
    setCurrentGridCol(gridCol);
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setCurrentQuestionWithInfo(null);
  };

  const handleSaveQuestionModal = async (action: SaveAction) => {
    try {
      switch (action.type) {
        case SaveActionType.CREATE:
          // Create Question
          createNewQuestionAndBoardQuestion(
            action.questionInput,
            action.boardQuestionInput
          );
          break;
        case SaveActionType.UPDATE_BOARDQUESTION:
          updateExistingBoardQuestion(action.updateBoardQuestionInput);
          break;
        case SaveActionType.UPDATE_QUESTION:
          updateExistingQuestion(action.updateQuestionInput);
          break;
        case SaveActionType.UPDATE_BOTH:
          updateExistingBoardQuestion(action.updateBoardQuestionInput);
          updateExistingQuestion(action.updateQuestionInput);
          break;
        default:
          throw new Error("Unknown SaveAction type.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
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
          {gameBoardMatrix?.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((questionAndInfo, colIndex) => {
                return (
                  <QuestionCell
                    key={`${rowIndex}-${colIndex}`}
                    questionAndInfo={questionAndInfo}
                    onClick={() =>
                      handleOpenQuestionModal(
                        questionAndInfo,
                        rowIndex,
                        colIndex
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
              user_uuid={userId}
              boardId={boardId}
              questionWithInfo={currentQuestionWithInfo}
              gridRow={currentGridRow}
              gridCol={currentGridCol}
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
