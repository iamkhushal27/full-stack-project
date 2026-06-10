import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formatDateOnly } from "../utils/date";
import { useFilter } from "../store/filter";
import api from "./api.service";

export function todoCreate() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      const formattedDate = data?.date ? formatDateOnly(data.date) : undefined;
      const todoData = api.post(
        "/todos/",
        {
          ...data,
          date: formattedDate,
        },
        {
          withCredentials: true,
        },
      );
      return todoData;
    },
    onSuccess: (data) => {
      const selectedDate = useFilter.getState().selectedDate;
      queryClient.invalidateQueries({
        queryKey: ["todos", formatDateOnly(selectedDate)], // ✅
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
}
export async function getTodos(date) {
  try {
    const formattedDate = date ? formatDateOnly(date) : undefined;
    const response = await api.get(`/todos/`, {
      params: formattedDate ? { date: formattedDate } : undefined,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
}
export function deleteTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`/todos/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: (_, todoId) => {
      const selectedDate = useFilter.getState().selectedDate;
      queryClient.invalidateQueries({
        queryKey: ["todos", formatDateOnly(selectedDate)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}
export function updateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return api.patch(`/todos/${data.id}`, data, {
        withCredentials: true,
      });
    },
    onSuccess: (_, todoId) => {
      const selectedDate = useFilter.getState().selectedDate;
      queryClient.invalidateQueries({
        queryKey: ["todos", formatDateOnly(selectedDate)],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}
