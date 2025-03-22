// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   IoMailOutline,
//   IoLockClosedOutline,
//   IoEyeOutline,
//   IoEyeOffOutline,
// } from "react-icons/io5";
// import img from "../Images/learningphoto2.jpg";
// import { AppContent } from "../Context/AppContex";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContent);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/auth/login`,
//         { email, password },
//         { withCredentials: true }
//       );

//       if (data.success) {
//         setIsLoggedin(true);
//         setUserData(data.user);
//         toast.success("Login successful!");

//         if (data.user.isAdmin) {
//           navigate("/admin"); // Redirect to admin page
//           return;
//         }
//         if (data.user.role==="student"){
//           navigate("/Userdashboard");
//           return;
//         }

//         if (data.user.role === "tutor" && data.user.tutorData) {
//           const tutorStatus = data.user.tutorData.status;

//           if (tutorStatus === "approved") {
//             navigate("/tutor");
//           } else if (tutorStatus === "pending") {
//             navigate("/Pending");
//           } else if (tutorStatus === "rejected") {
//             navigate("/Rejected");
//           }
//           return;
//         }

//         navigate("/"); // Default redirection to home
//       } else {
//         toast.error(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="w-1/2">
//           <img src={img} alt="Tutor Finder" className="object-cover h-full w-full" />
//         </div>
//         <div className="p-8 w-1/2">
//           <h2 className="text-2xl font-semibold text-center mb-6">Welcome</h2>
//           <p className="text-sm text-center text-gray-600 mb-8">
//             Find your perfect tutor today
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <div className="relative">
//                 <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <div className="relative">
//                 <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 {showPassword ? (
//                   <IoEyeOffOutline
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
//                     onClick={togglePasswordVisibility}
//                   />
//                 ) : (
//                   <IoEyeOutline
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
//                     onClick={togglePasswordVisibility}
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <Link to="/ResetPassword" className="text-sm text-indigo-600 hover:underline">
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
//             >
//               Sign in
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/SignupForm" className="text-indigo-600 hover:underline">
//               Sign up now
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
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

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContent);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true } // ✅ Ensure cookies are sent
      );

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
        localStorage.setItem("token", data.accessToken); // ✅ Store token

        // ✅ Attach token to Axios for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

        toast.success("Login successful!");

        // ✅ Ensure proper redirection based on role
        setTimeout(() => {
          if (data.user.isAdmin) {
            navigate("/admin");
          } else if (data.user.role === "student") {
            navigate("/Userdashboard");
          } else if (data.user.role === "tutor" && data.user.tutorData) {
            const tutorStatus = data.user.tutorData.status;
            if (tutorStatus === "approved") {
              navigate("/tutor");
            } else if (tutorStatus === "pending") {
              navigate("/Pending");
            } else if (tutorStatus === "rejected") {
              navigate("/Rejected");
            }
          } else {
            navigate("/"); // Default home redirection
          }
        }, 500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // ✅ Fetch User Data After Login
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Access token missing. Please log in again.");
      }

      const { data } = await axios.get(`${backendUrl}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Session expired. Please log in again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2">
          <img src={img} alt="Tutor Finder" className="object-cover h-full w-full" />
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome</h2>
          <p className="text-sm text-center text-gray-600 mb-8">
            Find your perfect tutor today
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
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

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
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
              <Link to="/ResetPassword" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
            >
              Sign in
            </button>
          </form>

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
