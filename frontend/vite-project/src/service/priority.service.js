import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "./api.service";

export function priorityCreate() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["priorities", String(variables.parentId)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: ({ parentId: categoryId, ...data }) => {
      return api.post(
        `http://localhost:3000/api/categories/${categoryId}/priority`,
        data,
        {
          withCredentials: true,
        }
      );
    },
  });
  return mutation;
}

export async function getPriorities(categoryId) {
  try {
    const response = await api.get(
      `http://localhost:3000/api/categories/${categoryId}/priority`,
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

export function editPriority() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["priorities", String(variables.parentId)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: ({ id, parentId: categoryId, ...data }) => {
      return api.patch(
        `http://localhost:3000/api/categories/${categoryId}/priority/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
    },
  });
  return mutation;
}

export function deletePriority() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, parentId: categoryId }) => {
      return api.delete(
        `http://localhost:3000/api/categories/${categoryId}/priority/${id}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["priorities", String(variables.parentId)], // ✅
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}
