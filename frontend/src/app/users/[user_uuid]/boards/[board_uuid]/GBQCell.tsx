// src/app/users/[user_uuid]/boards/[board_uuid]/GBQCell.tsx

import React from "react";
import { GameBoardQuestion } from "@/__generated__/types";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import EditQuestionModal from "./EditQuestionModal";
import { Box, Typography } from "@mui/material";

interface GBQCellProps {
  gameBoardQuestion: GameBoardQuestion;
}

// TODO - Implement drag and drop, as well as swap
const GBQCell: React.FC<GBQCellProps> = ({ gameBoardQuestion }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={(theme) => ({
        height: "16.67%", // Fixed height of cell
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.success.main,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.palette.success.dark,
        },
        transition: "background-color 0.3s ease",
        flexDirection: "column",
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOpen}
    >
      <Box component={Typography} variant="h6" sx={{ margin: "auto" }}>
        {isHovered
          ? gameBoardQuestion.question.answer
          : gameBoardQuestion.question.question}
      </Box>
      <Box component={Typography} sx={{ margin: "auto" }}>
        {gameBoardQuestion.mapping.points}
      </Box>
      <EditQuestionModal
        open={open}
        gameBoardQuestion={gameBoardQuestion}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default GBQCell;
