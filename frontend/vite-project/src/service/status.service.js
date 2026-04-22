import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      return axios.post(
        `http://localhost:3000/api/users/category/${categoryId}/status`,
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
    const response = await axios.get(
      `http://localhost:3000/api/users/category/${categoryId}/status`,
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
      return axios.patch(
        `http://localhost:3000/api/users/category/${categoryId}/status/${id}`,
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
      return axios.delete(
        `http://localhost:3000/api/users/category/${categoryId}/status/${id}`,
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
