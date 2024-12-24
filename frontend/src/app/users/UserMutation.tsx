// src/app/users/UserMutation.tsx
"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
  GetAllUsersDocument,
} from "@/__generated__/graphql";

const UserMutation: React.FC = () => {
  const [username, setUsername] = useState("");
  const [createUser, { loading, error }] = useCreateUserMutation({
    onCompleted: () => {
      setUsername("");
    },
    // Optionally, update the cache or refetch queries here
    refetchQueries: [{ query: GetAllUsersDocument }],
    awaitRefetchQueries: true,
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() == "") return;
    const currentTime = new Date().toISOString();
    try {
      await createUser({
        variables: {
          input: { username },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" display="flex" mb={2} onSubmit={handleAddUser}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
