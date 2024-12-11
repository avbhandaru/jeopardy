// src/app/components/EditTitleDialog.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useUpdateTitleMutation, GameBoard } from "@/generated/graphql";
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

interface EditTitleDialogProps {
  open: boolean;
  handleClose: () => void;
  gameBoard: GameBoard;
}

const EditTitleDialog: React.FC<EditTitleDialogProps> = ({
  open,
  handleClose,
  gameBoard,
}) => {
  const [newTitle, setNewTitle] = useState<string>(gameBoard.title);

  const [updateTitle, { loading, error, data }] = useUpdateTitleMutation({
    variables: { id: gameBoard.id, newTitle },
    // refetchQueries: [
    //   {
    //     // Figure out the refetchQuery if any
    //     query: GET_BOARD_QUESTIONS_BY_BOARD,
    //     variables: { boardId: gameBoard.id },
    //   },
    // ],
    onCompleted: () => {
      handleClose();
    },
  });

  useEffect(() => {
    if (open) {
      setNewTitle(gameBoard.title);
    }
  }, [open, gameBoard.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle === "") {
      alert("Title cannot be empty.");
      return;
    }

    try {
      await updateTitle();
    } catch (err) {
      console.error("Error updating title:", err);
      // Error is handled by the `error` variable
    }
  };

  const handleCancel = () => {
    setNewTitle(gameBoard.title);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="edit-title-dialog"
      >
        <DialogTitle id="edit-title-dialog">Edit GameBoard Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the title of this GameBoard, please enter the new title
            below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newTitle"
            label="New Title"
            type="text"
            fullWidth
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={loading}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error.message}
            </Typography>
          )}
          {data && (
            <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
              Title updated successfully!
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
            disabled={loading || newTitle.trim() === ""}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTitleDialog;
