// import React, { useState } from 'react';
// import { FiHome, FiUser, FiMessageSquare } from 'react-icons/fi';
// import { BiDollar } from "react-icons/bi";
// import { RiCalendarScheduleLine } from "react-icons/ri";

// function SlideBars() {
//   // State to manage the active menu item
//   const [activeItem, setActiveItem] = useState('Dashboard');

//   // Function to handle clicking on a menu item
//   const handleMenuItemClick = (item) => {
//     setActiveItem(item);
//   };

//   return (
//     <div className="w-64 min-h-screen bg-white text-black flex flex-col">
//       <div className="px-5 py-4">
//         <h1 className="text-xl font-bold">TutorHub</h1>
//       </div>
//       <ul className="flex-grow">
//         <li className={`flex items-center px-5 py-3 ${activeItem === 'Dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
//             onClick={() => handleMenuItemClick('Dashboard')}>
//           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 ${activeItem === 'Users' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
//             onClick={() => handleMenuItemClick('Users')}>
//           <FiUser className="mr-3" size={20} /> <span>Students</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 ${activeItem === 'Messages' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
//             onClick={() => handleMenuItemClick('Messages')}>
//           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 ${activeItem === 'Analytics' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
//             onClick={() => handleMenuItemClick('Analytics')}>
//           <RiCalendarScheduleLine className="mr-3" size={20} /> <span>Schedules</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 ${activeItem === 'Settings' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
//             onClick={() => handleMenuItemClick('Settings')}>
//           <BiDollar className="mr-3" size={20} /> <span>Earning</span>
//         </li>
//       </ul>
//       <div className="px-5 py-4 mt-auto">
//         <button className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SlideBars;



import React from 'react';
import { FiHome, FiUser, FiMessageSquare, FiSettings } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';

function SlideBars() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if a menu item is active
  const isActive = (path) => location.pathname === path ? 'bg-gray-100' : 'hover:bg-gray-100';

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="w-64 min-h-screen bg-white text-black flex flex-col">
      <div className="px-5 py-4">
        <h1 className="text-xl font-bold">TutorHub</h1>
      </div>
      <ul className="flex-grow">
        <li className="flex items-center px-5 py-3 cursor-pointer bg-gray-100">
          <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
        </li>
        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/students')}`}
            onClick={() => navigate('/std')}>
          <FiUser className="mr-3" size={20} /> <span>Students</span>
        </li>
        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/messages')}`}
            onClick={() => navigate('/messages')}>
          <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
        </li>
        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/schedules')}`}
            onClick={() => navigate('/schedules')}>
          <RiCalendarScheduleLine className="mr-3" size={20} /> <span>Schedules</span>
        </li>
        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/earnings')}`}
            onClick={() => navigate('/earnings')}>
          <BiDollar className="mr-3" size={20} /> <span>Earnings</span>
        </li>
        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/settings')}`}
            onClick={() => navigate('//tutor/Setting/:tutorId')}>
          <FiSettings className="mr-3" size={20} /> <span>Settings</span>
        </li>
      </ul>
      <div className="px-5 py-4 mt-auto">
        <button 
          onClick={handleLogout} 
          className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SlideBars;
