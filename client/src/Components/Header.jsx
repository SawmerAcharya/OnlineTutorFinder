import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const [localUserData, setLocalUserData] = useState(null); // Track local state for user data

  useEffect(() => {
    
    setLocalUserData(userData); // Update local state when userData changes
    if(userData){
      if(userData.role == null){
        navigate("/form")
      }
      //console.log("userData",userData)
    }
  }, [userData]);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">
        <span className="text-blue-500">Tutors</span>
        <span className="text-yellow-500">Finder</span>
      </div>

      {/* Conditional Rendering */}
      <div className="flex items-center relative group">
        {localUserData && localUserData.name ? (
          // Display user initial and dropdown menu
          <div className="flex items-center">
            <div className="mr-4 text-blue-600 font-medium bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center group cursor-pointer">
              {localUserData.name[0].toUpperCase()} {/* Display first letter of the user's name */}
            </div>

            {/* Dropdown menu */}
            <div className="absolute hidden group-hover:block top-full right-0 z-10 text-black rounded bg-gray-100 shadow-md">
              <ul className="list-none m-0 p-2 text-sm">
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
          // Display login button
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
