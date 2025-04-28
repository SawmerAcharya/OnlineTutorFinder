import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import Nav from "./Nav";
import SlideBars from "./SlideBars";
import DeleteModal from "../Students/deleteModal";
import { AppContent } from "../../Context/AppContex";

function TutorStd() {
  const [students, setStudents] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useContext(AppContent);

  useEffect(() => {
    if (userData?._id && userData.role === "tutor") {
      fetchStudents(userData._id);
    }
  }, [userData]);

  const fetchStudents = async (tutorId) => {
    console.log("Fetching students for tutorId:", tutorId);
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
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const confirmDelete = (student) => {
    setDeleteStudent(student);
    setOpenMenu(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SlideBars />
      <div className="flex flex-col flex-grow">
        <Nav setSearchTerm={setSearchTerm} />
        <div className="p-5">
          <div className="bg-white shadow rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-4">Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="py-3 px-6">Full Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="bg-white border-b">
                        <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                            {student.profile ? (
                              <img
                                src={`https://utfs.io/f/${student.profile}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 font-bold uppercase">
                                {student.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <span className="ml-2">{student.name}</span>
                        </td>
                        <td className="py-4 px-6">{student.email}</td>
                        <td className="py-4 px-6 text-center relative">
                          <div className="flex justify-center">
                            <button
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMenu(student.id);
                              }}
                            >
                              <BsThreeDotsVertical size={20} />
                            </button>
                          </div>
                          {openMenu === student.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50 menu-container">
                              <button
                                className="px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                                onClick={() => confirmDelete(student)}
                              >
                                <BsTrash className="mr-2" /> Delete Student
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-4 px-6 text-center text-gray-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {deleteStudent && (
        <DeleteModal
          student={deleteStudent}
          setDeleteStudent={setDeleteStudent}
          refreshStudents={() => fetchStudents(userData._id)} // ✅ pass with userData._id
        />
      )}
    </div>
  );
}

export default TutorStd;
