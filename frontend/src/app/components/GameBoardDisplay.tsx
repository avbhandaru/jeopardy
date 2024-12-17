// src/app/components/GameBoardDisplay.tsx

"use client";
import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import QuestionCell from "./QuestionCell";
import {
  UpdateBoardQuestionInput,
  UpdateQuestionInput,
  CreateQuestionInput,
  CreateBoardQuestionInput,
  DetailedBoardQuestion,
} from "@/generated/graphql";
import EditTitleDialog from "./EditTitleDialog";
import EditQuestionModal from "./EditQuestionModal";
import { useGameBoardData } from "../hooks/useGameBoardData";
import PlaceHolderCell from "./PlaceholderCell";
import CreateQuestionModal from "./CreateQuestionModal";
import EditCategoryDialog from "./EditCategoryDialog";

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
    createNewQuestion,
    createNewBoardQuestion,
    updateExistingQuestion,
    updateExistingBoardQuestion,
  } = useGameBoardData({ gameBoardId: boardId });

  const [currentGridRow, setCurrentGridRow] = useState(0);
  const [currentGridCol, setCurrentGridCol] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] =
    useState(false);
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false);
  const [isEditTitleDialogOpen, setIsEditTitleDialogOpen] = useState(false);
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [currentQuestionWithInfo, setCurrentQuestionWithInfo] =
    useState<DetailedBoardQuestion | null>(null);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!gameBoard) {
    console.log("No gameboards found:");
    return <p>No gameboards found.</p>;
  }

  const handleOpenEditCategoryDialog = (category: string, gridCol: number) => {
    setCurrentCategory(category);
    setCurrentGridCol(gridCol);
    setIsEditCategoryDialogOpen(true);
  };
  const handleCloseEditCategoryDialog = () => {
    setIsEditCategoryDialogOpen(false);
  };

  const handleOpenEditQuestionModal = (
    questionWithInfo: DetailedBoardQuestion
  ) => {
    setCurrentQuestionWithInfo(questionWithInfo);
    setIsEditQuestionModalOpen(true);
  };

  const handleCloseEditQuestionModal = () => {
    setIsEditQuestionModalOpen(false);
    setCurrentQuestionWithInfo(null);
  };

  const handleSaveEditQuestionModal = async (
    updateBoardQuestionInput: UpdateBoardQuestionInput,
    updateQuestionInput: UpdateQuestionInput
  ) => {
    try {
      updateExistingBoardQuestion(updateBoardQuestionInput);
      updateExistingQuestion(updateQuestionInput);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    handleCloseEditQuestionModal();
  };

  const handleOpenEditTitleDialog = () => {
    setIsEditTitleDialogOpen(true);
  };

  const handleCloseEditTitleDialog = () => {
    setIsEditTitleDialogOpen(false);
  };

  const handleOpenCreateQuestionModal = (
    category: string,
    gridRow: number,
    gridCol: number
  ) => {
    setCurrentGridRow(gridRow);
    setCurrentGridCol(gridCol);
    setCurrentCategory(category);
    setIsCreateQuestionModalOpen(true);
  };

  const handleCloseCreateQuestionModal = () => {
    setIsCreateQuestionModalOpen(false);
    setCurrentGridRow(0);
    setCurrentGridCol(0);
    setCurrentCategory("");
  };

  const handleSaveCreateQuestionModal = async (
    question: string,
    answer: string,
    dailyDouble: boolean,
    points: number
  ) => {
    try {
      const questionInput: CreateQuestionInput = {
        question,
        answer,
        userId,
      };

      const result = await createNewQuestion(questionInput);

      if (!result.data?.createQuestion?.id) {
        throw new Error("Failed to create a new question");
      }

      const newQuestionId = result.data.createQuestion.id;

      const boardQuestionInput: CreateBoardQuestionInput = {
        boardId,
        questionId: newQuestionId,
        category: currentCategory,
        dailyDouble,
        points,
        gridRow: currentGridRow,
        gridCol: currentGridCol,
      };

      await createNewBoardQuestion(boardQuestionInput);
    } catch (error) {
      console.error("Error creating question or board question:", error);
      throw error;
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {gameBoard?.title || "No Title Available"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenEditTitleDialog}
      >
        Edit Title
      </Button>
      <EditTitleDialog
        open={isEditTitleDialogOpen}
        handleClose={handleCloseEditTitleDialog}
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
              {index}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenEditCategoryDialog(category, index)}
              >
                Edit Category
              </Button>
              <EditCategoryDialog
                open={isEditCategoryDialogOpen}
                handleClose={handleCloseEditCategoryDialog}
                category={currentCategory}
                gridCol={currentGridCol}
                gameBoardId={gameBoard.id}
              />
            </Grid>
          ))}

          {/* Render questions as rows */}
          {gameBoardMatrix?.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((questionAndInfo, colIndex) => {
                return questionAndInfo ? (
                  <QuestionCell
                    key={`${rowIndex}-${colIndex}`}
                    questionAndInfo={questionAndInfo}
                    onClick={() => handleOpenEditQuestionModal(questionAndInfo)}
                  />
                ) : (
                  <PlaceHolderCell
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() =>
                      handleOpenCreateQuestionModal(
                        displayCategories[colIndex],
                        rowIndex,
                        colIndex
                      )
                    }
                  />
                );
              })}
            </React.Fragment>
          ))}
          {isEditQuestionModalOpen && currentQuestionWithInfo && (
            <EditQuestionModal
              open={isEditQuestionModalOpen}
              boardId={boardId}
              questionWithInfo={currentQuestionWithInfo}
              onClose={handleCloseEditQuestionModal}
              onSave={handleSaveEditQuestionModal}
            />
          )}
          {isCreateQuestionModalOpen && (
            <CreateQuestionModal
              open={isCreateQuestionModalOpen}
              onClose={handleCloseCreateQuestionModal}
              onSave={handleSaveCreateQuestionModal}
            />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default GameBoardDisplay;
