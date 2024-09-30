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

const User = ({ user: { username } }) => (
  <div className='Card'>
      <div>
      <h1 className='Card--name'>{username}</h1>
      </div>
  </div>
)


function App() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
      <main className='App'>
          <h1>Jeopardy | Users</h1>
          {data.users.map((user) => (
              <User key={user.id} user={user} />
          ))}
      </main>
  )
}

export default App

