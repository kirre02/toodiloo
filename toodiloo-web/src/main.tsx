import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import './main.scss';
import { Footer, Nav } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <p>Not found</p>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Nav />
    <main>
      <RouterProvider router={router} />
    </main>
    <Footer />
  </React.StrictMode>,
);
