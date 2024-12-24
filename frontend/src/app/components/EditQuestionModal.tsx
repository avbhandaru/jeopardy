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
  UpdateQuestionInput,
  UpdateBoardQuestionInput,
  DetailedBoardQuestion,
} from "@/__generated__/types";
import React, { useState, useEffect } from "react";

interface EditQuestionModalProps {
  open: boolean;
  /**
   * Question object with board info from clicked cell, null when creating new question
   */
  questionWithInfo: DetailedBoardQuestion;
  boardId: number;
  onClose: () => void;
  onSave: (
    updateBoardQuestionInput: UpdateBoardQuestionInput,
    updateQuestionInput: UpdateQuestionInput
  ) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  questionWithInfo,
  boardId,
  onClose,
  onSave,
}) => {
  // Separate state variables for question and board question details
  const [editedQuestion, setEditedQuestion] = useState<string>("");
  const [editedAnswer, setEditedAnswer] = useState<string>("");
  const [dailyDouble, setDailyDouble] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(100);

  // Update state when the question prop changes
  useEffect(() => {
    setEditedQuestion(questionWithInfo.question.question);
    setEditedAnswer(questionWithInfo.question.answer);
    setDailyDouble(questionWithInfo.boardQuestion.dailyDouble);
    setPoints(questionWithInfo.boardQuestion.points);
  }, [questionWithInfo]);

  const handleDailyDoubleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDailyDouble(event.target.checked);
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    setPoints(isNaN(val) ? 100 : val);
  };

  const handleSave = () => {
    // Validate input
    if (!editedQuestion.trim() || !editedAnswer.trim()) {
      alert("Question or Answer can't be empty dude");
      return;
    }
    const updateQuestionInput: UpdateQuestionInput = {
      id: questionWithInfo.question.id,
      question: editedQuestion,
      answer: editedAnswer,
    };
    const updateBoardQuestionInput: UpdateBoardQuestionInput = {
      boardId,
      questionId: questionWithInfo.question.id,
      dailyDouble,
      points,
    };
    onSave(updateBoardQuestionInput, updateQuestionInput);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Edit Question"}</DialogTitle>
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
              checked={dailyDouble}
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
          value={points}
          onChange={handlePointsChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {"Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionModal;
