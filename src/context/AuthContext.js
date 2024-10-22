import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const emailFromLocalStorage = localStorage.getItem("email"); // Get email from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenFromLocalStorage);
  const [token, setToken] = useState(tokenFromLocalStorage); // Token state
  const [email, setEmail] = useState(emailFromLocalStorage); // Email state

  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email); // Store email in localStorage
    setIsAuthenticated(true);
    setToken(token); // Update token state on login
    setEmail(email); // Update email state on login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email"); // Clear email from localStorage
    setIsAuthenticated(false);
    setToken(null); // Clear token state on logout
    setEmail(null); // Clear email state on logout
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token, // Provide token in context
        email, // Provide email in context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
