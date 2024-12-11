// src/app/components/AdminGameBoardDashboard.tsx
"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import GameBoardMutation from "../games/GameBoardMutation";
import { useGetAllGameBoardsQuery } from "@/generated/graphql";
import Link from "next/link";

// Define columns for DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Board Name", width: 150 },
  { field: "grid", headerName: "Grid", width: 150 },
  { field: "userId", headerName: "User ID", width: 70 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
];

const AdminGameBoardDashboard = () => {
  const { loading, error, data } = useGetAllGameBoardsQuery();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) return <p>No gameboards found.</p>;

  // Prepare rows for DataGrid
  const rows = data.allGameBoards.map((gameboard) => ({
    id: gameboard.id,
    createdAt: new Date(gameboard.createdAt).toLocaleString(),
    updatedAt: new Date(gameboard.updatedAt).toLocaleString(),
    userId: gameboard.userId,
    title: gameboard.title,
  }));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Data from Backend:
      </Typography>

      {/* Include GameBoardMutation component */}
      <GameBoardMutation />

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

export default AdminGameBoardDashboard;
