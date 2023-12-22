import { useMutation } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Inscription from "../../models/Inscription";









const useRegister = (onRegisterSuccess: () => void) => {

    return useMutation<Inscription, Error, Inscription>({
      mutationFn: (inscription: Inscription) => apiClient
                            .post<Inscription>("/inscriptions", inscription)
                            .then((response) => response.data),
      onSuccess: () => {
        onRegisterSuccess();
      },
    });
  };
  
  export default useRegister;