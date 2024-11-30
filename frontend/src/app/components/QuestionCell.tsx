import React from "react";
import { Question } from "@/generated/graphql";
import Grid from "@mui/material/Grid2";

interface QuestionCellProps {
  question: Question | null;
  points: number;
  dailyDouble: boolean;
  onClick: () => void;
}

const QuestionCell: React.FC<QuestionCellProps> = ({
  question,
  points,
  dailyDouble,
  onClick,
}) => {
  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={{
        textAlign: "center",
        border: "1px solid #ccc",
        padding: 2,
        backgroundColor: question ? "#de634d" : "#ffffff",
        cursor: question ? "pointer" : "default",
        "&:hover": {
          backgroundColor: question ? "#e0e0e0" : "#ffffff",
        },
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      {question ? `$${points}` : `-`}
    </Grid>
  );
};

export default QuestionCell;
