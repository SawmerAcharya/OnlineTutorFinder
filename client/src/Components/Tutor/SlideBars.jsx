import React, { useState } from 'react';
import { FiHome, FiUser, FiMessageSquare } from 'react-icons/fi';
import { BiDollar } from "react-icons/bi";
import { RiCalendarScheduleLine } from "react-icons/ri";

function SlideBars() {
  // State to manage the active menu item
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Function to handle clicking on a menu item
  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="w-64 min-h-screen bg-white text-black flex flex-col">
      <div className="px-5 py-4">
        <h1 className="text-xl font-bold">TutorHub</h1>
      </div>
      <ul className="flex-grow">
        <li className={`flex items-center px-5 py-3 ${activeItem === 'Dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
            onClick={() => handleMenuItemClick('Dashboard')}>
          <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
        </li>
        <li className={`flex items-center px-5 py-3 ${activeItem === 'Users' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
            onClick={() => handleMenuItemClick('Users')}>
          <FiUser className="mr-3" size={20} /> <span>Students</span>
        </li>
        <li className={`flex items-center px-5 py-3 ${activeItem === 'Messages' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
            onClick={() => handleMenuItemClick('Messages')}>
          <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
        </li>
        <li className={`flex items-center px-5 py-3 ${activeItem === 'Analytics' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
            onClick={() => handleMenuItemClick('Analytics')}>
          <RiCalendarScheduleLine className="mr-3" size={20} /> <span>Schedules</span>
        </li>
        <li className={`flex items-center px-5 py-3 ${activeItem === 'Settings' ? 'bg-gray-100' : 'hover:bg-gray-100'} cursor-pointer`}
            onClick={() => handleMenuItemClick('Settings')}>
          <BiDollar className="mr-3" size={20} /> <span>Earning</span>
        </li>
      </ul>
      <div className="px-5 py-4 mt-auto">
        <button className="py-3 px-4 w-full bg-blue-800 rounded-lg text-sm text-white hover:bg-blue-900 transition-colors duration-200">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SlideBars;
