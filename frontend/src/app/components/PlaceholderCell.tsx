import React from "react";
import Grid from "@mui/material/Grid2";

interface PlaceholderCellProps {
  onClick: () => void;
}

const PlaceHolderCell: React.FC<PlaceholderCellProps> = ({ onClick }) => {
  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={{
        textAlign: "center",
        border: "1px solid #ccc",
        padding: 2,
        backgroundColor: "#de634d",
        cursor: "defualt",
        "&:hover": {
          backgroundColor: "#ddab4d",
        },
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      {`Click to create question`}
    </Grid>
  );
};

export default PlaceHolderCell;
