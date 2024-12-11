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
  CreateQuestionInput,
  CreateBoardQuestionInput,
  UpdateQuestionInput,
  UpdateBoardQuestionInput,
  QuestionWithBoardInfo,
} from "@/generated/graphql";
import React, { useState, useEffect } from "react";
import { SaveAction, SaveActionType } from "../types/SaveAction";

interface EditQuestionModalProps {
  open: boolean;
  /**
   * Question object with board info from clicked cell, null when creating new question
   */
  questionWithInfo: QuestionWithBoardInfo | null;
  boardId: number;
  user_uuid: number;
  gridRow: number;
  gridCol: number;
  onClose: () => void;
  onSave: (action: SaveAction) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  questionWithInfo,
  boardId,
  user_uuid,
  gridRow,
  gridCol,
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
    if (questionWithInfo) {
      setEditedQuestion(questionWithInfo.question.question);
      setEditedAnswer(questionWithInfo.question.answer);
      setDailyDouble(questionWithInfo.dailyDouble);
      setPoints(questionWithInfo.points);
    } else {
      // reset to defaults when creating a new question
      setEditedQuestion("");
      setEditedAnswer("");
      setDailyDouble(false);
      setPoints(100);
    }
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

    if (questionWithInfo) {
      // if editing, send a Question object
      const isQuestionChanged =
        editedQuestion !== questionWithInfo.question.question ||
        editedAnswer !== questionWithInfo.question.answer;
      const isBoardQuestionChanged =
        dailyDouble !== questionWithInfo.dailyDouble ||
        points !== questionWithInfo.points;
      if (isQuestionChanged && isBoardQuestionChanged) {
        // Updating both question and boardQuestion
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
        onSave({
          type: SaveActionType.UPDATE_BOTH,
          updateQuestionInput,
          updateBoardQuestionInput,
        });
      } else if (isQuestionChanged) {
        // Updating only question
        const updateQuestionInput: UpdateQuestionInput = {
          id: questionWithInfo.question.id,
          question: editedQuestion,
          answer: editedAnswer,
        };
        onSave({
          type: SaveActionType.UPDATE_QUESTION,
          updateQuestionInput,
        });
      } else if (isBoardQuestionChanged) {
        // Updating only boardQuestion
        const updateBoardQuestionInput: UpdateBoardQuestionInput = {
          boardId, // need to update
          questionId: questionWithInfo.question.id,
          dailyDouble,
          points,
        };
        onSave({
          type: SaveActionType.UPDATE_BOARDQUESTION,
          updateBoardQuestionInput,
        });
      } else {
        // No changes detected
        alert("No changes detected.");
        return;
      }
    } else {
      // Creating new question and boardQuestion
      const newQuestionInput: CreateQuestionInput = {
        userId: user_uuid,
        question: editedQuestion,
        answer: editedAnswer,
      };
      const createBoardQuestionInput: CreateBoardQuestionInput = {
        boardId: 0, // Replace with actual board ID
        questionId: -1, // Placeholder; should be replaced with the new question ID
        dailyDouble,
        points,
        gridRow,
        gridCol,
        category: "default",
      };
      onSave({
        type: SaveActionType.CREATE,
        questionInput: newQuestionInput,
        boardQuestionInput: createBoardQuestionInput,
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {questionWithInfo ? "Edit Question" : "Create Question"}
      </DialogTitle>
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
          {questionWithInfo ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionModal;
