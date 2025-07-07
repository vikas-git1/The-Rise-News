import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import ProtectedRoutes from "../context/ProtectedRoute";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/source/:source"
            element={<ProtectedRoutes>
              
            </ProtectedRoutes>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
