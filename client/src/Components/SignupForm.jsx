// import React, { useState } from "react";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
// import { Link } from "react-router-dom"; // Updated for navigation

// function SignupForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData); // Process form data here or send to an API
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded shadow-md">
//         <h2 className="text-lg text-center font-bold mb-6">Join TutorFinder</h2>
//         <p className="text-sm text-center mb-6">
//           Connect with expert tutors and start learning today
//         </p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex items-center border rounded p-2">
//             <FaUser className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-full focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center border rounded p-2">
//             <FaEnvelope className="text-gray-400 mr-2" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="w-full focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center border rounded p-2">
//             <FaLock className="text-gray-400 mr-2" />
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
//           >
//             Create Account
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-indigo-600 hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupForm;





import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Specific validation for each field
    if (!name && !email && !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!name) {
      toast.error("Full name is required.");
      return;
    }

    if (!email) {
      toast.error("Email address is required.");
      return;
    }

    if (!password) {
      toast.error("Password is required.");
      return;
    }

    try {
      console.log("Sending signup request to:", backendUrl);

      const { data } = await axios.post(`${backendUrl}/api/auth/register`, formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer /> {/* Toast notifications container */}
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-indigo-600 flex items-center justify-center">
          <p className="text-white text-xl font-bold">Join TutorFinder Today</p>
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
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
            >
              Sign Up
            </button>
          </form>

          {/* Footer Links */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

