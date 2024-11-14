// src/app/questions/QuestionMutation.tsx

'use client';

import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_QUESTIONS_QUERY } from './QuestionQuery';
import { Box, Button, TextField, Typography } from '@mui/material';



// Define Question type
interface Question {
    id: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    questionText: string,
    answer: string,
}

const ADD_QUESTION_MUTATION = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
        createQuestion(input: $input) {
            id
            createdAt
            updatedAt
            userId
            questionText
            answer
        }
    }
`;

const QuestionMutation = () => {
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswerText] = useState('');
    const [addQuestion, { loading, error }] = useMutation<{ createQuestion: Question}, { input: {userId: number, questionText: string, answer: string,  createdAt: string, updatedAt: string} }>(
        ADD_QUESTION_MUTATION,
        {
            // This is the stuff we do after the mutation as completed
            onCompleted: () => {
                setQuestionText('');
                setAnswerText('');
            },
            refetchQueries: [{ query: ALL_QUESTIONS_QUERY}],
        }
    );

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((questionText.trim() == '') || (answer.trim() == '')) return;
        const currentTime = new Date().toISOString();
        try {
            await addQuestion({ variables: {input : {userId: 1, questionText, answer, createdAt: currentTime, updatedAt: currentTime } } });
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <Box display="flex" mb={2}>
            {/* Figure out proper quesiton and answer fields here */}
            <TextField
                label="Question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                multiline
                rows={4}
                variant='outlined'
                required
            />
            <TextField
                label="Answer"
                value={answer}
                onChange={(e) => setAnswerText(e.target.value)}
                multiline
                rows={4}
                variant='outlined'
                required
            />
            <Button
                variant='contained'
                color='primary'
                onClick={handleAddQuestion}
                sx={{ ml: 2}}
                disabled={loading}
            >
                {loading ? 'Adding...': 'Add Question'}
            </Button>
            {error && (
                <Typography color='error' variant='body2' sx={{ ml: 2}}>
                    Error: {error.message}
                </Typography> 
            )}
        </Box>
    );
};

export default QuestionMutation;