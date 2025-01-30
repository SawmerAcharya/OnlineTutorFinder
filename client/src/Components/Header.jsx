import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

      if (data.success) {
        toast.success(data.message);
        navigate("/verify-email"); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white-300 p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">
        <span className="text-black">Online</span>
        <span className="text-black">Tutors</span>
        <span className="text-black">Finder</span>
      </div>

      {/* Conditional Rendering */}
      <div className="flex items-center relative group">
        {userData && userData.name ? (
          <div className="flex items-center">
            {/* User Initial */}
            <div className="mr-4 text-blue-600 font-medium bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
              {userData.name[0].toUpperCase()}
            </div>

            {/* Dropdown menu */}
            <div className="absolute hidden group-hover:block top-full right-0 z-10 text-black rounded bg-gray-100 shadow-md">
              <ul className="list-none m-0 p-2 text-sm">
                {!userData.isAccountVerified && (
                  <li
                    className="py-1 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={sendVerificationOtp}
                  >
                    Verify Email
                  </li>
                )}
                <li
                  className="py-1 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="text" color="primary">
              Log in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
