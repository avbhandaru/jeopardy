// src/app/questions/page.tsx
"use client";

import AdminQuestionsDashboard from "../admin/AdminQuestionsDashboard";
import styles from "./page.module.css";

export default function QuestionsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <h1>Questions Dashboard</h1>
          <AdminQuestionsDashboard />
        </ol>
      </main>
    </div>
  );
}
