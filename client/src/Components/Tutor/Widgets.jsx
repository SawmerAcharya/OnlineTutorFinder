import React from "react";
import { FaRegClock, FaStar } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";

function Widgets() {
  return (
    // Adjust the padding top to position it just below the nav bar style={{ minHeight: 'calc(30vh - 50px)' }}
    <div className="pt-4 px-8 bg-gray-100" > {/* Assuming nav bar height is 50px */}
      <div className="grid grid-cols-4 gap-10 max-w-screen-xl mx-auto"> {/* Center content horizontally */}
        {/* Teaching Hours */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
          <FaRegClock className="text-blue-500 text-3xl" />
          <p className="text-xl font-bold">124h</p>
          <p className="text-sm text-gray-500">Teaching Hours</p>
          <p className="text-xs text-green-500">+12%</p>
        </div>

        {/* Total Students */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
          <BiUser className="text-green-500 text-3xl" />
          <p className="text-xl font-bold">38</p>
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-xs text-green-500">+3%</p>
        </div>

        {/* Rating */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
          <FaStar className="text-yellow-500 text-3xl" />
          <p className="text-xl font-bold">4.9</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
          <AiOutlineDollarCircle className="text-purple-500 text-3xl" />
          <p className="text-xl font-bold">$3,450</p>
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-xs text-green-500">+8%</p>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
