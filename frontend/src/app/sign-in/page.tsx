"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Sign In</h1>
      </main>
    </div>
  );
}
