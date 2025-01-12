// src/app/components/PlayerCard.tsx

import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Player } from "@/__generated__/types";
import Grid from "@mui/material/Grid2";
import { useUpdatePlayerNameMutation } from "@/__generated__/graphql";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useGameContext } from "./GameContext";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(player.playerName);
  const [updateName, { loading, error }] = useUpdatePlayerNameMutation();
  const [currentScore, setScore] = useState(player.score);
  const {
    game_uuid,
    currentDetailedBoardQuestion,
    setCurrentDetailedBoardQuestion,
  } = useGameContext();

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrEnter = async () => {
    // Call the mutation to update the player name
    try {
      await updateName({
        variables: {
          playerId: player.id,
          newName: playerName,
        },
      });
    } catch (e) {
      console.error("Error updating player name:", e);
    }
    setIsEditing(false);
  };

  const handleClickArrowUp = () => {
    const questionPoints =
      currentDetailedBoardQuestion?.boardQuestion.points || 0;
    setScore(currentScore + questionPoints);
    console.log("currentScore", currentScore);
  };

  const handleClickArrowDown = () => {
    const questionPoints =
      currentDetailedBoardQuestion?.boardQuestion.points || 0;
    setScore(currentScore - questionPoints);
    console.log("currentScore", currentScore);
  };

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="center" spacing={2}>
          {isEditing ? (
            <TextField
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onBlur={handleBlurOrEnter}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBlurOrEnter();
                }
              }}
              autoFocus
              size="small"
            />
          ) : (
            <Typography
              variant="h5"
              component="h2"
              onClick={handleTextClick}
              style={{ cursor: "pointer" }}
            >
              {playerName}
            </Typography>
          )}
        </Grid>
        <Divider />
        <Grid container justifyContent="center" spacing={2}>
          <IconButton onClick={handleClickArrowUp}>
            <ArrowDropUp />
          </IconButton>
          <Typography color="textSecondary">{currentScore}</Typography>
          <IconButton onClick={handleClickArrowDown}>
            <ArrowDropDown />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
