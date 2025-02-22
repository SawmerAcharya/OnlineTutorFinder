// import React, { useEffect, useState, useContext, useRef } from "react";
// import { FiSearch, FiBell } from "react-icons/fi";
// import Avatar from "@mui/material/Avatar";
// import axios from "axios";
// import { AppContent } from "../context/AppContext";
// import DropdownMenu from "./DropdownMenu";

// function Nav() {
//   const { backendUrl, userData } = useContext(AppContent);
//   const [tutor, setTutor] = useState({ name: "Guest", subject: "N/A" });
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchTutor = async () => {
//       if (userData && userData.userId) {
//         try {
//           const response = await axios.get(`${backendUrl}/api/user/tutor/${userData.userId}`, {
//             withCredentials: true,
//           });
//           if (response.data && response.data.tutor) {
//             setTutor({
//               name: response.data.tutor.name || "Guest",
//               subject: response.data.tutor.tutorData.CurrentSubject || "N/A",
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching tutor data:", error);
//         }
//       }
//     };

//     fetchTutor();
//   }, [backendUrl, userData]);

//   return (
//     <div className="bg-white shadow px-4 py-2 flex justify-between items-center">
//       <div className="flex border-2 rounded overflow-hidden">
//         <input className="px-4 py-2 w-80 outline-none" type="search" placeholder="Search users..." />
//         <button className="flex items-center justify-center px-4 border-l"><FiSearch /></button>
//       </div>

//       <div className="flex items-center">
//         <button className="relative text-gray-600"><FiBell size={24} /></button>
//         <div className="relative ml-6" ref={dropdownRef}>
//           <div className="flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//             <Avatar src="/avatar.jpg" alt={tutor.name} className="w-10 h-10" />
//             <div className="ml-2">
//               <p className="text-sm font-semibold">{tutor.name}</p>
//               <p className="text-xs text-gray-500">{tutor.subject} Tutor</p>
//             </div>
//           </div>
//           {isDropdownOpen && <DropdownMenu />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Nav;





import React, { useEffect, useState, useContext, useRef } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import DropdownMenu from "../DropdownMenu";

function Nav() {
  const { backendUrl, userData } = useContext(AppContent); // Ensure userData contains user information (like userId)
  const [tutor, setTutor] = useState({ name: "Guest", subject: "N/A" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch tutor data when the component mounts
  useEffect(() => {
    const fetchTutor = async () => {
      if (userData && userData.userId) { // Make sure user is authenticated
        try {
          const response = await axios.get(`${backendUrl}/api/user/tutor/${userData.userId}`, {
            withCredentials: true,
          });

          console.log("API Response data:", response.data);

          if (response.data && response.data.tutor) {
            const tutorInfo = response.data.tutor; // Use the specific tutor for the logged-in user
            setTutor({
              name: tutorInfo.name || "Guest",
              subject: tutorInfo.tutorData.CurrentSubject || "N/A", // Use CurrentSubject from tutorData
            });
          } else {
            console.error("Error: Tutor info not found for the current user.");
          }
        } catch (error) {
          console.error("Error fetching tutor data:", error);
        }
      } else {
        console.error("User is not authenticated.");
      }
    };

    fetchTutor();
  }, [backendUrl, userData]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <div className="flex border-2 rounded overflow-hidden">
        <input
          className="px-4 py-2 w-80 outline-none"
          type="search"
          placeholder="Search users ..."
        />
        <button className="flex items-center justify-center px-4 border-l">
          <FiSearch />
        </button>
      </div>

      <div className="flex items-center">
        <button className="text-black-500 relative">
          <FiBell size={24} />
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            3
          </span>
        </button>

        {/* Avatar section with Dropdown on Click */}
        <div className="relative ml-8 mr-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="ml-2 text-left">
              <p className="text-sm font-semibold">{tutor.name}</p>
              <p className="text-xs text-gray-500">{tutor.subject} Tutor</p>
            </div>
            <div className="ml-4">
              <Avatar
                src="/path_to_avatar.jpg" // Add the real path to the avatar
                alt={tutor.name}
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Dropdown Menu with ref */}
          {isDropdownOpen && (
            <div ref={dropdownRef}>
              <DropdownMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
