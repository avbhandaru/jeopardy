import styles from "./page.module.css";

export default function BoardsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li><code>/users/[user_uuid]/boards</code> page</li>
          <li>
            Get started by editing <code>src/app/users/[user_uuid]/boards/page.tsx</code>.
          </li>
        </ol>
      </main>
    </div>
  );
}
