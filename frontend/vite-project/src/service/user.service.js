import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
useNavigate;

export function userRegister(userData) {
  const navigate = useNavigate();
  const mutation = useMutation({
    onSuccess: (data) => {
      navigate("/login");
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
export async function getUserData() {
  try {
    const response = await axios.get("http://localhost:3000/api/users/", {
      withCredentials: true,
    });
    return response; // ✅ return just the data
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
}

export function userUpdate(userData) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: (userData) => {
      console.log(userData);
      const data = axios.patch("http://localhost:3000/api/users/", userData, {
        withCredentials: true,
      });
      return data;
    },
  });
  return mutation;
}
