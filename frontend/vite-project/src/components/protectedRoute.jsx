// components/ProtectedRoute.jsx
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUserData } from "../service/user.service";

function AuthRoute({ children }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUserData,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <Navigate to="/login" replace />;

  return children;
}

export default AuthRoute;