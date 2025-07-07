import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return user ? children : navigate("/login");
};

export default ProtectedRoutes;
