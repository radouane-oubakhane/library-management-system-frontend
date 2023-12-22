import React from "react";
import User from "../models/User";
import Inscription from "../models/Inscription";




interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  register: (inscription: Inscription) => void;
  logout: () => void;
}

const AuthContext =
  React.createContext<AuthContextType>(
    {} as AuthContextType
  );

export default AuthContext;
