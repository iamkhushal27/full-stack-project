import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function userLogin(userData) {
  const navigate = useNavigate();

  const mutation = useMutation({
    onSuccess: () => {
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
