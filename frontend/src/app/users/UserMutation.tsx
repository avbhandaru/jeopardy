// src/app/users/UserMutation.tsx
"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TextField, Button, Box, Typography } from "@mui/material";
import { ADD_USER_MUTATION } from "@/graphql/mutations/users";
import { ALL_USERS_QUERY } from "@/graphql/queries/users";

// Define the User type
interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

const UserMutation = () => {
  const [username, setUsername] = useState("");
  const [addUser, { loading, error }] = useMutation<
    { createUser: User },
    { input: { username: string; createdAt: string; updatedAt: string } }
  >(ADD_USER_MUTATION, {
    onCompleted: () => {
      setUsername("");
    },
    // Optionally, update the cache or refetch queries here
    refetchQueries: [{ query: ALL_USERS_QUERY }],
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() == "") return;
    const currentTime = new Date().toISOString();
    try {
      await addUser({
        variables: {
          input: { username, createdAt: currentTime, updatedAt: currentTime },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display="flex" mb={2}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        size="small"
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        sx={{ ml: 2 }}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add User"}
      </Button>
      {error && (
        <Typography color="error" variant="body2" sx={{ ml: 2 }}>
          Error: {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default UserMutation;
