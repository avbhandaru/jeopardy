import React from "react";
import { QuestionWithBoardInfo } from "@/generated/graphql";
import Grid from "@mui/material/Grid2";

interface QuestionCellProps {
  questionAndInfo: QuestionWithBoardInfo | null;
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
        backgroundColor: questionAndInfo ? "#2d9b69" : "#de634d",
        cursor: questionAndInfo ? "pointer" : "default",
        "&:hover": {
          backgroundColor: questionAndInfo ? "#2d9b32" : "#ddab4d",
        },
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      {questionAndInfo
        ? `$${questionAndInfo.points}`
        : `Click to create question`}
    </Grid>
  );
};

export default QuestionCell;
