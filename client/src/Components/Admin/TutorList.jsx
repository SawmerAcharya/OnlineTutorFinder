import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteTutor from "./DeleteTutor";
import {
  BsThreeDotsVertical,
  BsTrash,
  
} from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import Sidebar from "./Slidebar";
import NavBar from "./NavBar/NavBar";

function TutorsList() {
  const { backendUrl } = useContext(AppContent);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTutors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/tutors`, {
        withCredentials: true,
      });

      if (response.data && Array.isArray(response.data.tutors)) {
        setTutors(response.data.tutors);
      } else {
        toast.info("No tutors found.", { toastId: "fetch-info" });
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
      toast.error("Failed to fetch tutors. Please try again.", {
        toastId: "fetch-error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [backendUrl]); // Now fetchTutors is accessible outside

  const filteredTutors = tutors.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleVerify = (id, status) => {
    console.log(`Tutor ${id} verification status changed to ${status}`);
    setOpenMenu(null);
  };

  const handleDelete = (tutor) => {
    console.log(`Attempting to delete tutor: ${tutor.name} (ID: ${tutor._id})`);
    setDeleteTutor(tutor);
    setOpenMenu(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <NavBar setSearchTerm={setSearchTerm} />

        <div className="p-5">
          <div className="bg-white shadow rounded-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-4">Registered Tutors</h3>

            {loading ? (
              <p className="text-center text-gray-500">Loading tutors...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="py-3 px-6">Full Name</th>
                      <th className="py-3 px-6">Email</th>
                      <th className="py-3 px-6">Subjects</th>
                      <th className="py-3 px-6">Approval Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTutors.length > 0 ? (
                      filteredTutors.map((tutor) => (
                        <tr key={tutor._id} className="bg-white border-b">
                          {/* <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
                            <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
                              {tutor.name.charAt(0)}
                            </span>
                            <span className="ml-2">{tutor.name}</span>
                          </td> */}

                          <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
                            <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
                              {tutor.profile ? (
                                <img
                                  src={`https://utfs.io/f/${tutor.profile}`}
                                  alt="Profile"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                tutor.name.charAt(0) // Fallback to the first letter of the name if no profile picture
                              )}
                            </span>
                            <span className="ml-2">{tutor.name}</span>
                          </td>

                          <td className="py-4 px-6">{tutor.email}</td>
                          <td className="py-4 px-6">
                            {tutor.tutorData?.CurrentSubject || "N/A"}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`font-semibold ${
                                tutor.tutorData?.status === "approved"
                                  ? "text-green-600"
                                  : tutor.tutorData?.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {tutor.tutorData?.status
                                ? tutor.tutorData.status
                                    .charAt(0)
                                    .toUpperCase() +
                                  tutor.tutorData.status.slice(1)
                                : "Pending"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center relative">
                            <div className="flex justify-center">
                              <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMenu(tutor._id);
                                }}
                              >
                                <BsThreeDotsVertical size={20} />
                              </button>
                            </div>

                            {openMenu === tutor._id && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50 menu-container">
                                <Link
                                  to={`/profile/${tutor._id}`}
                                  className=" px-4 py-2 text-blue-600 hover:bg-gray-100 flex items-center"
                                >
                                  <IoEyeOutline className="mr-2 text-blue-500" />{" "}
                                  View Profile
                                </Link>
                                {/* <button
                                  className="px-4 py-2 text-green-600 hover:bg-gray-100 w-full text-left flex items-center"
                                  onClick={() =>
                                    handleVerify(tutor._id, "approved")
                                  }
                                >
                                  <BsCheckCircle className="mr-2" /> Verify
                                </button>
                                <button
                                  className="px-4 py-2 text-yellow-600 hover:bg-gray-100 w-full text-left flex items-center"
                                  onClick={() =>
                                    handleVerify(tutor._id, "not approved")
                                  }
                                >
                                  <BsXCircle className="mr-2" /> Not Verify
                                </button> */}
                                <button
                                  className="px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                                  onClick={() => handleDelete(tutor)}
                                >
                                  <BsTrash className="mr-2" /> Delete Tutor
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-4 px-6 text-center text-gray-500"
                        >
                          No tutors found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {deleteTutor && (
        <DeleteTutor
          tutor={deleteTutor}
          setDeleteTutor={setDeleteTutor}
          refreshTutors={() => fetchTutors()}
        />
      )}
    </div>
  );
}

export default TutorsList;
