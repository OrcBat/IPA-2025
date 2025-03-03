import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  console.log(user);

  return user.username ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
