import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "./api.service";

const uploadFile = (userData) => {
  console.log(userData);
  return api.post("/fileuploading/", userData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data", // ✅ tell backend its a file
    },
  });
};

export function useFileUpload() {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
