import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import {
  useUpdateTitleMutation,
  GameBoardDataDocument,
} from "@/__generated__/graphql";

interface EditTitleProps {
  title: string;
  gameBoardId: number;
}

const EditTitle: React.FC<EditTitleProps> = ({ title, gameBoardId }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [updateTitle, { loading, error, data }] = useUpdateTitleMutation({
    variables: { id: gameBoardId, newTitle },
    refetchQueries: [
      {
        query: GameBoardDataDocument,
        variables: { gameBoardId },
      },
    ],
  });

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrEnter = async () => {
    try {
      await updateTitle();
    } catch (e) {
      console.error("Error updating title:", e);
    }
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
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
          variant="h2"
          onClick={handleTextClick}
          style={{ cursor: "pointer" }}
        >
          {newTitle}
        </Typography>
      )}
    </div>
  );
};

export default EditTitle;
