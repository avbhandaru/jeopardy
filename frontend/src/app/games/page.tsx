// src/app/games/page.tsx
"use client";

import AdminGameBoardDashboard from "../admin/AdminGameBoardDashboard";
import styles from "./page.module.css";

export default function GamesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <h1>Gameboards Dashboard</h1>
          <AdminGameBoardDashboard />
        </ol>
      </main>
    </div >
  );
}
