// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUserId } from "../utils/userUtils";

const ProtectedRoute = ({ children }) => {
  const userId = getCurrentUserId();
  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
