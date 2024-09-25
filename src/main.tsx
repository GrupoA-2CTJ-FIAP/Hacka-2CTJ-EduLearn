import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './provider/authProvider';
import Home from './pages/home';
import Register from "./pages/register";
import Login from './pages/login';
import Dashboard from './pages/dashboard';

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
]);

// Ensure AuthProvider wraps RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap the RouterProvider with AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);