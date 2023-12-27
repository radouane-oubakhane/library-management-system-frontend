import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

import User from "../models/User";
import useRegister from "../hooks/auth/useRegister";
import useLogin from "../hooks/auth/useLogin";
import useLogout from "../hooks/auth/useLogout";


interface Props {
  children: ReactNode;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}




const AuthProvider = ({ children, onLogin, onRegister, onLogout }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [logoutError, setLogoutError] = useState<string>("");

  const { mutate: mutateRegister } = useRegister(() => {

  });
  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useLogin((user: User) => {
    setUser(user);
  },
    (error) => {
      setLoginError(error.message);
    }
  );

  const { mutate: mutateLogout, isLoading: isLoadingLogout } = useLogout(() => {
    setUser(null);
  },
  (error) => {
    setLogoutError(error.message);
  }
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  


 
  const login = (user: User) => {
    mutateLogin(user);
    onLogin();
  };

  const resetLoginError = () => {
    setLoginError("");
  }



  const register = (inscriptions: FormData) => {
    mutateRegister(inscriptions);
    onRegister();
  };

  const resetRegisterError = () => {
    setRegisterError("");
  }




  const logout = () => {
    mutateLogout();
    onLogout();
  }

  const resetLogoutError = () => {
    setLogoutError("");
  }



  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginError,
        resetLoginError,
        loginLoading: isLoadingLogin,

        register,
        registerError,
        resetRegisterError,

        logout,
        logoutError,
        resetLogoutError,
        logoutLoading: isLoadingLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
