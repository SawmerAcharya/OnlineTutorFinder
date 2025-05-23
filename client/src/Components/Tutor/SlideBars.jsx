

// // import React from 'react';
// // import { FiHome, FiUser, FiMessageSquare, FiSettings } from 'react-icons/fi';

// // import { RiCalendarScheduleLine } from 'react-icons/ri';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { BiBook } from 'react-icons/bi';

// // function SlideBars() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   // Function to check if a menu item is active
// //   const isActive = (path) => location.pathname === path ? 'bg-gray-100' : 'hover:bg-gray-100';

// //   const handleLogout = () => {
// //     navigate('/login');
// //   };

// //   return (
// //     <div className="w-64 min-h-screen bg-white text-black flex flex-col">
// //       <div className="px-5 py-4">
// //         <h1 className="text-xl font-bold">TutorHub</h1>
// //       </div>
// //       <ul className="flex-grow">
// //         <li className="flex items-center px-5 py-3 cursor-pointer bg-gray-100">
// //           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/students')}`}
// //             onClick={() => navigate('/std')}>
// //           <FiUser className="mr-3" size={20} /> <span>Students</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/messages')}`}
// //             onClick={() => navigate('/messages')}>
// //           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
// //         </li>
// //         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/schedules')}`}
// //             onClick={() => navigate('/schedules')}>
// //           <RiCalendarScheduleLine className="mr-3" size={20} /> <span>Schedules</span>
// //         </li>
// //             <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/UploadAssignmentForm')}`}
// //         onClick={() => navigate('/UploadAssignmentForm')}>
// //       <BiBook className="mr-3" size={20} /> <span>Assignment</span>
// //     </li>
// //         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/settings')}`}
// //             onClick={() => navigate('//tutor/Setting/:tutorId')}>
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

// // export default SlideBars;


// import React from 'react';
// import { FiHome, FiUser, FiMessageSquare, FiSettings, FiCalendar, FiBookOpen } from 'react-icons/fi';
// import { RiCalendarScheduleLine } from 'react-icons/ri';
// import { BiBook, BiCalendarCheck } from 'react-icons/bi';
// import { useNavigate, useLocation } from 'react-router-dom';

// function SlideBars() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path ? 'bg-gray-100' : 'hover:bg-gray-100';

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="w-64 min-h-screen bg-white text-black flex flex-col">
//       <div className="px-5 py-4">
//         <h1 className="text-xl font-bold">TutorHub</h1>
//       </div>
      
//       <ul className="flex-grow">
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/tutor')}`}
//             onClick={() => navigate('/tutor')}>
//           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
//         </li>

//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/std')}`}
//             onClick={() => navigate('/std')}>
//           <FiUser className="mr-3" size={20} /> <span>Students</span>
//         </li>

//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/messages')}`}
//             onClick={() => navigate('/messages')}>
//           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
//         </li>
//         <li
//           className={`flex items-center px-5 py-3 cursor-pointer ${isActive(
//             "/withdraw"
//           )}`}
//           onClick={() => navigate("/withdraw")}
//         >
//           <span className="mr-3 font-bold">Rs</span>
//           <span>Withdrawals</span>
//         </li>

//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/UploadAssignmentForm')}`}
//             onClick={() => navigate('/UploadAssignmentForm')}>
//           <BiBook className="mr-3" size={20} /> <span>Assignments</span>
//         </li>

//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/Bookinglist')}`}
//             onClick={() => navigate('/Bookinglist')}>
//           <BiCalendarCheck className="mr-3" size={20} /> <span>Bookings</span>
//         </li>

//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/tutorSetting')}`}
//             onClick={() => navigate('/tutorSetting')}>
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

// export default SlideBars;




import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  MessageSquare,
  // Settings,
  BookOpen,
  CalendarCheck,
  LogOut,
  DollarSign,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { title: "Dashboard", icon: Home, path: "/tutor" },
    { title: "Students", icon: Users, path: "/std" },
    { title: "Messages", icon: MessageSquare, path: "/messages" },
    { title: "Withdrawals", icon: DollarSign, path: "/withdraw" },
    { title: "Assignments", icon: BookOpen, path: "/AssignmentDashboard" },
    { title: "Bookings", icon: CalendarCheck, path: "/BookingsList" },
    // { title: "Settings", icon: Settings, path: "/tutorSetting" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="h-screen w-64 bg-gray-50 border-r flex flex-col shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 border-b bg-white">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <h1 className="text-xl font-semibold text-gray-800">TutorHub</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {routes.map(({ title, icon: Icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
