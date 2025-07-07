import React, { useContext } from "react";
import "./App.css";
import AppRoutes from "./router/AppRoutes";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
function App() {
  const { user, userProfile } = useAuth();
  console.log("User Details: ", userProfile);

  return <AppRoutes />;
}

export default App;
