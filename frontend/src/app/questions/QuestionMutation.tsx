// src/app/questions/QuestionMutation.tsx

"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useCreateQuestionMutation,
  GetAllQuestionsDocument,
} from "@/generated/graphql";

const QuestionMutation: React.FC = () => {
  const [question, setQuestionText] = useState("");
  const [answer, setAnswerText] = useState("");
  const [addQuestion, { loading, error }] = useCreateQuestionMutation({
    onCompleted: () => {
      setQuestionText("");
      setAnswerText("");
    },
    refetchQueries: [{ query: GetAllQuestionsDocument }],
  });

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() == "" || answer.trim() == "") return;
    try {
      await addQuestion({
        variables: {
          input: {
            userId: 1,
            question,
            answer,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display="flex" mb={2}>
      {/* Figure out proper quesiton and answer fields here */}
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestionText(e.target.value)}
        multiline
        rows={4}
        variant="outlined"
        required
      />
      <TextField
        label="Answer"
        value={answer}
        onChange={(e) => setAnswerText(e.target.value)}
        multiline
        rows={4}
        variant="outlined"
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddQuestion}
        sx={{ ml: 2 }}
        disabled={loading}
      >
        {loading ? "Adding..." : "Create Question"}
      </Button>
      {error && (
        <Typography color="error" variant="body2" sx={{ ml: 2 }}>
          Error: {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default QuestionMutation;
