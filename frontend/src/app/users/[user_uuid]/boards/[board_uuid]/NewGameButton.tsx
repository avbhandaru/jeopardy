import React from "react";
import { useRouter } from "next/navigation";
import { useCreateGameMutation } from "@/__generated__/graphql";
import { GameBoard } from "@/__generated__/types";
import { Button } from "@mui/material";

interface NewGameButtonProps {
  userId: number;
  gameBoard: GameBoard;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ userId, gameBoard }) => {
  const handleClickNewGame = async () => {
    const router = useRouter();
    const [createNewGame] = useCreateGameMutation();

    // TODO validate gameboard here
    try {
      const newGameResult = await createNewGame({
        variables: { input: { userId, gameBoardId: gameBoard.id } },
      });
      const gameUuid = newGameResult?.data?.createGame.id;
      router.push(`/games/${gameUuid}`);
    } catch (error) {
      console.error("Error creating new game:", error);
      alert("An error occured while creating the game");
      throw error;
    }
  };

  return (
    <Button
      size="large"
      variant="contained"
      color="secondary"
      sx={{ maxHeight: "80%" }}
      onClick={() => handleClickNewGame()}
    >
      New Game
    </Button>
  );
};

export default NewGameButton;
