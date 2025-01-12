// src/app/components/UserCard.tsx
"use client";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useGetUserQuery } from "@/__generated__/graphql";
import QueryResult from "./query-result";

interface UserCardProps {
  user_uuid: string;
}

const UserCard: React.FC<UserCardProps> = ({ user_uuid }) => {
  const userId = parseInt(user_uuid, 10);
  const { data, loading, error } = useGetUserQuery({
    variables: { userId },
  });
  return (
    <Card>
      <CardContent>
        <QueryResult loading={loading} error={error} data={data}>
          <Typography variant="h5" component="h2">
            Username: {data?.getUser?.username}
          </Typography>
        </QueryResult>
        {/* <Typography color="textSecondary">{user.email}</Typography> */}
      </CardContent>
    </Card>
  );
};

export default UserCard;
