import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import api from "./api.service";
useNavigate;

export function userRegister() {
  const navigate = useNavigate();
  const mutation = useMutation({
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: ({ idempotencyKey, ...data }) => {
      return api.post("/users/register", data, {
        headers: {
          Idempotency_Key: idempotencyKey, // ← send as header
        },
      });
    },
  });
  return mutation;
}
export async function getUserData() {
  try {
    const response = await api.get("/users/", {
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
      const data = api.patch("/users/", userData, {
        withCredentials: true,
      });
      return data;
    },
  });
  return mutation;
}
