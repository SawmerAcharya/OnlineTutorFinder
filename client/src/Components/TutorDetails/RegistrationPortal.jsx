
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import TutorForm from "./TutorForm";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
function RegistrationPortal() {
  const [role, setRole] = useState("tutor"); // Initial state is 'tutor'
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = async () => {
    try {
      axios.defaults.withCredentials = true;
      // Send the POST request
      const response = await axios.post('http://localhost:5001/api/user/setRole', {
        role: 'student', // Set the role to 'student'
        tutorFields: null, // Since it's for a student, tutorFields can be null or not needed
      });

      // Check if the response is successful
      if (response.status === 200) {
        // Show success toast
        toast.success("Successfully registered as Student!", {
          autoClose: 5000,
        });
        // Navigate to the homepage
        navigate('/');
      } else {
        // Show error toast if something goes wrong with the request
        toast.error("Unable to register as Student.", {
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error('Error:', err);
      // Show error toast in case of request failure
      toast.error("Error: Unable to register as Student.", {
        autoClose: 5000,
      });
    }
  }

  // Simple component to display a button for student sign up
  const StudentButton = () => (
    
    <button
      onClick={handleButtonClick} // Navigate to the dashboard when clicked
      className="flex items-center px-6 py-2 rounded text-lg bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-200"
    >
      <FaUserGraduate className="mr-2" />
      Continue as Student
    </button>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center">
        <header className="w-full max-w-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-8 rounded-t-lg shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <FiUser size={32} className="text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-base sm:text-lg">Choose your path and let's get started</p>
          </div>
        </header>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setRole("tutor")}
          className={`flex items-center px-6 py-2 rounded text-lg ${
            role === "tutor" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-blue-600 hover:text-white transition-colors duration-200`}
        >
          <FaChalkboardTeacher className="mr-2" />
          Tutor
        </button>
        <StudentButton />
      </div>

      {role === "tutor" && <TutorForm />}
    </div>
  );
}

export default RegistrationPortal;
