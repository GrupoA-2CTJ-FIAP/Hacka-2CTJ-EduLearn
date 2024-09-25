import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AuthProvider from './provider/authProvider';
import { useAuth } from "./hooks/useAuth";
import Home from './pages/home';
import Register from "./pages/register";
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { ReactNode } from 'react';

// Define props type for the route wrappers
interface RouteProps {
  element: ReactNode;
}

// Custom wrapper to handle protected routes
const ProtectedRoute = ({ element }: RouteProps) => {
  const { user } = useAuth(); // Get user from the Auth context

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the element
  return <>{element}</>;
};

// Custom wrapper to handle routes for logged-in users
const PublicRoute = ({ element }: RouteProps) => {
  const { user } = useAuth(); // Get user from the Auth context

  // If the user is authenticated, redirect to the dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // If not authenticated, render the element
  return <>{element}</>;
};

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute element={<Home />} />, // Protect this route for unauthenticated users
  },
  {
    path: "/register",
    element: <PublicRoute element={<Register />} />, // Protect this route
  },
  {
    path: "/login",
    element: <PublicRoute element={<Login />} />, // Protect this route
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />, // Protect this route
  },
]);

// Ensure AuthProvider wraps RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);