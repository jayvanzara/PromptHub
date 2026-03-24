import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("user_id");
  if (!userId) return <Navigate to="/" replace />;
  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
};