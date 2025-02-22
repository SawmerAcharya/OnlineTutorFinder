// import React from "react";
// import { FaRegClock, FaStar } from "react-icons/fa";
// import { BiUser } from "react-icons/bi";
// import { AiOutlineDollarCircle } from "react-icons/ai";

// function Widgets() {
//   return (
//     // Adjust the padding top to position it just below the nav bar style={{ minHeight: 'calc(30vh - 50px)' }}
//     <div className="pt-4 px-8 bg-gray-100" > {/* Assuming nav bar height is 50px */}
//       <div className="grid grid-cols-4 gap-10 max-w-screen-xl mx-auto"> {/* Center content horizontally */}
//         {/* Teaching Hours */}
//         <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
//           <FaRegClock className="text-blue-500 text-3xl" />
//           <p className="text-xl font-bold">124h</p>
//           <p className="text-sm text-gray-500">Teaching Hours</p>
//           <p className="text-xs text-green-500">+12%</p>
//         </div>

//         {/* Total Students */}
//         <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
//           <BiUser className="text-green-500 text-3xl" />
//           <p className="text-xl font-bold">38</p>
//           <p className="text-sm text-gray-500">Total Students</p>
//           <p className="text-xs text-green-500">+3%</p>
//         </div>

//         {/* Rating */}
//         <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
//           <FaStar className="text-yellow-500 text-3xl" />
//           <p className="text-xl font-bold">4.9</p>
//           <p className="text-sm text-gray-500">Rating</p>
//         </div>

//         {/* Monthly Revenue */}
//         <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
//           <AiOutlineDollarCircle className="text-purple-500 text-3xl" />
//           <p className="text-xl font-bold">$3,450</p>
//           <p className="text-sm text-gray-500">Monthly Revenue</p>
//           <p className="text-xs text-green-500">+8%</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Widgets;
import React from "react";
import { FaRegClock, FaStar } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";

function Widgets() {
  const stats = [
    { icon: <FaRegClock />, value: "124h", label: "Teaching Hours", color: "bg-blue-100 text-blue-600", growth: "+12%" },
    { icon: <BiUser />, value: "38", label: "Total Students", color: "bg-green-100 text-green-600", growth: "+3%" },
    { icon: <FaStar />, value: "4.9", label: "Rating", color: "bg-yellow-100 text-yellow-600", growth: null },
    { icon: <AiOutlineDollarCircle />, value: "$3,450", label: "Monthly Revenue", color: "bg-purple-100 text-purple-600", growth: "+8%" },
  ];

  return (
    <div className="py-6 px-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4">
            {/* Icon with colored background */}
            <div className={`p-4 rounded-lg ${stat.color} flex items-center justify-center`}>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            
            {/* Stats Info */}
            <div className="flex flex-col">
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              {stat.growth && <p className="text-xs text-green-600 font-medium">{stat.growth}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Widgets;
