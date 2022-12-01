import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("curr");

  if (!token || !user || !token.startsWith("Bearer ")) {
    return <Navigate to={"/"} />;
  }
  return children;
}
