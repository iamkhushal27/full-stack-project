import api from "./api.service";

export const useLogout = () => {
  const navigate = useNavigate();

  return async () => {
    await api.post(
      "/users/logout",
      {},
      {
        withCredentials: true, // ✅ clears the cookie on backend
      },
    );
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
};
