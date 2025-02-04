"use client";

import styles from "./page.module.css";
import { useState } from "react";
import SignIn from "./SignIn";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SignIn />
      </main>
    </div>
  );
}
