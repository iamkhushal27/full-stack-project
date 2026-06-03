// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Flex, Loader } from "@mantine/core";

function AuthRoute({ children }) {
  const token = useAuth((state) => state.token);
  
  if (!token) {
    return <Navigate to="/login" replace />; // 👈 redirect if no token
  }

  return children; // 👈 show page if token exists
}

export default AuthRoute;
