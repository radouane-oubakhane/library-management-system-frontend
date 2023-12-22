import { useMutation } from "@tanstack/react-query";
import apiClient from "../../services/api-client";




const useLogin = (onRegisterSuccess: () => void, onError: (error: Error) => void) => {

    return useMutation<void, Error, void>({
      mutationFn: () =>
        apiClient.post<void>("logout").then((response) => response.data),
      onSuccess: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        onRegisterSuccess();
      },
      onError: (error) => {
        onError(error);
      }
    });
  };
  
  export default useLogin;