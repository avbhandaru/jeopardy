// src/app/components/EditCategoryDialog.tsx

"use client";

import { useUpdateColumnCategoryMutation } from "@/generated/graphql";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

interface EditCategoryDialogProps {
  open: boolean;
  handleClose: () => void;
  category: string;
  gridCol: number;
  gameBoardId: number;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  open,
  handleClose,
  category,
  gridCol,
  gameBoardId,
}) => {
  const [newCategory, setNewCategory] = useState(category);

  const [updateCategory, { loading, error, data }] =
    useUpdateColumnCategoryMutation({
      variables: { gameBoardId, gridCol, newCategory },
      onCompleted: () => {
        handleClose();
      },
    });

  useEffect(() => {
    if (open) {
      setNewCategory(category);
    }
  }, [open, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory === "") {
      alert("Category cannot be empty");
      return;
    }

    try {
      console.log(gameBoardId);
      console.log(gridCol);
      console.log(newCategory);
      await updateCategory();
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  const handleCancel = () => {
    setNewCategory(category);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="edit-category-dialog"
      >
        <DialogTitle id="edit-category-dialog">Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the category of column {gridCol}, please enter the new
            category below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newCategory"
            label="New Category"
            type="text"
            fullWidth
            variant="standard"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            disabled={loading}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error.message}
            </Typography>
          )}
          {data && (
            <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
              Category updated successfully!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loading || newCategory === ""}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategoryDialog;
