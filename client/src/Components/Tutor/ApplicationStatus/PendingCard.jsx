import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../../Context/AppContex";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";

const PendingCard = () => {
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContent);

  useEffect(() => {
    console.log("Checking userData in useEffect:", userData); // Debug log
    if (userData?.userId) {
      checkTutorStatus();
    }
  }, [userData, backendUrl]);
  
  const checkTutorStatus = async () => {
    if (!userData || !userData.userId) {
      console.error("User data is missing, skipping API call.");
      return;
    }
  
    console.log("✅ Making API request to check tutor status...");
  
    try {
      const response = await axios.get(`${backendUrl}/api/user/tutors`, { withCredentials: true });
  
      console.log("API Response:", response.data);
  
      if (!response.data || !Array.isArray(response.data.tutors)) {
        console.error("Invalid response format:", response.data);
        return;
      }
  
      const currentTutor = response.data.tutors.find(tutor => tutor.name === userData.name);
      console.log("hdh:", currentTutor);
  
      if (!currentTutor) {
        console.error("Tutor not found in response.");
        return;
      }
  
      const status = currentTutor.tutorData?.status;
      console.log("Tutor status:", status);
  
      switch (status) {
        case "approved":
          console.log("Navigating to /Approved...");
          navigate("/Approved");
          break;
        case "rejected":
          console.log("Navigating to /Rejected...");
          navigate("/Rejected");
          break;
        default:
          console.log("Staying on /Pending...");
          navigate("/Pending");
          break;
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-3xl shadow-2xl">
        <h2 className="text-xl font-bold mb-3 text-center">
          Application Status
        </h2>
        <p className="text-base text-gray-600 mb-5 text-center">
          Your journey to becoming a verified tutor
        </p>

        <div className="space-y-8 relative">
          {/* Application Submitted */}
          <div className="flex items-center relative">
            <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <IoDocumentTextOutline size={20} />
            </div>
            <span className="ml-3 text-base font-semibold text-purple-700">
              Application Submitted
            </span>
            <div className="absolute left-5 top-full w-0.5 bg-purple-500 h-10"></div>
          </div>

          {/* Under Review */}
          <div className="flex items-center relative">
            <div className="bg-purple-100 text-purple-600 rounded-full w-10 h-10 flex items-center justify-center border-4 border-purple-400">
              <AiOutlineClockCircle size={20} />
            </div>
            <span className="ml-3 text-base font-semibold text-purple-700">
              Under Review
            </span>
            <div className="absolute left-5 top-full w-0.5 bg-gray-300 h-10"></div>
          </div>

          {/* Verification Complete */}
          <div className="flex items-center">
            <div className="bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <AiOutlineCheckCircle size={20} />
            </div>
            <span className="ml-3 text-base font-semibold text-gray-400">
              Verification Complete
            </span>
          </div>
        </div>


        {/* Review Status Message */}
        <div className="mt-6 p-3 bg-purple-100 text-purple-800 rounded-xl text-base shadow-lg">
          <div className="flex items-center space-x-2 font-bold">
            <AiOutlineClockCircle size={18} />
            <span>Review in Progress</span>
          </div>
          <p className="pt-2">
            Thank you for submitting your application! Our team is reviewing your details, which typically takes 24-48 hours. You can check your application status here anytime. We appreciate your patience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PendingCard;