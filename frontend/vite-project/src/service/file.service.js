import { useMutation } from "@tanstack/react-query";
import axios from "axios";

 const uploadFile = (userData) => {
  console.log(userData);
  return axios.post("http://localhost:3000/api/fileuploading/", userData, {
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
