import axios from "axios";
import { useAuth } from "../store/auth";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response, // ← success, do nothing
  (error) => {
    if (error.response?.status === 401) {
      console.log(error.response);
      if (error.response.statusText === "INVALID_TOKEN") {
        useAuth.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
