import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";




const useLogin = (onRegisterSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient();


    return useMutation<void, Error, void>({
      mutationFn: () =>
        apiClient.post<void>("logout").then((response) => response.data),
      onSuccess: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        onRegisterSuccess();
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        onError(error);
      }
    });
  };
  
  export default useLogin;