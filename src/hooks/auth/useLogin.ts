import { useMutation } from "@tanstack/react-query";
import User from "../../models/User";
import apiClient from "../../services/api-client";



interface LoginResponse {
    user: User;
    access_token: string;
}



const useLogin = (onRegisterSuccess: (user: User) => void, onError: (error: Error) => void) => {

    return useMutation<LoginResponse, Error, User>({
      mutationFn: (user: User) =>
        apiClient.post<LoginResponse>("/login", user).then((response) => response.data),
      onSuccess: (user) => {
        localStorage.setItem("access_token", user.access_token); 
        localStorage.setItem("user", JSON.stringify(user.user));
        onRegisterSuccess(user.user);
      },
      onError: (error) => {
        onError(error);
      }
    });
  };
  
  export default useLogin;