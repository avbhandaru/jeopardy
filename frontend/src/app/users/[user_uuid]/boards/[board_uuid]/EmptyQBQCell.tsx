// src/app/components/EmptyGBQCell.tsx

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import {
  useCreateQuestionMutation,
  useCreateMappingMutation,
  FetchGbQsDocument,
  CreateQuestionInput,
  CreateGameBoardMappingInput,
} from "@/__generated__/graphql";

interface EmptyQBQCellProps {
  row: number;
  col: number;
  gameBoardId: number;
  userId: number;
}

const EmptyGBQCell: React.FC<EmptyQBQCellProps> = ({
  row,
  col,
  gameBoardId,
  userId,
}) => {
  const [open, setOpen] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<string>("");
  const [editedAnswer, setEditedAnswer] = useState<string>("");
  const [dailyDouble, setDailyDouble] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(100);
  const [createQuestion, { loading, error, data }] =
    useCreateQuestionMutation();
  const [
    createGameBoardMapping,
    { loading: mapLoading, error: mapError, data: mapData },
  ] = useCreateMappingMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDailyDoubleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDailyDouble(event.target.checked);
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    setPoints(isNaN(val) ? 100 : val);
  };

  const handleSave = async () => {
    // Validate input
    if (!editedQuestion.trim() || !editedAnswer.trim()) {
      alert("Question or Answer can't be empty dude");
      return;
    }

    const questionInput: CreateQuestionInput = {
      question: editedQuestion,
      answer: editedAnswer,
      userId,
    };

    const newQuestion = await createQuestion({
      variables: { input: questionInput },
    });

    if (!newQuestion.data?.createQuestion?.id) {
      throw new Error("Failed to create new question");
    }

    const newQuestionId = newQuestion.data.createQuestion.id;

    if (points == 100) {
      setPoints(points * (row + 1));
    }

    const gameBoardMappingInput: CreateGameBoardMappingInput = {
      boardId: gameBoardId,
      questionId: newQuestionId,
      dailyDouble,
      gridRow: row,
      gridCol: col,
      points,
    };

    await createGameBoardMapping({
      variables: { input: gameBoardMappingInput },
      refetchQueries: [
        { query: FetchGbQsDocument, variables: { gameBoardId } },
      ],
    });
    handleClose();
  };

  return (
    <Grid
      size={{ xs: 12 / 5 }}
      sx={{
        height: "16%",
        textAlign: "center",
        border: "2px solid #ccc",
        backgroundColor: "#de634d",
        padding: 2,
        cursor: "defualt",
        "&:hover": {
          backgroundColor: "#ddab4d",
        },
        transition: "background-color 0.3s ease",
      }}
      onClick={handleOpen}
    >
      <Typography>{`Click to create question`}</Typography>
      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {"Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EmptyGBQCell;
