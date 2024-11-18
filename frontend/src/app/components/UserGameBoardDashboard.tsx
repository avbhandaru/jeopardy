"use client";

import { gql, useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import Link from "next/link";

// Define the GameBoard type
interface GameBoard {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  boardName: string;
  grid: JSON;
}

// GraphQL Query for User
export const USER_GAMEBOARDS_QUERY = gql`
  query GetGameBoardFromUser($userId: Int!) {
    getGameBoardFromUser(userId: $userId) {
      id
      createdAt
      updatedAt
      userId
      boardName
      grid
    }
  }
`;

// Define columns for DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "boardName",
    headerName: "Board Name",
    width: 150,
    renderCell: (params) => (
      <Link href={`/users/${params.row.userId}/boards/${params.row.id}`}>
        {params.row.boardName}
      </Link>
    ),
  },
  { field: "grid", headerName: "Grid", width: 150 },
  { field: "userId", headerName: "User ID", width: 70 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
];

const UserGameBoardDashboard = ({ userId }: { userId: string }) => {
  const { loading, error, data } = useQuery<{
    getGameBoardFromUser: GameBoard[];
  }>(USER_GAMEBOARDS_QUERY, { variables: { userId: parseInt(userId, 10) } });
  //   console.log("Parsed userId:", parseInt(userId, 10));
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) return <p>No gameboards found.</p>;

  const rows = data.getGameBoardFromUser.map((gameboard) => ({
    id: gameboard.id,
    createdAt: new Date(gameboard.createdAt).toLocaleString(),
    updatedAt: new Date(gameboard.updatedAt).toLocaleString(),
    userId: gameboard.userId,
    boardName: gameboard.boardName,
    grid: gameboard.grid,
  }));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My GameBoards
      </Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default UserGameBoardDashboard;
