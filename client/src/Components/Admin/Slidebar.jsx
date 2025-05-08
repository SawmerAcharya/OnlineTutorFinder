// // // import React, { useState } from 'react';
// // // import { FiHome, FiUser, FiMessageSquare, FiBarChart2, FiSettings } from 'react-icons/fi';

// // // function Sidebar() {
// // //   // State to manage the active menu item
// // //   const [activeItem, setActiveItem] = useState('Dashboard');

// // //   // Function to handle clicking on a menu item
// // //   const handleMenuItemClick = (item) => {
// // //     setActiveItem(item);
// // //   };

// // //   return (
// // //     <div className="w-64 min-h-screen bg-white text-black flex flex-col">
// // //       <div className="px-5 py-4">
// // //         <h1 className="text-xl font-bold">TutorAdmin</h1>
// // //       </div>
// // //       <ul className="flex-grow">
// // //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// // //             onClick={() => handleMenuItemClick('Dashboard')}>
// // //           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
// // //         </li>
// // //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Users' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// // //             onClick={() => handleMenuItemClick('Users')}>
// // //           <FiUser className="mr-3" size={20} /> <span>Users</span>
// // //         </li>
// // //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Messages' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// // //             onClick={() => handleMenuItemClick('Messages')}>
// // //           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
// // //         </li>
// // //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Analytics' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// // //             onClick={() => handleMenuItemClick('Analytics')}>
// // //           <FiBarChart2 className="mr-3" size={20} /> <span>Tutors</span>
// // //         </li>
// // //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Settings' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// // //             onClick={() => handleMenuItemClick('Settings')}>
// // //           <FiSettings className="mr-3" size={20} /> <span>Settings</span>
// // //         </li>
// // //       </ul>
// // //       <div className="px-5 py-4 mt-auto">
// // //         <button className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200">
// // //           Logout
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Sidebar;



// // import React, { useState } from 'react';
// // import { FiHome, FiUser, FiMessageSquare, FiSettings } from 'react-icons/fi';
// // import { useNavigate } from 'react-router-dom'; 
// // import { HiOutlineUsers } from "react-icons/hi2";

// // function Sidebar() {
// //   // State to manage the active menu item
// //   const [activeItem, setActiveItem] = useState('Dashboard');
  
// //   const navigate = useNavigate();

// //   // Function to handle clicking on a menu item
// //   const handleMenuItemClick = (item) => {
// //     setActiveItem(item);
// //   };

// //   // Function to handle logout
// //   const handleLogout = () => {
    
// //     navigate('/login'); 
// //   };

// //   return (
// //     <div className="w-64 min-h-screen bg-white text-black flex flex-col">
// //       <div className="px-5 py-4">
// //         <h1 className="text-xl font-bold">TutorAdmin</h1>
// //       </div>
// //       <ul className="flex-grow">
// //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// //             onClick={() => handleMenuItemClick('Dashboard')}>
// //           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Users' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// //             onClick={() => handleMenuItemClick('Users')}>
// //           <FiUser className="mr-3" size={20} /> <span>Students</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Messages' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// //             onClick={() => handleMenuItemClick('Messages')}>
// //           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Analytics' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// //             onClick={() => handleMenuItemClick('Analytics')}>
// //           <HiOutlineUsers className="mr-3" size={20} /> <span>Tutors</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 ${activeItem === 'Settings' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
// //             onClick={() => handleMenuItemClick('Settings')}>
// //           <FiSettings className="mr-3" size={20} /> <span>Settings</span>
// //         </li>
// //       </ul>
// //       <div className="px-5 py-4 mt-auto">
// //         <button 
// //           onClick={handleLogout} 
// //           className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200">
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Sidebar;



// import React from 'react';
// import { FiHome, FiUser, FiMessageSquare, FiSettings } from 'react-icons/fi';
// import { HiOutlineUsers } from "react-icons/hi2";
// import { useNavigate, useLocation } from 'react-router-dom'; 

// function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation(); // Get current route

//   // Function to check if a menu item is active
//   const isActive = (path) => location.pathname === path ? 'bg-gray-100' : 'hover:bg-gray-100';

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="w-64 min-h-screen bg-white text-black flex flex-col">
//       <div className="px-5 py-4">
//         <h1 className="text-xl font-bold">TutorAdmin</h1>
//       </div>
//       <ul className="flex-grow">
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/')}`}
//             onClick={() => navigate('/admin')}>
//           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/students')}`}
//             onClick={() => navigate('/students')}>
//           <FiUser className="mr-3" size={20} /> <span>Students</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/messages')}`}
//             onClick={() => navigate('/messages')}>
//           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/tutors')}`}
//             onClick={() => navigate('/tutors')}>
//           <HiOutlineUsers className="mr-3" size={20} /> <span>Tutors</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/settings')}`}
//             onClick={() => navigate('/settings')}>
//           <FiSettings className="mr-3" size={20} /> <span>Settings</span>
//         </li>
//       </ul>
//       <div className="px-5 py-4 mt-auto">
//         <button 
//           onClick={handleLogout} 
//           className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
import React from "react";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Updated isActive function
  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-100 font-semibold text-blue-700"
      : "hover:bg-gray-100";

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-white text-black flex flex-col">
      <div className="px-5 py-4">
        <h1 className="text-xl font-bold">Tutor Finder Admin</h1>
      </div>

      <ul className="flex-grow">
        <li
          className={`flex items-center px-5 py-3 cursor-pointer ${isActive(
            "/"
          )}`}
          onClick={() => navigate("/admin")}
        >
          <FiHome className="mr-3" size={20} />
          <span>Dashboard</span>
        </li>

        <li
          className={`flex items-center px-5 py-3 cursor-pointer ${isActive(
            "/students"
          )}`}
          onClick={() => navigate("/students")}
        >
          <FiUser className="mr-3" size={20} />
          <span>Students</span>
        </li>

        <li
          className={`flex items-center px-5 py-3 cursor-pointer ${isActive(
            "/tutors"
          )}`}
          onClick={() => navigate("/tutors")}
        >
          <HiOutlineUsers className="mr-3" size={20} />
          <span>Tutors</span>
        </li>

        <li
          className={`flex items-center px-5 py-3 cursor-pointer ${isActive(
            "/withdrawalsreq"
          )}`}
          onClick={() => navigate("/withdrawalsreq")}
        >
          <FiSettings className="mr-3" size={20} />
          <span>Withdrawals Request</span>
        </li>
      </ul>

      <div className="px-5 py-4 mt-auto">
        <button
          onClick={handleLogout}
          className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;