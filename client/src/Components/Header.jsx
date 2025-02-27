import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const [localUserData, setLocalUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  useEffect(() => {
    setLocalUserData(userData);

    if (userData) {
      if (userData.role == null) {
        navigate("/form");
      } else {
        navigate("/"); // For non-tutor users
      }
    }
  }, [userData, navigate]);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("userData");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo Section */}
      <div className="text-2xl font-extrabold text-blue-600 flex items-center">
      <span className="text-yellow-500">Online</span>
        <span className="text-green-500">Tutors</span>
        <span className="text-blue-500">Finder</span>
      </div>

      {/* Navigation/Right section */}
      <div className="flex items-center space-x-6">
        {/* User Dropdown Section */}
        {localUserData && localUserData.name ? (
          <div className="relative group">
            {/* User Initial Circle */}
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-10 h-10 text-lg font-semibold cursor-pointer group-hover:bg-blue-700 transition duration-200">
              {localUserData.name[0].toUpperCase()}
            </div>

            {/* Dropdown Menu */}
            <div className="absolute hidden group-hover:block top-full right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
              <ul className="list-none m-0 p-2 text-sm">
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Login Button
          <Link to="/login">
            <Button
              variant="contained"
              color="primary"
              className="px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
            >
              Log in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
