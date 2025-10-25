import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
