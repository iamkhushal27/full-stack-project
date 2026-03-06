import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function userRegister(userData) {
  const mutation = useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: (userData) => {
        console.log(userData)
      return axios.post("http://localhost:3000/api/users/register", userData);
    },
  });
  return mutation;
}


