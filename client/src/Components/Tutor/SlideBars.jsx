

// import React from 'react';
// import { FiHome, FiUser, FiMessageSquare, FiSettings } from 'react-icons/fi';

// import { RiCalendarScheduleLine } from 'react-icons/ri';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { BiBook } from 'react-icons/bi';

// function SlideBars() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Function to check if a menu item is active
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
//         <li className="flex items-center px-5 py-3 cursor-pointer bg-gray-100">
//           <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/students')}`}
//             onClick={() => navigate('/std')}>
//           <FiUser className="mr-3" size={20} /> <span>Students</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/messages')}`}
//             onClick={() => navigate('/messages')}>
//           <FiMessageSquare className="mr-3" size={20} /> <span>Messages</span>
//         </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/schedules')}`}
//             onClick={() => navigate('/schedules')}>
//           <RiCalendarScheduleLine className="mr-3" size={20} /> <span>Schedules</span>
//         </li>
//             <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/UploadAssignmentForm')}`}
//         onClick={() => navigate('/UploadAssignmentForm')}>
//       <BiBook className="mr-3" size={20} /> <span>Assignment</span>
//     </li>
//         <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/settings')}`}
//             onClick={() => navigate('//tutor/Setting/:tutorId')}>
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


import React from 'react';
import { FiHome, FiUser, FiMessageSquare, FiSettings, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { BiBook, BiCalendarCheck } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';

function SlideBars() {
  const navigate = useNavigate();
  const location = useLocation();

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
        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/tutor')}`}
            onClick={() => navigate('/tutor')}>
          <FiHome className="mr-3" size={20} /> <span>Dashboard</span>
        </li>

        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/std')}`}
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

        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/UploadAssignmentForm')}`}
            onClick={() => navigate('/UploadAssignmentForm')}>
          <BiBook className="mr-3" size={20} /> <span>Assignments</span>
        </li>

        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/Bookinglist')}`}
            onClick={() => navigate('/Bookinglist')}>
          <BiCalendarCheck className="mr-3" size={20} /> <span>Bookings</span>
        </li>

        <li className={`flex items-center px-5 py-3 cursor-pointer ${isActive('/tutorSetting')}`}
            onClick={() => navigate('/tutorSetting')}>
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
