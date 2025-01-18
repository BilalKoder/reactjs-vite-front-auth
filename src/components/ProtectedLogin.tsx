// import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-util";
import LoginPage from "@/pages/LoginPage.tsx";


const ProtectedLogin = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage />;
};

export default ProtectedLogin;
