"use client";

import styles from "./page.module.css";
import { useState } from "react";
import SignUp from "./SignUp";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SignUp />
      </main>
    </div>
  );
}
