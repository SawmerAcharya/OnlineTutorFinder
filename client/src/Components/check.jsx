import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

function StdSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    educationLevel: "",
    subjects: [],
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectAdd = (e) => {
    e.preventDefault();
    const newSubjects = [...formData.subjects, formData.currentSubject];
    setFormData((prev) => ({
      ...prev,
      subjects: newSubjects,
      currentSubject: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="container">
      <div className="  p-6 text-center flex flex-col items-center justify-center">
        <FaChalkboardTeacher className="text-blue-800 text-5xl mb-4" />{" "}
        {/* Larger icon and margin bottom */}
        <h1 className="text-xl font-bold text-blue-800">Join as a Student</h1>
        <p className="text-black-800">
          Shape Your Future - Find the Perfect Tutor Today!
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your first name "
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your last name "
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email "
            />
          </div>
          <div className="flex justify-between space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password "
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password "
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Education Level
            </label>
            <div className="relative">
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Select Education Level</option>
                <option value="High School">Primary (Class 1-5)</option>
                <option value="Bachelor's">L Secondary (Class 6-8)</option>
                <option value="Master's">Secondary (Class 9-10)</option>
                <option value="PhD">H Secondary (Class 11-12)</option>
                <option value="PhD">Bachelor Degree</option>
                <option value="PhD">Masters Degree</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaCaretDown />
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <div className="relative flex-grow">
              <select
                name="currentSubject"
                value={formData.currentSubject || ""}
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaCaretDown />
              </div>
            </div>
            <button
              onClick={handleSubjectAdd}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Add
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your City name
               "
            />
          </div>
          <div className="flex items-center justify-between mt-5">
            <button
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-normal py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up as Tutor
            </button>
          </div>
          <div className="mt-4">
            <p className="text-center text-gray-500 text-xs">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StdSignup;
