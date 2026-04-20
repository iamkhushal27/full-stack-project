import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      return axios.post(
        `http://localhost:3000/api/users/category/${categoryId}/priority`,
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
    const response = await axios.get(
      `http://localhost:3000/api/users/category/${categoryId}/priority`,
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
      return axios.patch(
        `http://localhost:3000/api/users/category/${categoryId}/priority/${id}`,
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
      return axios.delete(
        `http://localhost:3000/api/users/category/${categoryId}/priority/${id}`,
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
