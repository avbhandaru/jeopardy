// src/app/admin/page.tsx

'use client';

import styles from "./page.module.css";
import UserQuery from "../users/UserQuery";
import GameBoardQuery from "../games/GameBoardQuery";

export default function AdminPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Admin Page</h1>
                <ol>
                    <li>
                        <h1>Users Dashboard</h1>
                        <UserQuery />
                    </li>
                    <li>
                        <h1>GameBoards Dashboard</h1>
                        <GameBoardQuery />
                    </li>
                </ol>
            </main>
        </div>
    )
}