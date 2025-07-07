import React, { useState } from "react";
import { auth } from "../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      console.log("User LoggedIn successfully");
      navigate("/");
    } catch (error) {
      console.log("User Logging In falied: ", error.message);
    }
    // console.log("User Details: ", { userEmail, userPassword });
  };
  return (
    <div className="bg-orange-400 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Login
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter your email"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter a strong password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button className="text-orange-500 hover:underline font-medium">
            <Link to="/register"> Register</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
