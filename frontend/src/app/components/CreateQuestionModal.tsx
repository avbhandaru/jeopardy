// src/app/components/CreateQuestionModal.tsx

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface CreateQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    question: string,
    answer: string,
    dailyDouble: boolean,
    points: number
  ) => void;
}

const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<string>("");
  const [editedAnswer, setEditedAnswer] = useState<string>("");
  const [dailyDouble, setDailyDouble] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(100);

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
    onSave(editedQuestion, editedAnswer, dailyDouble, points);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Create Question"}</DialogTitle>
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
          {"Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQuestionModal;
