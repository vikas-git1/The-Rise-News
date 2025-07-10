import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-orange-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-600 max-w-md mb-6">
        Oops! The page you’re looking for doesn’t exist. It might have been
        removed, renamed, or never existed.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
