import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DetailedBoardQuestion } from "@/__generated__/types";

interface DisplayQuestionModalProps {
  open: boolean;
  questionAndInfo: DetailedBoardQuestion;
  onClose: () => void;
}

const DisplayQuestionModal: React.FC<DisplayQuestionModalProps> = ({
  open,
  questionAndInfo,
  onClose,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{ style: { borderRadius: 20, maxHeight: "80%" } }}
      >
        <DialogTitle>
          Category: {questionAndInfo.boardQuestion.category}
        </DialogTitle>
        <DialogContent sx={{ padding: 4 }}>
          <DialogContentText sx={{ fontSize: 75 }}>
            Question: {questionAndInfo.question.question}
          </DialogContentText>
          <DialogContentText sx={{ fontSize: 30 }}>
            Answer: {questionAndInfo.question.answer}
          </DialogContentText>
          <DialogContentText sx={{ fontSize: 30 }}>
            Points: {questionAndInfo.boardQuestion.points}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DisplayQuestionModal;
