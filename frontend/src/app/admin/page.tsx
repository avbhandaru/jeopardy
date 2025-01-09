// src/app/admin/page.tsx

"use client";

import styles from "./page.module.css";
import AdminUserDashboard from "./AdminUserDashboard";
import AdminGameBoardDashboard from "./AdminGameBoardDashboard";
import AdminQuestionsDashboard from "./AdminQuestionsDashboard";
import { List } from "@mui/material";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Admin Page</h1>
        <List>
          <li>
            <h1>Users Dashboard</h1>
            <AdminUserDashboard />
          </li>
          <li>
            <h1>GameBoards Dashboard</h1>
            <AdminGameBoardDashboard />
          </li>
          <li>
            <h1>Questions Dashboard</h1>
            <AdminQuestionsDashboard />
          </li>
        </List>
      </main>
    </div>
  );
}
