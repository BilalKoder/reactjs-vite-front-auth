import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initialize authentication state from localStorage
    const token = localStorage.getItem("authToken");
    return !!token; // true if token exists, false otherwise
  });

  const loginUser = (token: string) => {
    // Save token to localStorage and update state
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Optionally validate token from localStorage when the app loads
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
