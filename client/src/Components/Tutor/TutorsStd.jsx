

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Search, UserRound } from "lucide-react";
import Nav from "./Nav";
import SlideBars from "./SlideBars";
import { AppContent } from "../../Context/AppContex";

function TutorStd() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useContext(AppContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData?._id && userData.role === "tutor") {
      fetchStudents(userData._id);
    }
  }, [userData]);

  const fetchStudents = async (tutorId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/bookings/activeBookingUsers/${tutorId}`);
      if (response.data.success) {
        const formatted = response.data.data.map((student) => ({
          id: student._id,
          name: student.name,
          email: student.email,
          profile: student.profile,
        }));
        setStudents(formatted);
      } else {
        console.error("Failed to fetch students.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <SlideBars />
      <div className="flex flex-col flex-grow">
        <Nav setSearchTerm={setSearchTerm} />
        <div className="p-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">Your Students</h2>
                <p className="text-sm text-gray-500">Track and manage your current students</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search by name..."
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Student</th>
                    <th className="text-left px-6 py-3 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="2" className="text-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto"></div>
                      </td>
                    </tr>
                  ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="border-t hover:bg-purple-50 transition">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={student.profile ? `https://utfs.io/f/${student.profile}` : "https://via.placeholder.com/40"}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{student.name}</p>
                            <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Active</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{student.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-8 text-gray-400">
                        <UserRound className="w-6 h-6 mx-auto mb-2" />
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorStd;
