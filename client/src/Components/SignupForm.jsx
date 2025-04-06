import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../Images/learningphoto2.jpg";

const SignupForm = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // if (!name || !email || !password) {
    //   console.log("Cant be empty");
    //   toast.error("All fields are required.");
    //   return;
    // }

    const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name.match(nameRegex)) {
      toast.error(
        "Name must be at least 3 characters and contain only letters and spaces."
      );
      return;
    }
    if (!email.match(emailRegex)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password.match(passwordRegex)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Account created! Verify your email.");
        navigate("/verify-email", { state: { email } }); // Redirect to email verification with email
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  // Function to handle Google Signup
  const handleGoogleSignup = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2">
          <img
            src={img}
            alt="Tutor Finder"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
          <p className="text-sm text-center text-gray-600 mb-8">
            Create your account to connect with expert tutors
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
            >
              Sign Up
            </button>

            {/* <button
              type="button"
              className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-400 focus:outline-none focus:bg-red-600 mt-2"
              onClick={handleGoogleSignup}
            >
              Sign Up with Google
            </button> */}
          </form>

          {/* Footer Links */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>

          <div className="flex flex-col items-center w-full mt-6">
            <div className="relative w-full flex items-center justify-center mb-4">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-2 text-gray-500 text-sm">
                OR
              </span>
            </div>

            {/* Google Sign-In Button */}
            <button
            type="button"
              onClick={handleGoogleSignup}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full justify-center hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
