import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import {
  useUpdateGameBoardTitleMutation,
  FindGameBoardDocument,
} from "@/__generated__/graphql";

interface TitleProps {
  title: string;
  gameBoardId: number;
}

const Title: React.FC<TitleProps> = ({ title, gameBoardId }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [updateTitle, { loading, error, data }] =
    useUpdateGameBoardTitleMutation({
      variables: { boardId: gameBoardId, title: newTitle },
      refetchQueries: [
        {
          query: FindGameBoardDocument,
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

  const handleEscape = () => {
    setNewTitle(title); // Reset the category to its original value
    setIsEditing(false); // Exit editing mode
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
            } else if (e.key === "Escape") {
              handleEscape(); // Cancel the edit on Escape
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

export default Title;
