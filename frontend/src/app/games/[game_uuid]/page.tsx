import styles from "./page.module.css";
import * as React from "react";
import GameBoard from "./GameBoard";
import Scoreboard from "./Scoreboard";
import { GameContextProvider } from "./GameContext";

export default async function GamePage({
  params,
}: {
  params: { game_uuid: string };
}) {
  const { game_uuid } = await params;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameContextProvider game_uuid={game_uuid}>
          <GameBoard />
          <Scoreboard />
        </GameContextProvider>
      </main>
    </div>
  );
}
