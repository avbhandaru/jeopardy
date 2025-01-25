import React from "react";
import { GameBoardQuestion } from "@/__generated__/types";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import EditQuestionModal from "./EditQuestionModal";

interface GBQCellProps {
  gameBoardQuestion: GameBoardQuestion;
}

const GBQCell: React.FC<GBQCellProps> = ({ gameBoardQuestion }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={{
        height: "16%", // Fixed height of cell
        overflow: "hidden",
        textOverflow: "ellipsis", // Not working
        textAlign: "center",
        border: "2px solid #ccc",
        padding: 2,
        backgroundColor: "#2d9b69",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#2d9b32",
        },
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOpen}
    >
      {isHovered
        ? gameBoardQuestion.question.answer
        : gameBoardQuestion.question.question}
      <EditQuestionModal
        open={open}
        gameBoardQuestion={gameBoardQuestion}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default GBQCell;
