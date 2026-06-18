import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "./api.service";

export function categoryCreate() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // ✅ refetches categories
      console.log(data);
    },
    onError: (error) => {
      console.log(error.response.data); // ✅ clean — no http:// links
      console.log(error.response.data.errors);
    },
    mutationFn: (data) => {
      return api.post("/categories/", data, {
        withCredentials: true,
      });
    },
  });
  return mutation;
}
export async function getCategories() {
  try {
    const response = await api.get("/categories/", {
      withCredentials: true,
    });
    return response.data; // ✅ return just the data
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
}
export function EditCategroy() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // ✅ refetches categories
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: ({ id, ...data }) => {
      console.log(data, id);
      return api.patch(`/categories/${id}`, data, {
        withCredentials: true,
      });
    },
  });
  return mutation;
}
export function deleteCategory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`/categories/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // ✅ refetch after delete
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}
