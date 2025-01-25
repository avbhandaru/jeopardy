// src/app/components/GameBoardDisplay.tsx

"use client";
import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditBoardCell from "./GBQCell";
import Category from "./Category";
import Title from "./Title";
import {
  UpdateBoardQuestionInput,
  UpdateQuestionInput,
  CreateQuestionInput,
  CreateBoardQuestionInput,
  DetailedBoardQuestion,
} from "@/__generated__/types";
import EditQuestionModal from "./EditQuestionModal";
import { useGameBoardData } from "@/app/hooks/useGameBoardData";
import PlaceHolderCell from "@/app/components/PlaceholderCell";
import CreateQuestionModal from "./EmptyQBQCell";
import { useRouter } from "next/navigation";
import { GameBoard } from "@/__generated__/graphql";

const GameBoardDisplay = ({
  board_uuid,
  user_uuid,
}: {
  board_uuid: string;
  user_uuid: string;
}) => {
  const boardId = parseInt(board_uuid, 10);
  const userId = parseInt(user_uuid, 10);
  const router = useRouter();

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
    refetchGameBoardData,
    createNewGame,
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
      refetchGameBoardData();
      console.log("Successfully edited question. Tried to refetch board data");
    } catch (error) {
      console.error("Error saving data:", error);
    }
    handleCloseEditQuestionModal();
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

      if (points == 100) {
        points = points * (currentGridRow + 1);
      }

      const boardQuestionInput: CreateBoardQuestionInput = {
        boardId,
        questionId: newQuestionId,
        dailyDouble,
        points,
        gridRow: currentGridRow,
        gridCol: currentGridCol,
      };

      await createNewBoardQuestion(boardQuestionInput);
      refetchGameBoardData();
      console.log(
        "Successfully created new question. Tried to refetch board data"
      );
    } catch (error) {
      console.error("Error creating question or board question:", error);
      throw error;
    }
    handleCloseCreateQuestionModal();
  };

  const handleClickNewGame = async (userId: number, gameBoard: GameBoard) => {
    // Validate user can create new game
    const hasPlaceholders = gameBoardMatrix.some((row) =>
      row.some((questionAndInfo) => questionAndInfo === null)
    );

    if (hasPlaceholders) {
      alert("Please complete all questions before creating a new game.");
      return;
    }

    try {
      const newGameResult = await createNewGame(userId, gameBoard);
      const gameUuid = newGameResult?.data?.createGame.id;
      router.push(`/games/${gameUuid}`);
    } catch (error) {
      console.error("Error creating new game:", error);
      alert("An error occured while creating the game");
      throw error;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title
          title={gameBoard?.title || "New Gameboard"}
          gameBoardId={gameBoard.id}
        />
        <Button
          size="large"
          variant="contained"
          color="secondary"
          sx={{ maxHeight: "80%" }}
          onClick={() => handleClickNewGame(userId, gameBoard)}
        >
          New Game
        </Button>
      </div>
      {/* GAMEBOARD */}
      <Paper
        sx={{
          padding: 2,
          width: "100%", // Adjust width
          height: "80vh", // Adjust height
          margin: "auto", // Center on the page
        }}
      >
        <Grid
          container
          sx={{ height: "100%", textAlign: "center", alignItems: "stretch" }}
        >
          {/* COLUMNS */}
          {displayCategories.map((category: string, index: number) => (
            <Category
              key={`$0-${index}`}
              category={category}
              categoryIndex={index}
              gameBoardId={gameBoard.id}
            />
          ))}
          {/* QUESTIONS || PLACEHOLDERS */}
          {gameBoardMatrix?.map((row, rowIndex) =>
            row.map((questionAndInfo, colIndex) => {
              return questionAndInfo ? (
                <EditBoardCell
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
            })
          )}
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
