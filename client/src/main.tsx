import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404 - Page Not Found</h1>,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);

// Apollo Client setup
const client = new ApolloClient({
  uri: '/graphql', // your GraphQL endpoint
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
