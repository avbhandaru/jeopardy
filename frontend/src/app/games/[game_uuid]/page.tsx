import styles from "./page.module.css";

export default async function GamePage({ params }: { params: { game_uuid: string } }) {
  const { game_uuid } = await params;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li><code>/games/[game_uuid]</code> page</li>
          <li>Current game: <code>{game_uuid}</code></li>
          <li>
            Get started by editing <code>src/app/games/[game_uuid]/page.tsx</code>.
          </li>
        </ol>
      </main>
    </div>
  );
}
