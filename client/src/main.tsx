import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import Home from './pages/Home';
import AddShift from './pages/AddShift';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404 - Page Not Found</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: 'add', element: <AddShift /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
