// import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

// function DropdownMenu() {
//   return (
//     <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
//       <ul className="py-2">
//         <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
//           <FaUser className="mr-2 text-gray-600" />
//           Profile
//         </li>
//         <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
//           <FaCog className="mr-2 text-gray-600" />
//           Settings
//         </li>
//         <li className="flex items-center px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer">
//           <FaSignOutAlt className="mr-2" />
//           Logout
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default DropdownMenu;


import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

function DropdownMenu() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
      <ul className="py-2">
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <FaUser className="mr-2 text-gray-600" />
          Profile
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <FaCog className="mr-2 text-gray-600" />
          Settings
        </li>
        <li
          className="flex items-center px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
          onClick={handleLogout} 
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
