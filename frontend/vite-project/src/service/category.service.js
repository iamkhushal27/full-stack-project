import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function categoryCreate() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // ✅ refetches categories
      console.log(data);
    },
    onError: (error) => {
      console.log(error.response.data);         // ✅ clean — no http:// links
      console.log(error.response.data.errors);
    },
    mutationFn: (data) => {
      return axios.post("http://localhost:3000/api/categories/", data, {
        withCredentials: true,
      });
    },
  });
  return mutation;
}
export async function getCategories() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/categories/",
      {
        withCredentials: true,
      }
    );
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
      return axios.patch(
        `http://localhost:3000/api/categories/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
    },
  });
  return mutation;
}
export function deleteCategory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/categories/${id}`, {
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
