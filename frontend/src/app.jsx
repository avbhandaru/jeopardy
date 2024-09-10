import React from "react";
import Users from "./Users";
import ApolloProvider from "./ApolloProvider";


export const App = () => {
  return (
    <ApolloProvider>
      <div className="App">
        <h1>GraphQL Users</h1>
        <Users />
      </div>
    </ApolloProvider>
  );
};

