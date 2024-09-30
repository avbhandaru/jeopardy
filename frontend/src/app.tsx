import React from "react";
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './App.css'

const GET_USERS = gql`
    {
        users {
            id
            username
        }
    }
`

interface UserType {
    id: string;
    username: string;
}

interface UsersData {
    users: UserType[];
}

interface UserProps {
    user: UserType;
}

const User: React.FC<UserProps> = ({ user: { username } }) => (
  <div className='Card'>
      <div>
      <h1 className='Card--name'>{username}</h1>
      </div>
  </div>
);


const App: React.FC = () => {
  const { loading, error, data } = useQuery<UsersData>(GET_USERS);

  if (error) return <h1>Something went wrong!</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
      <main className='App'>
          <h1>Jeopardy | Users</h1>
          {data?.users.map((user) => (
              <User key={user.id} user={user} />
          ))}
      </main>
  );
};

export default App;

