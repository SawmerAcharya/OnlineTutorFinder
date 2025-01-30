import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import img from "../Images/learningphoto2.jpg";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContent); // Include setUserData to save user info

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedin(true); // Set login state
        setUserData(data.user); // Store user data
        toast.success("Login successful!");
        navigate("/"); // Redirect to the dashboard or home
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer /> {/* Toast notifications container */}
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2">
          <img
            src={img}
            alt="Tutor Finder"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome</h2>
          <p className="text-sm text-center text-gray-600 mb-8">
            Find your perfect tutor today
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/ResetPassword"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
            >
              Sign in
            </button>
          </form>

          {/* Footer Links */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/SignupForm" className="text-indigo-600 hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
