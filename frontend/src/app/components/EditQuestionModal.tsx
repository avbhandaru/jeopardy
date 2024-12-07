// src/app/components/EditQuestionModal.tsx

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Question,
  CreateQuestionInput,
  BoardQuestion,
} from "@/generated/graphql";
import React, { useState, useEffect } from "react";

interface EditQuestionModalProps {
  open: boolean;
  /**
   * Question object from clicked cell, null when creating new question
   */
  question: Question | null;
  /**
   * BoardQuestion object from clicked cell, null when creating new question
   */
  boardQuestion: Partial<BoardQuestion>;
  user_uuid: number;
  onClose: () => void;
  onSave: (
    input: Question | CreateQuestionInput,
    boardQuestionInput: Partial<BoardQuestion>
  ) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  user_uuid,
  question,
  boardQuestion,
  onClose,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(
    question?.question || ""
  );
  const [editedAnswer, setEditedAnswer] = useState(question?.answer || "");
  const [editedBoardQuestion, setEditedBoardQuestion] = useState(boardQuestion);

  // Update state when the question prop changes
  useEffect(() => {
    if (question) {
      setEditedQuestion(question?.question || "");
      setEditedAnswer(question?.answer || "");
    }
    if (boardQuestion) {
      setEditedBoardQuestion(boardQuestion);
    }
  }, [question, boardQuestion]);

  const handleDailyDoubleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedBoardQuestion((prev) => ({
      ...prev,
      dailyDouble: event.target.checked,
    }));
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    setEditedBoardQuestion((prev) => ({
      ...prev,
      points: isNaN(val) ? 100 : val,
    }));
  };

  const handleSave = () => {
    // Validate input
    if (
      !editedQuestion ||
      !editedAnswer ||
      editedQuestion.trim() === "" ||
      editedAnswer.trim() === ""
    ) {
      alert("Question or Answer can't be empty dude");
      return;
    }

    if (question) {
      // if editing, send a Question object
      const updatedQuestion: Question = {
        ...question,
        question: editedQuestion,
        answer: editedAnswer,
      };
      onSave(updatedQuestion, editedBoardQuestion);
    } else {
      // if creating, send a CreateQuestionInput object
      const newQuestionInput: CreateQuestionInput = {
        userId: user_uuid,
        question: editedQuestion,
        answer: editedAnswer,
      };
      onSave(newQuestionInput, editedBoardQuestion);
    }
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
          required
        />
        <TextField
          margin="dense"
          label="Answer"
          fullWidth
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
          required
        />
        {/* Fields for boardQuestion data */}
        <FormControlLabel
          control={
            <Checkbox
              checked={!!editedBoardQuestion.dailyDouble}
              onChange={handleDailyDoubleChange}
              color="primary"
            />
          }
          label="Daily Double"
          sx={{ marginTop: 2 }}
        />

        <TextField
          margin="dense"
          label="Points"
          type="number"
          fullWidth
          value={editedBoardQuestion.points || 0}
          onChange={handlePointsChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {question ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionModal;
