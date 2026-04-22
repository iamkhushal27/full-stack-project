export const useLogout = () => {
    const navigate = useNavigate();
  
    return async () => {
      await axios.post("http://localhost:3000/api/users/logout", {}, {
        withCredentials: true, // ✅ clears the cookie on backend
      });
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    };
  };