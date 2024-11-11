// src/app/games/GameBoardQuery.tsx
'use client';

import { gql, useQuery } from '@apollo/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
// import GameBoardMutation from './GameBoardMutation';
import GameBoard from './[game_uuid]/GameBoard';

// Define the GameBoard type
interface GameBoard {
    id: string,
    createdAt: string,
    updatedAt: string,
    userId: string,
    boardName: string,
}

export const ALL_GAMEBOARDS_QUERY = gql`
 query {
    allGameBoards {
        id
        createdAt
        updatedAt
        userId
        boardName
    }
 }
`;

// Define columns for DataGrid
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
    { field: 'userId', headerName: 'User ID', width: 70 },
    { field: 'boardName', headerName: 'Board Name', width: 150 },
];

const GameBoardQuery = () => {
    const { loading, error, data } = useQuery<{ allGameBoards: GameBoard[] }>(ALL_GAMEBOARDS_QUERY);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;
    if (!data) return <p>No gameboards found.</p>;

    // Prepare rows for DataGrid
    const rows = data.allGameBoards.map((gameboard) => ({
        id: gameboard.id,
        createdAt: new Date(gameboard.createdAt).toLocaleString(),
        updatedAt: new Date(gameboard.updatedAt).toLocaleString(),
        userId: gameboard.userId,
        boardName: gameboard.boardName,
    }));

    return (
        <div>
            <Typography variant='h4' gutterBottom>
                Data from Backend:
            </Typography>

            {/* Include GameBoardMutation component */}

            <Paper sx={{ height: 400, width: '100%' }}>
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

export default GameBoardQuery;