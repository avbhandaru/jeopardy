import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

// Set up your Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql', // Replace with your GraphQL server URI
    cache: new InMemoryCache(),
  });
  

// Get the root element from your HTML
const container = document.getElementById('app');
const root = createRoot(container);

// Render your app with ApolloProvider
root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
