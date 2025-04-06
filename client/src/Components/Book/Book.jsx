import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const levels = [
  "Primary (Class 1-5)",
  "L Secondary (Class 6-8)",
  "Secondary (Class 9-10)",
  "H Secondary (Class 11-12)",
  "Bachelor Level",
  "Masters Level",
];

function Book() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Subjects management
    Subjects: ["Mathematics", "Science", "English"],
    CurrentSubject: "Mathematics",
    NewSubject: "",
    mode: "online",
    location: "",
    date: "",
    time: "",
    level: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically handle form submission (e.g., send data to your server)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    // Only add the new subject if it's not already in the list and not empty
    if (
      formData.NewSubject &&
      !formData.Subjects.includes(formData.NewSubject)
    ) {
      setFormData((prev) => ({
        ...prev,
        Subjects: [...prev.Subjects, prev.NewSubject],
        CurrentSubject: prev.NewSubject,
        NewSubject: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header placed outside the padded container */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-6 px-4">
          <h2 className="text-3xl font-bold">Book a Tutor</h2>
          <p className="mt-2 text-lg">Schedule your personalized tutoring session</p>
        </div>

        <div className="px-6 py-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+977 9844678327"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Subject Selection + Add New Subject - full width */}
              <div className="sm:col-span-2">
                <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                  Subject
                </label>
                <div className="flex items-center">
                  <select
                    name="CurrentSubject"
                    value={formData.CurrentSubject}
                    onChange={handleChange}
                    className="block w-full border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 mr-2"
                  >
                    {formData.Subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="NewSubject"
                    value={formData.NewSubject}
                    onChange={handleChange}
                    placeholder="New Subject"
                    className="border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 mr-2"
                  />
                  <button
                    onClick={handleAddSubject}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Mode of Tutoring */}
              <div>
                <label className="block text-sm font-[600] text-gray-700 mb-2">
                  Mode of Tutoring
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="online"
                      checked={formData.mode === "online"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <Video className="w-4 h-4 mr-1 text-blue-600" />
                    Online
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="offline"
                      checked={formData.mode === "offline"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                    In-Person
                  </label>
                </div>
              </div>

              {/* Location (only if mode is offline) */}
              {formData.mode === "offline" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter preferred location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Preferred Date */}
              <div>
                <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-[600] text-gray-700 mb-2">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Level</option>
                  {levels.map((level, index) => (
                    <option key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                Additional Message
              </label>
              <textarea
                name="message"
                placeholder="Any specific requirements or questions?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
              >
                Book Your Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Book;
