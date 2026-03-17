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
      return axios.post("http://localhost:3000/api/users/register", userData);
    },
  });
  return mutation;
}
export function getUserData(params) {
  const data = axios.get("http://localhost:3000/api/users/", {
    withCredentials: true,
  });

  return data;
}

export function userUpdate(userData) {
  const mutation = useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: (userData) => {
      console.log(userData);
      const data = axios.patch("http://localhost:3000/api/users/", userData, {
        withCredentials: true,
      });
    },
  });
  return mutation;
}
