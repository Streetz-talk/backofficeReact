import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!tokenFromLocalStorage
  );
  const [token, setToken] = useState(tokenFromLocalStorage); // Add token state

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setToken(token); // Update token state on login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null); // Clear token state on logout
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token, // Provide token in context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
