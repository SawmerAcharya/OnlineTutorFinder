import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContent } from "../Context/AppContex";

function DropdownMenu() {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  const storedTutorId = localStorage.getItem("tutorId");
  const tutorId = userData?._id || storedTutorId || null;

  useEffect(() => {
    console.log("User Data in DropdownMenu:", userData);
    console.log("Tutor ID from Context:", userData?._id);
    console.log("Tutor ID from localStorage:", storedTutorId);
    console.log("Final Tutor ID used:", tutorId);
  }, [userData]);

  const goToProfile = () => {
    if (tutorId) {
      console.log(`Navigating to: /tutor/profile/${tutorId}`);
      navigate(`/tutor/profile/${tutorId}`);
    } else {
      console.error("Tutor ID not found.");
      alert("Error: Tutor profile not found. Please log in again.");
    }
  };

  const goToPaymentSetUp = () => {
    if (tutorId) {
      console.log(`Navigating to: /tutor/PaymentSetup/${tutorId}`);
      navigate(`/tutor/PaymentSetup/${tutorId}`);
    } else {
      console.error("Tutor ID not found.");
      alert("Error: Tutor Payment Setup not found. Please log in again.");
    }
  };

  const goToSettings = () => {
    if (tutorId) {
      console.log(`Navigating to: /tutor/Setting/${tutorId}`);
      navigate(`/tutor/Setting/${tutorId}`);
    } else {
      console.error("Tutor ID not found.");
      alert("Error: Tutor settings not found. Please log in again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tutorId");
    navigate("/login");
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg w-48">
      <ul className="py-2">
        <li
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={goToProfile}
        >
          <FaUser className="mr-2 text-gray-600" />
          Profile
        </li>
        <li
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={goToPaymentSetUp}
        >
          <FaUser className="mr-2 text-gray-600" />
          Payment Setup
        </li>
        <li
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={goToSettings}
        >
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
