// src/app/components/NavBar.tsx

"use client";

import React from "react";
import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useAuth } from "../lib/AuthProvider";
import useBackendUser from "@/app/hooks/useBackendUser";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const NavBar = () => {
  const { user } = useAuth();
  const { backendUser, loading } = useBackendUser();

  const myPageUrl = backendUser ? `/users/${backendUser.id}` : "/sign-in";
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink href="/">Jeopardy App</StyledLink>
          </Typography>
          <Button color="inherit">
            <StyledLink href="/admin">Admin</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink href="/users">Users</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink href="/games">GameBoards</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink href="/questions">Questions</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink href={myPageUrl}>My Page</StyledLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
