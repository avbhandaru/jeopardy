import React from "react";
import { DetailedBoardQuestion } from "@/__generated__/types";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

interface EditBoardCellProps {
  questionAndInfo: DetailedBoardQuestion;
  onClick: () => void;
}

const QuestionCell: React.FC<EditBoardCellProps> = ({
  questionAndInfo,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
      onClick={onClick}
    >
      {isHovered
        ? questionAndInfo.question.answer
        : questionAndInfo.question.question}
    </Grid>
  );
};

export default QuestionCell;
