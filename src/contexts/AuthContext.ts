import React from "react";
import User from "../models/User";




interface AuthContextType {
  user: User | null;

  login: (user: User) => void;
  loginError: string | null;
  resetLoginError: () => void;
  loginLoading: boolean;

  register: (inscription: FormData) => void;
  registerError: string | null;
  resetRegisterError: () => void;

  logout: () => void;
  logoutError: string | null;
  resetLogoutError: () => void;
  logoutLoading: boolean;
}

const AuthContext =
  React.createContext<AuthContextType>(
    {} as AuthContextType
  );

export default AuthContext;
