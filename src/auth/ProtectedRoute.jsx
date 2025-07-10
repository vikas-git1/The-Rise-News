import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user === undefined) return null;
  return user ? children : navigate("/login");
};

export default ProtectedRoutes;
