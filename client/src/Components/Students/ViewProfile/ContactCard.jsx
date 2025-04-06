import React from "react";
import { Phone, Mail, MessageSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactCard({ tutor }) {
  const navigate = useNavigate();
  // Extract phone number and email
  const phoneNumber = tutor?.tutorData?.PhoneNumber || "N/A";
  const email = tutor?.email || "N/A";

  // Masking phone number (show first 4 digits, last 4 as ****)
  const maskedPhone = phoneNumber.replace(/(\d{4})\d{4}/, "$1 ****");

  // Masking email (first 4 characters replaced with ****)
  const maskedEmail = email.replace(/^(.{4})/, "****");

  const handleSendMessage = () => {
    navigate("/chat", {
      state: {
        tutorId: tutor._id,
        tutorObj: tutor, // Pass the entire tutor object
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Details</h2>

      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
            <Phone size={18} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-800 font-medium">{maskedPhone}</p>
            <p className="text-xs text-gray-500">Available after booking</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
            <Mail size={18} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-800 font-medium">{maskedEmail}</p>
            <p className="text-xs text-gray-500">Available after booking</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
          <Calendar size={18} className="mr-2" />
          Book a tutor
        </button>

        <button
        onClick={handleSendMessage}
         className="w-full bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-600 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
          <MessageSquare size={18} className="mr-2" />
          Send message
        </button>
      </div>
    </div>
  );
}
