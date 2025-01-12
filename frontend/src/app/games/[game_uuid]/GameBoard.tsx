"use client";

import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Paper, Box } from "@mui/material";
import QueryResult from "@/app/components/query-result";
import {
  useGetGameQuery,
  useGameBoardDataQuery,
} from "@/__generated__/graphql";
import { DetailedBoardQuestion, BoardQuestion } from "@/__generated__/types";
import QuestionCell from "@/app/games/[game_uuid]/QuestionCell";
import { useGameContext } from "./GameContext";
import DisplayQuestionModal from "./DisplayQuestionModal";

interface GameBoardProps {
  // game_uuid: string;
}

// Separate the Board component and question into a new Client Component
const GameBoard: React.FC<GameBoardProps> = () => {
  const {
    game_uuid,
    currentDetailedBoardQuestion,
    setCurrentDetailedBoardQuestion,
  } = useGameContext();
  const gameId = parseInt(game_uuid, 10);
  const {
    data: game_data,
    loading: loading_game,
    error: game_error,
  } = useGetGameQuery({
    variables: { gameId },
  });
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const gameBoardId = game_data?.getGame?.gameBoardId;

  // Fetch gameboard data
  const {
    data: game_board_data,
    loading: loading_game_board,
    error: game_board_error,
  } = useGameBoardDataQuery({
    variables: { gameBoardId: gameBoardId! },
    skip: !gameBoardId,
  });

  // Construct game board matrix
  const gameBoardMatrix: DetailedBoardQuestion[][] = React.useMemo(() => {
    if (!game_board_data?.fetchGameBoardData?.questions) {
      return Array.from({ length: 5 }, () => Array(5).fill(null));
    }

    const questionsWithBoardInfo = game_board_data.fetchGameBoardData.questions;
    const matrix = Array.from({ length: 5 }, () => Array(5).fill(null));

    questionsWithBoardInfo.forEach((q) => {
      const { gridRow: row, gridCol: col } = q.boardQuestion;
      if (col !== -1 && row >= 0 && row < 5) {
        matrix[row][col] = q;
      }
    });

    return matrix;
  }, [game_board_data]);

  const handleClickQuestionCell = (questionAndInfo: DetailedBoardQuestion) => {
    console.log("Clicked question:", questionAndInfo);
    // Set the current question in the context
    setCurrentDetailedBoardQuestion(questionAndInfo);
    setAnsweredQuestions((prev) =>
      new Set(prev).add(questionAndInfo.question.id)
    );
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  return (
    <div>
      {loading_game && <div>Loading game...</div>}
      {game_error && <div>Error loading game</div>}
      {!game_data && <div>No game data</div>}

      {loading_game_board && <div>Loading game board...</div>}
      {game_board_error && <div>Error loading game board</div>}
      {/* Render gameboard */}
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {game_board_data?.fetchGameBoardData?.categories.map(
            (category, index) => (
              <Grid
                key={index}
                size={{ xs: 12 / 5 }}
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {category}
              </Grid>
            )
          )}
          {gameBoardMatrix?.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((questionAndInfo, colIndex) => {
                if (!questionAndInfo) {
                  return (
                    <Box
                      key={`${rowIndex}-${colIndex}`}
                      sx={{ textAlign: "center", padding: 2 }}
                    >
                      <Typography variant="body2">No question</Typography>
                    </Box>
                  );
                }
                return (
                  <QuestionCell
                    key={`${rowIndex}-${colIndex}`}
                    questionAndInfo={questionAndInfo!}
                    isAnswered={answeredQuestions.has(
                      questionAndInfo.question.id
                    )}
                    onClick={() => handleClickQuestionCell(questionAndInfo)}
                  />
                );
              })}
            </React.Fragment>
          ))}
          {isQuestionModalOpen && currentDetailedBoardQuestion && (
            <DisplayQuestionModal
              open={isQuestionModalOpen}
              questionAndInfo={currentDetailedBoardQuestion}
              onClose={handleCloseQuestionModal}
            />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default GameBoard;
