import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import img from "../Images/learningphoto2.jpg";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContent); // Include setUserData to save user info
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login request sent");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login Response:", data);

      if (data.success) {
        setIsLoggedin(true); // Set login state
        setUserData(data.user); // Store user data
        localStorage.setItem("token", data.token); // ✅ Store token in localStorage
        console.log("Saved Token:", data.token); // Debugging log
        toast.success("Login successful!");

        console.log("Is Admin:", data.user.isAdmin);

        if (data.user.isAdmin) {
          window.location.href = "/admin";
          return;
        }

        if (data.user.role === "tutor") {
          // Check the tutor's status (approved, pending, or rejected)
          const tutorStatus = data.user.tutorData.status;

          if (tutorStatus === "approved") {
            navigate("/tutor"); // Redirect to tutor's page if approved
          } else if (tutorStatus === "pending") {
            navigate("/Pending"); // Redirect to pending status page
          } else if (tutorStatus === "rejected") {
            navigate("/Rejected"); // Redirect to rejected status page
          }
          // Redirect to admin page
        } else {
          window.location.href = "/"; // Redirect to the dashboard or home
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  // Function to handle Google Signup
  const handleGoogleSignup = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <ToastContainer /> Toast notifications container */}
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
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                {showPassword ? (
                  <IoEyeOffOutline
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <IoEyeOutline
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
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

          <div className="flex flex-col items-center w-full mt-6">
            <div className="relative w-full flex items-center justify-center mb-4">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-2 text-gray-500 text-sm">
                OR
              </span>
            </div>

            
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full justify-center hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-gray-700 font-medium">
                Login with Google
              </span>
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Login;
