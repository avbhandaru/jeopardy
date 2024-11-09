// src/app/users/page.tsx

'use client';

import UserQuery from "./UserQuery";
import styles from "./page.module.css";

export default function UsersPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <h1>Users Dashboard</h1>
          <UserQuery />
        </ol>
      </main>
    </div>
  );
}
