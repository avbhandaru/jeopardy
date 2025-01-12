import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  useUpdateColumnCategoryMutation,
  GameBoardDataDocument,
} from "@/__generated__/graphql";

interface EditCategoryProps {
  category: string;
  gridCol: number;
  gameBoardId: number;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  category,
  gridCol,
  gameBoardId,
}) => {
  const [newCategory, setNewCategory] = useState(category);
  const [isEditing, setIsEditing] = useState(false);
  const [updateCategory, { loading, error, data }] =
    useUpdateColumnCategoryMutation({
      variables: { gameBoardId, gridCol, newCategory },
      refetchQueries: [
        {
          query: GameBoardDataDocument,
          variables: { gameBoardId },
        },
      ],
    });

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrEnter = async () => {
    try {
      console.log(gameBoardId);
      console.log(gridCol);
      console.log(newCategory);
      await updateCategory();
    } catch (e) {
      console.error("Error updating category:", e);
    }
    setIsEditing(false);
  };

  return (
    <Grid size={{ xs: 12 / 5 }} sx={{ height: "8%" }}>
      {isEditing ? (
        <TextField
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onBlur={handleBlurOrEnter}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlurOrEnter();
            }
          }}
          autoFocus
          size="small"
        />
      ) : (
        <Typography
          variant="h6"
          onClick={handleTextClick}
          style={{ cursor: "pointer" }}
        >
          {newCategory}
        </Typography>
      )}
    </Grid>
  );
};

export default EditCategory;
