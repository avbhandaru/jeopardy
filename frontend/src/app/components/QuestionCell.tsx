import React from "react";
import { BoardQuestionGql, Question } from "@/generated/graphql";
import Grid from "@mui/material/Grid2";

interface QuestionCellProps {
  question: Question | null;
  bq: BoardQuestionGql | null;
  onClick: () => void;
}

const QuestionCell: React.FC<QuestionCellProps> = ({
  question,
  bq,
  onClick,
}) => {
  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={{
        textAlign: "center",
        border: "1px solid #ccc",
        padding: 2,
        backgroundColor: question ? "#2d9b69" : "#de634d",
        cursor: question ? "pointer" : "default",
        "&:hover": {
          backgroundColor: question ? "#2d9b32" : "#ddab4d",
        },
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      {bq ? `$${bq.points}` : `Click to create question`}
    </Grid>
  );
};

export default QuestionCell;
