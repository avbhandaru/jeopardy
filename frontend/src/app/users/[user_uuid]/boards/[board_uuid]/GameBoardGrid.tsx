// src/app/users/[user_uuid]/boards/[board_uuid]/GameBoardGrid.tsx

"use client";
import { useState, useMemo, ReactElement } from "react";
import { useFetchGbQsQuery } from "@/__generated__/graphql";
import { GameBoard, GameBoardQuestion } from "@/__generated__/types";
import Title from "./Title";
import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";
import QueryResult from "@/app/components/query-result";
import NewGameButton from "./NewGameButton";
import Category from "./Category";
import GBQCell from "./GBQCell";
import EmptyGBQCell from "./EmptyQBQCell";

interface GameBoardGridProps {
  gameBoard: GameBoard;
  userId: number;
}

const GameBoardGrid: React.FC<GameBoardGridProps> = ({ gameBoard, userId }) => {
  // Manage categories as local state
  const [categories, setCategories] = useState<string[]>(
    gameBoard.categories as string[]
  );
  // Eventually provide support for bigger gameboards
  const ROW_COUNT = 5;
  const COL_COUNT = 5;

  const { data, loading, error } = useFetchGbQsQuery({
    variables: { gameBoardId: gameBoard.id },
  });

  const gameBoardQuestions = useMemo(() => {
    if (!data?.fetchGameBoardQuestions) return {};
    const map: Record<string, GameBoardQuestion> = {};
    data.fetchGameBoardQuestions.forEach((gbq) => {
      const { gridRow, gridCol } = gbq.mapping;
      const key = `${gridRow},${gridCol}`;
      map[key] = gbq;
    });
    return map;
  }, [data]);

  // Create Array of GBQs or Placeholder Cells
  const cells: ReactElement[] = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      const key = `${row},${col}`;
      const gameBoardQuestion = gameBoardQuestions[key];
      cells.push(
        gameBoardQuestion ? (
          <GBQCell key={key} gameBoardQuestion={gameBoardQuestion} />
        ) : (
          <EmptyGBQCell
            key={key}
            row={row}
            col={col}
            gameBoardId={gameBoard.id}
            userId={userId}
          />
        )
      );
    }
  }

  // Update a specific category after mutation
  const handleUpdateCategory = (newCategory: string, index: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = newCategory;
    setCategories(updatedCategories); // Update local state
  };

  return (
    <Paper
      sx={{
        padding: 2,
        width: "100%",
        height: "80vh",
        margin: "auto",
      }}
    >
      <Title title={gameBoard.title} gameBoardId={gameBoard.id} />
      <NewGameButton userId={userId} gameBoard={gameBoard} gameBoardQuestions={gameBoardQuestions} />
      <Grid
        container
        sx={{ height: "100%", textAlign: "center", alignItems: "stretch" }}
      >
        <QueryResult error={error} loading={loading} data={data}>
          {categories.map((category: string, index: number) => (
            <Category
              key={`$0-${index}`}
              category={category}
              categoryIndex={index}
              gameBoardId={gameBoard.id}
              onUpdateCategory={handleUpdateCategory}
            />
          ))}
          {cells}
        </QueryResult>
      </Grid>
    </Paper>
  );
};

export default GameBoardGrid;
