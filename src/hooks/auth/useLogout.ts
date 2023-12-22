import { useMutation } from "@tanstack/react-query";
import apiClient from "../../services/api-client";




const useLogin = (onRegisterSuccess: () => void) => {

    return useMutation<void, Error, void>({
      mutationFn: () =>
        apiClient.post<void>("logout").then((response) => response.data),
      onSuccess: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        onRegisterSuccess();
      }
    });
  };
  
  export default useLogin;