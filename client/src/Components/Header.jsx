
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import BalanceComponent from "./BalanceComponent";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const [localUserData, setLocalUserData] = useState(null);

  // Load user data from localStorage if available
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  // Redirect only if user is missing role (e.g., after signup)
  useEffect(() => {
    setLocalUserData(userData);
    if (userData && userData.role == null && location.pathname !== "/form") {
      navigate("/form");
    }
  }, [userData, navigate, location.pathname]);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("userData");
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const goTo = (path) => navigate(path);

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-blue-500">Tutors</span>
        <span className="text-yellow-500">Finder</span>
      </div>

      <div className="flex gap-2 items-center relative group">
        {localUserData && localUserData.name ? (
          <>
            <BalanceComponent />
            <div className="flex items-center space-x-3">
              {localUserData.profile ? (
                <img
                  src={`https://utfs.io/f/${localUserData.profile}`}
                  alt={localUserData.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white font-bold text-lg rounded-full">
                  {localUserData.name[0].toUpperCase()}
                </div>
              )}

              {/* Dropdown */}
              <div className="absolute hidden group-hover:block top-full right-0 z-10 text-black bg-gray-100 rounded shadow-md">
                <ul className="list-none m-0 p-2 text-sm">
                  <li
                    className="py-1 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => goTo("/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="py-1 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => goTo("/chat")}
                  >
                    Inbox
                  </li>
                  <li
                    className="py-1 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => goTo(`/assigned/${localUserData._id}`)}
                  >
                    Assignments
                  </li>
                  <li
                    className="py-1 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
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
