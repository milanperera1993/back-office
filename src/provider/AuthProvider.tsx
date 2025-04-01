import React, { useState, useEffect } from "react";
import { AuthContext, AuthContextType, User } from "./util";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  /**
   * Function to log out the user.
   * sets the current user to null and removes the user from localStorage.
   */
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  }

  /**
   * Function to log in the user.
   * sets the current user, saves the user to localStorage and navigates to the product page.
   * @param user - User object to set as the current user.
   */
  const loginUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/product", { replace: true });
  };

  const value: AuthContextType = {
    currentUser,
    loginUser,
    logoutUser
  };

  // Load user from localStorage when the component mounts.
  // Added an additional loading state to handle the initial loading state.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    setLoading(false);
  }, []);

  //TODO: handle loading properly
  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;