// src/app/components/GameBoardDisplay.tsx

"use client";
import React from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useGetGameBoardQuery } from "@/generated/graphql";
import { useGetQuestionsFromIdsQuery } from "@/generated/graphql";

const GameBoardDisplay = ({ board_uuid }: { board_uuid: string }) => {
  const { loading, error, data } = useGetGameBoardQuery({
    variables: { id: parseInt(board_uuid, 10) },
  });

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) return <p>No gameboards found.</p>;

  const title = data.getGameBoard.boardName;
  const grid = data.getGameBoard.grid;
  const categories = grid.categories || [];
  const questionsMatrix: number[][] = grid.questions || [];
  const questionIds: number[] =
    questionsMatrix.flat().filter((id): id is number => id !== -1) || [];
  

  // Always call the hook, even with an empty list of IDs
  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useGetQuestionsFromIdsQuery({
    variables: { ids: questionIds.length > 0 ? questionIds : [-1] }, // Pass an invalid ID if empty
  });

  if (questionsLoading) return <p>Loading questions...</p>;
  if (questionsError)
    return <p>Error fetching questions: {questionsError.message}</p>;

  const questionsMap = new Map(
    questionsData?.getQuestionsFromIds.map((q) => [q.id, q]) // Map for quick lookup
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Render categories as column headers */}
          {categories.map((category: string, index: number) => (
            <Grid
              key={index}
              size={{ xs: 12 / categories.length }}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {category}
            </Grid>
          ))}
          {/* Render questions as rows */}
          {questionsMatrix.map((row: number[], rowIndex: number) => (
            <React.Fragment key={rowIndex}>
              {row.map((questionId: number, colIndex: number) => {
                const question = questionsMap.get(questionId);
                return (
                  <Grid
                    key={`${rowIndex}-${colIndex}`}
                    size={{ xs: 12 / categories.length }}
                    sx={{ textAlign: "center" }}
                  >
                    {question
                      ? question.questionText
                      : "No Question" + rowIndex + colIndex}
                  </Grid>
                );
              })}
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default GameBoardDisplay;
