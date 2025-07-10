import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import ProtectedRoutes from "../auth/ProtectedRoute";
import NewsSource from "../pages/NewsSource";
import TopNews from "../components/TopNews";
import SearchNews from "../pages/SearchNews";
import Profile from "../pages/Profile";
import CategorySection from "../components/CategorySection";
import CategoryNews from "../pages/CategoryNews";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <CategorySection />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopNews /> <Home />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/source/:source"
            element={
              <ProtectedRoutes>
                <NewsSource />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/search/:query"
            element={
              <ProtectedRoutes>
                <SearchNews />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoutes>
                <CategoryNews />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
