// src/app/components/AdminQuestionsDashboard.tsx
"use client";

import { useFetchAllQuestionsQuery } from "@/__generated__/graphql";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "userId", headerName: "User ID", width: 70 },
  { field: "questionText", headerName: "Question Text", width: 200 },
  { field: "answer", headerName: "Answer", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
];

const AdminQuestionsDashboard = () => {
  const { loading, error, data } = useFetchAllQuestionsQuery();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data) return <p>No questions found.</p>;

  const rows = data.fetchAllQuestions.map((question) => ({
    id: question.id,
    createdAt: new Date(question.createdAt).toLocaleString(),
    updatedAt: new Date(question.updatedAt).toLocaleString(),
    userId: question.userId,
    questionText: question.question,
    answer: question.answer,
  }));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Data from Backend:
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

export default AdminQuestionsDashboard;
