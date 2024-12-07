// src/app/games/GameBoardMutation.tsx

"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {
  useCreateGameBoardMutation,
  GetAllGameBoardsDocument,
} from "@/generated/graphql";

const GameBoardMutation: React.FC = () => {
  const [title, setTitle] = useState("");
  const [createBoardGame, { loading, error }] = useCreateGameBoardMutation({
    onCompleted: () => {
      setTitle("");
    },
    refetchQueries: [{ query: GetAllGameBoardsDocument }],
  });

  const handleAddBoardGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() == "") return;
    try {
      await createBoardGame({
        variables: {
          input: {
            title,
            userId: 1,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" display={"flex"} mb={2} onSubmit={handleAddBoardGame}>
      <TextField
        label="Board Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        size="small"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
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
