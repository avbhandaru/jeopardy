import { List, ListItem } from "@mui/material";
import styles from "./page.module.css";
import UserGameBoardDashboard from "@/app/components/UserGameBoardDashboard";
import UserCard from "@/app/components/UserCard";

export default async function UserPage({
  params,
}: {
  params: { user_uuid: string };
}) {
  const { user_uuid } = await params;
  // console.log("user_uuid in UserPage:", user_uuid);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>User Page</h1>
        <List>
          <ListItem>
            <UserCard user_uuid={user_uuid}></UserCard>
          </ListItem>
          <ListItem>Games</ListItem>
          <ListItem>
            <UserGameBoardDashboard userId={user_uuid} />
          </ListItem>
        </List>
      </main>
    </div>
  );
}
