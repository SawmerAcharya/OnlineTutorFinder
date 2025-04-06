import React from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FiUser } from "react-icons/fi"; 

const setUpForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Welcome Header Section */}
      <header className="w-full max-w-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-8 rounded-t-lg shadow-lg">
        <div className="flex justify-center items-center space-x-4">
          <FiUser size={32} className="text-white" /> {/* Added icon */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, John Doe!</h1>
            <p className="mt-2 text-base sm:text-lg">
              Choose your path and let's get started
            </p>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="bg-white rounded-b-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-black text-center mb-4">
          Join Our Platform
        </h2>
        <p className="text-base text-black text-center mb-8">
          Choose how you want to sign up
        </p>
        <div className="space-y-6">
          {/* Tutor Button */}
          <button className="w-full flex items-center justify-between bg-purple-100 hover:bg-purple-200 text-purple-600 font-medium py-6 px-6 rounded-lg transition shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-purple-300 text-white rounded-full flex items-center justify-center">
                <FaChalkboardTeacher size={24} />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-black">
                  Sign up as a Tutor
                </p>
                <p className="text-sm sm:text-base text-black">
                  Share your knowledge and inspire others
                </p>
              </div>
            </div>
            <MdOutlineNavigateNext size={24} className="text-purple-400" />
          </button>

          {/* Student Button */}
          <button className="w-full flex items-center justify-between bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-6 px-6 rounded-lg transition shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-300 text-white rounded-full flex items-center justify-center">
                <FaUserGraduate size={24} />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-black">
                  Sign up as a Student
                </p>
                <p className="text-sm sm:text-base text-black">
                  Start learning from expert tutors
                </p>
              </div>
            </div>
            <MdOutlineNavigateNext size={24} className="text-blue-400" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default setUpForm;
