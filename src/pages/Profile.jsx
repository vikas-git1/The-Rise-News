import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      console.log("User Logged out");
    } catch (error) {
      console.log("Error occurred in signing out:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-orange-300">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-orange-200 text-orange-700 w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow">
            {userProfile?.firstName?.[0]?.toUpperCase() || <FaUserCircle />}
          </div>
          <h2 className="text-xl font-bold text-orange-700">
            {userProfile?.firstName || "User"}
          </h2>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
