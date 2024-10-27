import styles from "./page.module.css";

export default async function BoardPage({ params }: { params: { user_uuid: string, board_uuid: string } }) {
  const { user_uuid, board_uuid } = await params;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li><code>/users/[user_uuid]/boards/[board_uuid]</code> page</li>
          <li>Current user: <code>{user_uuid}</code></li>
          <li>Current board: <code>{board_uuid}</code></li>
          <li>
            Get started by editing <code>src/app/users/[user_uuid]/boards/[board_uuid]/page.tsx</code>.
          </li>
        </ol>
      </main>
    </div>
  );
}
