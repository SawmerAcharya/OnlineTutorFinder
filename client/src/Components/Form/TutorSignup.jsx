import { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import Availability from "./Availability";

function Tutorform() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    qualifications: "",
    experience: "",
    hourlyRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (
      formData.currentSubject &&
      !formData.subjects.includes(formData.currentSubject)
    ) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, prev.currentSubject],
        currentSubject: "", // Clear the subject input after adding
      }));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-6">
        {/* Flex container for the icon */}
        <div className="flex justify-center items-center">
          <FaChalkboardTeacher className="text-blue-800 text-5xl mb-4" />
        </div>
        <h1 className="text-xl font-bold text-blue-800">Join as a Tutor</h1>
        <p className="text-gray-600">
          Share your knowledge and inspire students worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Personal Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Enter your email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Enter your phone number"
              />
            </div>
          </form>
        </div>

        {/* Professional Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Professional Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications
              </label>
              <input
                type="text"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="e.g., Master's in Mathematics"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teaching Experience (years)
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="text"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter rate"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects
                </label>
                <div className="flex items-center">
                  <select
                    name="currentSubject"
                    value={formData.currentSubject}
                    onChange={handleChange}
                    className="block w-full border bg-white border-gray-200 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500  mr-2"
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                  </select>
                  <button
                    onClick={handleAddSubject}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Availabilty Details Section */}
        <div className="document-submit bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Availability & Preference
          </h2>

          <Availability/>

          
        </div>

        {/* Document verification Details Section */}
        <div className="document-submit bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Document Verification
          </h2>

        </div>

        {/* Teaching Mode Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Select Teaching Mode
        </h2>
        <select
          name="teachingMode"
          value={formData.teachingMode}
          onChange={handleChange}
          className="block w-full border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      </div>
    </div>
  );
}

export default Tutorform;
