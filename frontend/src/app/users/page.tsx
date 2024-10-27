import styles from "./page.module.css";

export default function UsersPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li><code>/users</code> page</li>
          <li>
            Get started by editing <code>src/app/users/page.tsx</code>.
          </li>
        </ol>
      </main>
    </div>
  );
}
