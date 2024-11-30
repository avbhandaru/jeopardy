// src/app/components/EditQuestionModal.tsx

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Question } from "@/generated/graphql";
import React, { useState, useEffect } from "react";

interface EditQuestionModalProps {
  open: boolean;
  question: Question;
  onClose: () => void;
  onSave: (updatedQuestion: Question) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  question,
  onClose,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(question.question);
  const [editedAnswer, setEditedAnswer] = useState(question.answer);

  // Update state when the question prop changes
  useEffect(() => {
    if (question) {
      setEditedQuestion(question.question);
      setEditedAnswer(question.answer);
    }
  }, [question]);

  const handleSave = () => {
    const updatedQuestion: Question = {
      ...question,
      question: editedQuestion,
      answer: editedAnswer,
    };
    onSave(updatedQuestion);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Question"
          fullWidth
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Answer"
          fullWidth
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionModal;
