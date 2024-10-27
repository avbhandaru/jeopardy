import styles from "./page.module.css";

export default async function UserPage({ params }: { params: { user_uuid: string } }) {
  const { user_uuid } = await params;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li><code>/users/[user_uuid]</code> page</li>
          <li>Current user: <code>{user_uuid}</code></li>
          <li>
            Get started by editing <code>src/app/users/[user_uuid]/page.tsx</code>.
          </li>
        </ol>
      </main>
    </div>
  );
}
