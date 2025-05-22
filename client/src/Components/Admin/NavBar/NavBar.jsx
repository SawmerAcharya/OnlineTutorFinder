// import React, { useState, useEffect, useRef } from "react";
// import { FiSearch, FiBell } from "react-icons/fi";
// import Avatar from "@mui/material/Avatar";
// import DropdownMenu from "../../DropdownMenu";

// function NavBar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="bg-white shadow px-4 py-2 flex justify-between items-center w-full">
//       {/* Search Bar */}
//       <div className="flex border-2 rounded overflow-hidden">
//         <input
//           className="px-4 py-2 w-80 outline-none"
//           type="search"
//           placeholder="Search users, tutors, ...."
//         />
//         <button className="flex items-center justify-center px-4 border-l">
//           <FiSearch />
//         </button>
//       </div>

//       {/* Notification Bell & User Avatar */}
//       <div className="flex items-center relative">
//         <button className="text-black-500 relative">
//           <FiBell size={24} />
//           <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
//             3
//           </span>
//         </button>

//         {/* Avatar & Dropdown */}
//         <div className="relative ml-8">
//           <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
//             <Avatar className="w-10 h-10" />
//           </div>

//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 z-50">
//               <DropdownMenu />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBar;




import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
import DropdownMenu from "../../DropdownMenu";

function NavBar({ setSearchTerm  }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log("setSearchTerm in NavBar:", setSearchTerm);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow px-4 py-2 flex justify-between items-center w-full">
      {/* Search Bar */}
      <div className="flex border-2 rounded overflow-hidden">
      <input
  className="px-4 py-2 w-80 outline-none"
  type="search"
  placeholder="Search users, tutors, ...."
  onChange={(e) => {
    console.log("Search input changed:", e.target.value); // ✅ Log input value
    setSearchTerm(e.target.value.toLowerCase());
  }}
/>


        <button className="flex items-center justify-center px-4 border-l">
          <FiSearch />
        </button>
      </div>

      {/* Notification Bell & User Avatar */}
      <div className="flex items-center relative">
        

        {/* Avatar & Dropdown */}
        <div className="relative ml-8">
          <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
            <Avatar className="w-10 h-10" />
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default NavBar;
