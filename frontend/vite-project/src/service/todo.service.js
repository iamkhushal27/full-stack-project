import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function todoCreate() {
  const mutation = useMutation({
    mutationFn: (data) => {
      const todoData = axios.post("http://localhost:3000/api/todo/", data, {
        withCredentials: true,
      });
      console.log(todoData);
      return todoData;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
}
