// src/app/components/AdminUserDashboard.tsx
"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import UserMutation from "../users/UserMutation";
import { useGetAllUsersQuery } from "@/generated/graphql";
import Link from "next/link";

// Define columns for DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    renderCell: (params) => (
      <Link href={`/users/${params.row.id}`}>{params.row.username}</Link>
    ),
  },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
];

const AdminUserDashboard = () => {
  const { loading, error, data } = useGetAllUsersQuery();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) return <p>No users found.</p>; // Check if data is undefined

  // Prepare rows for DataGrid
  const rows = data.allUsers.map((user) => ({
    id: user.id,
    username: user.username,
    createdAt: new Date(user.createdAt).toLocaleString(),
    updatedAt: new Date(user.updatedAt).toLocaleString(),
  }));

  // TODO: Fix everything now that there's auto types
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Data from Backend:
      </Typography>

      {/* Include the UserMutation component */}
      <UserMutation />

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

export default AdminUserDashboard;
