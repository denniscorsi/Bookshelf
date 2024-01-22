import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App.jsx';
import ErrorPage from './components/error.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: 'test',
  //   element: <h1>hey girl</h1>,
  // },
  // {
  //   path: 'book/:id',
  //   element: <Book />,
  // },
]);

const root = createRoot(document.querySelector('#root'));
// root.render(<App />);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
