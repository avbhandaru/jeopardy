import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  FindGameBoardDocument,
  useUpdateGameBoardCategoryMutation,
} from "@/__generated__/graphql";

interface CategoryProps {
  category: string;
  categoryIndex: number;
  gameBoardId: number;
  onUpdateCategory: (newCategory: string, index: number) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  categoryIndex,
  gameBoardId,
  onUpdateCategory,
}) => {
  const [newCategory, setNewCategory] = useState(category);
  const [isEditing, setIsEditing] = useState(false);
  const [updateCategory, { loading, error, data }] =
    useUpdateGameBoardCategoryMutation();

  // Update newCategory state when the category prop changes
  useEffect(() => {
    setNewCategory(category);
  }, [category]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrEnter = async () => {
    try {
      console.log("Handle blur or enter, about to update category");
      console.log(newCategory);
      await updateCategory({
        variables: { gameBoardId, index: categoryIndex, category: newCategory },
        refetchQueries: [
          {
            query: FindGameBoardDocument,
            variables: { gameBoardId },
          },
        ],
      });
      onUpdateCategory(newCategory, categoryIndex);
    } catch (e) {
      console.error("Error updating category:", e);
    }
    setIsEditing(false);
  };

  const handleEscape = () => {
    setNewCategory(category); // Reset the category to its original value
    setIsEditing(false); // Exit editing mode
  };

  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={(theme) => ({
        display: "flex",
        height: "16.67%",
        alignItems: "center",
        textAlign: "center",
        border: `2px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
        justifyContent: "center",
      })}
    >
      {isEditing ? (
        <TextField
          value={newCategory}
          // Apply custom styles to match "h4" typography
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "2.125rem", // Typically h4 font size
              fontWeight: 400, // Adjust as needed
              lineHeight: 1.235,
              letterSpacing: "0.00735em",
            },
            // Optional: Adjust the label if using one
            "& .MuiInputLabel-root": {
              fontSize: "2.125rem",
            },
          }}
          onChange={(e) => setNewCategory(e.target.value)}
          onBlur={handleBlurOrEnter}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlurOrEnter();
            } else if (e.key === "Escape") {
              handleEscape(); // Cancel the edit on Escape
            }
          }}
          autoFocus
          size="medium"
        />
      ) : (
        <Typography
          variant="h4"
          onClick={handleTextClick}
          style={{ cursor: "pointer" }}
        >
          {newCategory}
        </Typography>
      )}
    </Grid>
  );
};

export default Category;
