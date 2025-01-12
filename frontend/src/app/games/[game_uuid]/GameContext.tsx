"use client";

import React, { createContext, useContext, useState } from "react";
import { DetailedBoardQuestion } from "@/__generated__/types";

interface GameContextValue {
  game_uuid: string;
  currentDetailedBoardQuestion: DetailedBoardQuestion | null;
  setCurrentDetailedBoardQuestion: (
    question: DetailedBoardQuestion | null
  ) => void;
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
  const [currentDetailedBoardQuestion, setCurrentDetailedBoardQuestion] =
    useState<DetailedBoardQuestion | null>(null);
  const value: GameContextValue = {
    game_uuid,
    currentDetailedBoardQuestion,
    setCurrentDetailedBoardQuestion,
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
