import React from 'react';
import { gql, useQuery } from '@apollo/client';


// Define the GraphQL query
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      created_at
      updated_at
    }
  }
`;

// React component to fetch and display users
const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            {user.username} (Created: {new Date(user.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;