import * as React from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { GameBoardQuestion } from "@/__generated__/types";

interface GameGBQModalProps {
  open: boolean;
  gameBoardQuestion: GameBoardQuestion;
  onClose: () => void;
}

const GameGBQModal: React.FC<GameGBQModalProps> = ({
  open,
  gameBoardQuestion,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ style: { borderRadius: 20, maxHeight: "80%" } }}
    >
      <DialogContent sx={{ padding: 4 }}>
        <DialogContentText sx={{ fontSize: 75 }}>
          Question: {gameBoardQuestion.question.question}
        </DialogContentText>
        <DialogContentText sx={{ fontSize: 30 }}>
          Answer: {gameBoardQuestion.question.answer}
        </DialogContentText>
        <DialogContentText sx={{ fontSize: 30 }}>
          Points: {gameBoardQuestion.mapping.points}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameGBQModal;
