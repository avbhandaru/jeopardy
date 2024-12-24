import React from "react";
import { DetailedBoardQuestion } from "@/__generated__/types";
import Grid from "@mui/material/Grid2";

interface QuestionCellProps {
  questionAndInfo: DetailedBoardQuestion;
  onClick: () => void;
}

const QuestionCell: React.FC<QuestionCellProps> = ({
  questionAndInfo,
  onClick,
}) => {
  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={{
        textAlign: "center",
        border: "1px solid #ccc",
        padding: 2,
        backgroundColor: "#2d9b69",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#2d9b32",
        },
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      {`$${questionAndInfo.boardQuestion.points}`}
    </Grid>
  );
};

export default QuestionCell;
