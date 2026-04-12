import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export function userLogin(userData) {
  const userUpdate = useAuth((state) => state.updateUser);
  const tokenUpdate = useAuth((state) => state.updateToken);

  const navigate = useNavigate();

  const mutation = useMutation({
    onSuccess: (data) => {
      userUpdate(data.data.data);
      tokenUpdate(data.data.token);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: (userData) => {
      console.log(userData);
      return axios.post("http://localhost:3000/api/users/login", userData, {
        withCredentials: true, // <-- important
      });
    },
  });
  return mutation;
}
