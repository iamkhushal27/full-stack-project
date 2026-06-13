// components/ProtectedRoute.jsx
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Flex, Loader } from "@mantine/core";
import { isTokenExpired } from "../utils/tokenExpiredCheck";

function AuthRoute({ children }) {
  const token = useAuth((state) => state.token);
  const logout = useAuth((state) => state.logout);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children; // 👈 show page if token exists
}

export default AuthRoute;
