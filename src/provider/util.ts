import { createContext } from "react";

export interface User {
  email: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;

}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loginUser: () => {},
  logoutUser: () => {},
});
