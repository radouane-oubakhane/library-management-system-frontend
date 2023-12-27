import { useMutation } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Inscription from "../../models/Inscription";

const useRegister = (onRegisterSuccess: () => void) => {
  return useMutation<Inscription, Error, FormData>({
    mutationFn: (inscription: FormData) =>
      apiClient
        .post<FormData>("/inscriptions", inscription, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
    onSuccess: () => {
      onRegisterSuccess();
    },
  });
};

export default useRegister;
