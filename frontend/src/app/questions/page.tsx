// src/app/questions/page.tsx
"use client";

import QuestionQuery from "./QuestionQuery";
import styles from "./page.module.css";

export default function QuestionsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <h1>Questions Dashboard</h1>
          {/* TODO create question dashboard that extends admin question */}
          dashboard
          <QuestionQuery />
        </ol>
      </main>
    </div>
  );
}
