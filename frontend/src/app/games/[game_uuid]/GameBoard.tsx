'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

// Separate the Board component and question into a new Client Component
export default function GameBoard() {
  const question = (text: string) => (
    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
      {/* <svg>
        <Box
          component="polygon"
          points="0,100 50,00, 100,100"
          sx={(theme) => ({
            fill: theme.palette.common.white,
            stroke: theme.palette.divider,
            strokeWidth: 1,
          })}
        />
      </svg> */}
      <Typography>{text}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ height: 180 }}>
      <Box sx={{ display: 'flex' }}>
        {question('What is a goose?')}
        {question('What is a square?')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
      </Box>
      <Box sx={{ display: 'flex' }}>
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
      </Box>
      <Box sx={{ display: 'flex' }}>
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
      </Box>
      <Box sx={{ display: 'flex' }}>
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
      </Box>
      <Box sx={{ display: 'flex' }}>
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
        {question('Question goes here...')}
      </Box>
    </Box>
  );
};
