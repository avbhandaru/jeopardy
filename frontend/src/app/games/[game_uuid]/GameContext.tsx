"use client";

import React, { createContext, useContext, useState } from "react";
import { GameBoardQuestion } from "@/__generated__/types";

interface GameContextValue {
  game_uuid: string;
  currentGameBoardQuestion: GameBoardQuestion | null;
  setCurrentGameBoardQuestion: (question: GameBoardQuestion | null) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

/**
 * Props for your GameContextProvider.
 * Children = nested React elements
 * gameUuid = the UUID you want to provide
 */
interface GameContextProviderProps {
  children: React.ReactNode;
  game_uuid: string;
}

export function GameContextProvider({
  children,
  game_uuid,
}: GameContextProviderProps) {
  // State to hold the current detailed board question
  const [currentGameBoardQuestion, setCurrentGameBoardQuestion] =
    useState<GameBoardQuestion | null>(null);
  const value: GameContextValue = {
    game_uuid,
    currentGameBoardQuestion,
    setCurrentGameBoardQuestion,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

/**
 * Custom hook to consume the GameContext
 */
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}
