import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "./api.service";

export function statusCreate() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["statuses", String(variables.parentId)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: ({ parentId: categoryId, ...data }) => {
      return api.post(
        `http://localhost:3000/api/categories/${categoryId}/status`,
        data,
        {
          withCredentials: true,
        }
      );
    },
  });
  return mutation;
}

export async function getStatuses(categoryId) {
  try {
    const response = await api.get(
      `http://localhost:3000/api/categories/${categoryId}/status`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
}

export function editStatus() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["statuses", String(variables.parentId)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: ({ id, parentId: categoryId, ...data }) => {
      return api.patch(
        `http://localhost:3000/api/categories/${categoryId}/status/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
    },
  });
  return mutation;
}

export function deleteStatus() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, parentId: categoryId }) => {
      return api.delete(
        `http://localhost:3000/api/categories/${categoryId}/status/${id}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["statuses", String(variables.parentId)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}
