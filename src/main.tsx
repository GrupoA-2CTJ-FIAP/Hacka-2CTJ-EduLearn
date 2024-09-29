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

interface RouteProps {
  element: ReactNode;
}

const ProtectedRoute = ({ element }: RouteProps) => {
  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};


const PublicRoute = ({ element }: RouteProps) => {
  const { user } = useAuth(); 


  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <>{element}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute element={<Home />} />,
  },
  {
    path: "/register",
    element: <PublicRoute element={<Register />} />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<Login />} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);