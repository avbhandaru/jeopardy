// src/app/users/[user_uuid]/board/[board_uuid]/page.tsx

import styles from "./page.module.css";
import GameBoardDisplay from "@/app/components/GameBoardDisplay";

export default async function BoardPage({
  params,
}: {
  params: { user_uuid: string; board_uuid: string };
}) {
  const { user_uuid, board_uuid } = await params;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameBoardDisplay board_uuid={board_uuid} user_uuid={user_uuid} />
      </main>
    </div>
  );
}
