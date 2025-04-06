import React, { useState, useEffect, useContext } from "react";
import { BsThreeDotsVertical, BsPencil, BsTrash } from "react-icons/bs";
import Sidebar from "../Admin/Slidebar";
import NavBar from "../Admin/NavBar/NavBar";
import axios from "axios";
import DeleteModal from "./deleteModal";
import { AppContent } from "../../Context/AppContex";

function StudentList() {
  const { backendUrl } = useContext(AppContent);
  const [students, setStudents] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/students`, {
        withCredentials: true,
      });

      console.log("Fetched Students:", response.data);

      if (response.data.success) {
        setStudents(response.data.students);
      } else {
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error! Status: ${error.response.status}`);
      } else {
        console.error("Error fetching students:", error.message);
      }
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle menu for a specific student
  const toggleMenu = (id) => {
    console.log("Toggling menu for ID:", id, "Current Open Menu:", openMenu);
    if (!id) {
      console.error("Student ID is missing!");
      return;
    }
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  // Close menu when clicking outside
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
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <NavBar setSearchTerm={setSearchTerm} />

        <div className="p-5">
          <div className="bg-white shadow rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-4">Registered Students</h3>
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
                    filteredStudents.map((student, index) => (
                      <tr
                        key={student.id || index}
                        className="bg-white border-b"
                      >
                        {/* <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
                          <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
                            {student.name.charAt(0)}
                          </span>
                          <span className="ml-2">{student.name}</span>
                        </td> */}

                        <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
                          <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
                            {student.profile ? (
                              <img
                                src={`https://utfs.io/f/${student.profile}`}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              student.name.charAt(0) // Fallback to the first letter of the name if no profile picture
                            )}
                          </span>
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
                              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                                <BsPencil className="mr-2" /> Edit Student
                              </button>

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
          refreshStudents={fetchStudents}
        />
      )}
    </div>
  );
}

export default StudentList;
