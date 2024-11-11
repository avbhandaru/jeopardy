// src/app/games/page.tsx
'use client';

import GameBoardQuery from "./GameBoardQuery";
import styles from "./page.module.css";

export default function GamesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <h1>Games Dashboard</h1>
          <GameBoardQuery />
        </ol>
      </main>
    </div >
  );
}
