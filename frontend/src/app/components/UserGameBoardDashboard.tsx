"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import { useGetGameBoardsFromUserQuery } from "@/generated/graphql";
import Link from "next/link";

// Define columns for DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Board Name",
    width: 150,
    renderCell: (params) => (
      <Link href={`/users/${params.row.userId}/boards/${params.row.id}`}>
        {params.row.title}
      </Link>
    ),
  },
  { field: "userId", headerName: "User ID", width: 70 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
];

const UserGameBoardDashboard = ({ userId }: { userId: string }) => {
  const { loading, error, data } = useGetGameBoardsFromUserQuery({
    variables: { userId: parseInt(userId, 10) },
  });
  //   console.log("Parsed userId:", parseInt(userId, 10));
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) return <p>No gameboards found.</p>;

  const rows = data.getGameBoardsFromUser.map((gameboard) => ({
    id: gameboard.id,
    createdAt: new Date(gameboard.createdAt).toLocaleString(),
    updatedAt: new Date(gameboard.updatedAt).toLocaleString(),
    userId: gameboard.userId,
    title: gameboard.title,
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
