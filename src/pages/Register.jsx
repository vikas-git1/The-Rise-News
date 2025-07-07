import React, { useState } from "react";
import { auth, db } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* user is registered in the firebase using auth, where userEmail and userPassword are registered */
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const user = userCredentials.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: userName,
          lastName: userLastName,
        });
      }
      navigate("/");
      // console.log("User Registered and details stored  successfully ", user);
    } catch (error) {
      console.log("Error occured in Registration: ", error.message);
    }
    // console.log("Registered User Details: ", {
    //   userName,
    //   userLastName,
    //   userEmail,
    //   userPassword,
    // });
  };
  return (
    <div className="bg-orange-400 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Create Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter your first name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter your last name"
              onChange={(e) => setUserLastName(e.target.value)}
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button className="text-orange-500 hover:underline font-medium">
            <Link to="/login"> Login</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
