import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

import User from "../models/User";
import useRegister from "../hooks/auth/useRegister";
import useLogin from "../hooks/auth/useLogin";
import useLogout from "../hooks/auth/useLogout";
import Inscription from "../models/Inscription";


interface Props {
  children: ReactNode;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}




const AuthProvider = ({ children, onLogin, onRegister, onLogout }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const { mutate: mutateRegister } = useRegister(() => {

  });
  const { mutate: mutateLogin } = useLogin((user) => {
    setUser(user);
  });

  const { mutate: mutateLogout } = useLogout(() => {
    setUser(null);
  });

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

  const register = (inscriptions: Inscription) => {
    mutateRegister(inscriptions);
    onRegister();
  };

  const logout = () => {
    mutateLogout();
    onLogout();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
