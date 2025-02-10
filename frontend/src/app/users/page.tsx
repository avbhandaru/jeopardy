// src/app/users/page.tsx
"use client";

import styles from "./page.module.css";
import { List, ListItem } from "@mui/material";

export default function UsersPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <h1>Users Page</h1>
          <p>
            Not really sure what should be here. Honestly, this shouldn't even
            be an accesible route.
          </p>
          <p>Maybe I'll put a good recipe for any lost souls</p>
          <List>
            <h2>Ingredients:</h2>
            <ListItem>
              <ul>
                <li>1 cup of flour</li>
                <li>1 cup of sugar</li>
                <li>1 cup of milk</li>
                <li>1 cup of butter</li>
                <li>1 cup of chocolate chips</li>
              </ul>
            </ListItem>
            <h2>Next Step</h2>
            <ListItem>Idk, eat it?</ListItem>
          </List>
        </ol>
      </main>
    </div>
  );
}
