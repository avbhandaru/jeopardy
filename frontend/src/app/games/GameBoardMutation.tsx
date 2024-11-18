// src/app/games/GameBoardMutation.tsx

"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { TextField, Button, Box, Typography } from "@mui/material";
import { ALL_GAMEBOARDS_QUERY } from "@/graphql/queries/gameBoards";
import { ADD_GAMEBOARD_MUTATION } from "@/graphql/mutations/gameBoards";

// Define the GameBoard type
interface GameBoard {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  boardName: string;
  grid: JSON;
}

const GameBoardMutation = () => {
  const [boardName, setBoardName] = useState("");
  const [addBoardGame, { loading, error }] = useMutation<
    { createBoardGame: GameBoard },
    {
      input: {
        boardName: string;
        userId: number;
        createdAt: string;
        updatedAt: string;
        grid: {};
      };
    }
  >(ADD_GAMEBOARD_MUTATION, {
    onCompleted: () => {
      setBoardName("");
    },
    refetchQueries: [{ query: ALL_GAMEBOARDS_QUERY }],
  });

  const handleAddBoardGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (boardName.trim() == "") return;
    const currentTime = new Date().toISOString();
    try {
      await addBoardGame({
        variables: {
          input: {
            boardName,
            userId: 1,
            createdAt: currentTime,
            updatedAt: currentTime,
            grid: {},
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display="flex" mb={2}>
      <TextField
        label="Boardname"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        variant="outlined"
        size="small"
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddBoardGame}
        sx={{ ml: 2 }}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add BoardGame"}
      </Button>
      {error && (
        <Typography color="error" variant="body2" sx={{ ml: 2 }}>
          Error: {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default GameBoardMutation;
