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
import { useRouter } from "next/navigation";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const NavBar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { backendUser, loading } = useBackendUser();

  const myPageUrl = backendUser ? `/users/${backendUser.id}` : "/sign-in";
  // If a user is signed in, show "My Page", else show "Sign In"
  const linkText = user ? "My Page" : "Sign In";

  const handleLogOut = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
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
            <StyledLink href={myPageUrl}>{linkText}</StyledLink>
          </Button>
          {/* Conditionally render Sign Out if the user is logged in */}
          {user && (
            <Button color="inherit" onClick={handleLogOut}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
