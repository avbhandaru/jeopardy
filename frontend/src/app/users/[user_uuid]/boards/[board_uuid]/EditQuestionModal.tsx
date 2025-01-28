// src/app/components/EditQuestionModal.tsx

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  UpdateQuestionInput,
  UpdateGameBoardMappingInput,
  GameBoardQuestion,
} from "@/__generated__/types";
import {
  useUpdateQuestionMutation,
  useUpdateMappingMutation,
  FetchGbQsDocument,
} from "@/__generated__/graphql";
import React, { useState, useEffect } from "react";

interface EditQuestionModalProps {
  open: boolean;
  /**
   * GameBoardQuestion object. Contains question + mapping
   */
  gameBoardQuestion: GameBoardQuestion;
  onClose: () => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  gameBoardQuestion,
  onClose,
}) => {
  // Separate state variables for question and board question details
  const [editedQuestion, setEditedQuestion] = useState<string>("");
  const [editedAnswer, setEditedAnswer] = useState<string>("");
  const [dailyDouble, setDailyDouble] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(100);
  const [updateQuestion, { loading, error, data }] =
    useUpdateQuestionMutation();
  const [
    updateMapping,
    { loading: mapLoading, error: mapError, data: mapData },
  ] = useUpdateMappingMutation();

  // Update state when the GBQ prop changes
  useEffect(() => {
    setEditedQuestion(gameBoardQuestion.question.question);
    setEditedAnswer(gameBoardQuestion.question.answer);
    setDailyDouble(gameBoardQuestion.mapping.dailyDouble);
    setPoints(gameBoardQuestion.mapping.points);
  }, [gameBoardQuestion]);

  const handleDailyDoubleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDailyDouble(event.target.checked);
  };

  const handlePointsChange = (event: SelectChangeEvent<number>) => {
    setPoints(event.target.value as number);
  };

  const handleSave = async () => {
    // Validate input
    if (!editedQuestion.trim() || !editedAnswer.trim()) {
      alert("Question or Answer can't be empty dude");
      return;
    }
    const updateQuestionInput: UpdateQuestionInput = {
      id: gameBoardQuestion.question.id,
      question: editedQuestion,
      answer: editedAnswer,
    };
    const updateMappingInput: UpdateGameBoardMappingInput = {
      boardId: gameBoardQuestion.mapping.boardId,
      questionId: gameBoardQuestion.question.id,
      dailyDouble,
      points,
    };

    await updateQuestion({ variables: { input: updateQuestionInput } });
    await updateMapping({
      variables: { input: updateMappingInput },
      refetchQueries: [
        {
          query: FetchGbQsDocument,
          variables: { gameBoardId: gameBoardQuestion.mapping.boardId },
        },
      ],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Edit Question"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          multiline
          minRows={4}
          label="Question"
          fullWidth
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          multiline
          minRows={4}
          label="Answer"
          fullWidth
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
          required
        />
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
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="points-select-label">Points</InputLabel>
          <Select
            label="Points"
            fullWidth
            value={points}
            required
            onChange={handlePointsChange}
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={300}>300</MenuItem>
            <MenuItem value={400}>400</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>
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
