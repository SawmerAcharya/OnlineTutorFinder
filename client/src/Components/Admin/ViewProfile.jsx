import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import { Avatar } from "@mui/material";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn, MdUploadFile } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import { HiUsers } from "react-icons/hi2";
import { RiBook3Line } from "react-icons/ri";
import {
  IoDocumentTextOutline,
  IoChevronBackCircleSharp,
} from "react-icons/io5";
import { toast } from "react-toastify";

const TutorProfile = () => {
  const { backendUrl } = useContext(AppContent);
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutorProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/tutors/${tutorId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log("Fetched tutor data:", response.data.tutor); // Debugging
          setTutor(response.data.tutor || {});
        } else {
          throw new Error(
            response.data.message || "Failed to fetch tutor details."
          );
        }
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load tutor profile."
        );
        toast.error(
          error.response?.data?.message ||
            "Error fetching tutor details. Try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (tutorId) {
      fetchTutorProfile();
    }
  }, [backendUrl, tutorId]);

  // Render handling where data might be incomplete
  if (loading)
    return <p className="text-center text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!tutor)
    return <p className="text-center text-gray-500">Tutor not found.</p>;

  const documents = tutor.tutorData.Documents || [];
  

  const handleStatusUpdate = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to set the status to '${newStatus}'?`)) {
      return; // Early exit if the user cancels the confirmation
    }
  
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/tutor/status/${tutorId}`,
        { status: newStatus },
        { withCredentials: true }
      );
  
      // Log the response for debugging
      console.log("Response data:", response.data);
  
      if (response.data.success) {
        // Update the tutor's status in state
        setTutor(prevTutor => ({
          ...prevTutor,
          status: newStatus
        }));
  
        // Show success notification
        // toast.success(`Tutor status updated to ${newStatus}!`);
        toast.success(`Tutor ${tutor.name}, status updated to: ${newStatus}!`);
  
        // Navigate to the admin dashboard after the update
        navigate('/tutors');
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Error updating status. Try again later.");
    }
  };
  
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl border border-gray-300 relative">
        <IoChevronBackCircleSharp
          className="absolute top-4 left-4 text-yellow-800 hover:text-gray-900 text-4xl cursor-pointer hover:scale-110 transition-all z-10"
          onClick={() => navigate(-1)}
        />

        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-center">
          <div className="relative w-24 h-24 mx-auto -mb-10">
            <Avatar
              src={tutor.imageUrl || "https://via.placeholder.com/120"}
              alt={tutor.name}
              sx={{ width: 96, height: 96, border: "4px solid white" }}
              className="shadow-lg mx-auto"
            />
          </div>
        </div>

        {/* Name & Location */}
        <div className="text-center mt-12">
          <h2 className="text-xl font-semibold text-gray-800">{tutor.name}</h2>
          <p className="text-gray-500 flex items-center justify-center text-sm mt-1">
            <MdLocationOn className="mr-1 text-lg" />{" "}
            {tutor.tutorData?.City || "N/A"}
          </p>
        </div>

        {/* Experience & Pricing */}
        <div className="flex justify-around py-4 px-8 border-b border-gray-200 bg-gray-50 mt-3">
          <div className="text-center">
            <p className="text-xl font-semibold text-blue-600">
              {tutor.tutorData?.Experience || "0"}+
            </p>
            <p className="text-gray-500 text-sm">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-purple-600">
              ${tutor.tutorData?.HourlyRate || "N/A"}
            </p>
            <p className="text-gray-500 text-sm">Monthly Rate</p>
          </div>
        </div>

        {/* Qualifications */}
        <div className="p-5 bg-blue-50 rounded-lg mx-5 my-3">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
            <IoMdSchool className="text-blue-600 mr-2 text-xl" /> Qualifications
          </h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-center">
              <SlBadge className="mr-2 text-blue-500" />{" "}
              {tutor.tutorData?.Qualifications || "N/A"}
            </li>
          </ul>
        </div>

        {/* Contact & Teaching Details */}
        <div className="grid grid-cols-2 gap-4 px-5">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Contact Information
            </h3>
            <p className="text-gray-700 flex items-center text-sm">
              <FaPhoneAlt className="mr-2 text-red-500" />{" "}
              {tutor.tutorData?.PhoneNumber || "N/A"}
            </p>
            <p className="text-gray-700 flex items-center text-sm mt-3">
              <FaEnvelope className="mr-2 text-red-500" /> {tutor.email}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Teaching Details
            </h3>
            <div className="flex flex-wrap gap-2">
              <RiBook3Line className="mr-2 text-blue-500 text-lg" />
              <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full flex items-center">
                {tutor.tutorData?.CurrentSubject || "N/A"}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-3 flex items-center">
              <HiUsers className="mr-2 text-blue-500 text-lg" />{" "}
              {tutor.tutorData?.TeachingMode || "N/A"}
            </p>
          </div>
        </div>

        {/* Verified Documents */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
            <IoDocumentTextOutline className="text-black-600 mr-2 text-xl" />{" "}
            Documents
          </h3>
          <div className="border border-gray-300 rounded-lg p-5 flex items-center justify-center text-gray-400 bg-gray-50">
            {documents.length ? (
              <a
                href={"https://utfs.io/f/" + documents[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Document
              </a>
            ) : (
              <>
                <MdUploadFile className="text-3xl mr-2" />
                No documents uploaded yet
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between p-5 bg-gray-100 border-t border-gray-300">
          <button
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 mr-2 rounded-lg"
            onClick={() => handleStatusUpdate("approved")}
          >
            ✅ Accept Tutor
          </button>
          <button
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 ml-2 rounded-lg"
            onClick={() => handleStatusUpdate("rejected")}
          >
            ❌ Reject Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
