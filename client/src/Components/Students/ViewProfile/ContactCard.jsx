
// import { Phone, Mail, MessageSquare, Calendar, Shield, ChevronRight, Lock } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// export default function ContactCard({ tutor }) {
//   const navigate = useNavigate()

//   // Extract phone number and email
//   const phoneNumber = tutor?.tutorData?.PhoneNumber || "N/A"
//   const email = tutor?.email || "N/A"

//   // Masking phone number (show first 4 digits, last 4 as ****)
//   const maskedPhone = phoneNumber.replace(/(\d{4})\d{4}/, "$1 ****")

//   // Masking email (first 4 characters replaced with ****)
//   const maskedEmail = email.replace(/^(.{4})/, "****")

//   const handleSendMessage = () => {
//     navigate("/chat", {
//       state: {
//         tutorId: tutor._id,
//         tutorObj: tutor, // Pass the entire tutor object
//       },
//     })
//   }

//   const handleBookTutor = () => {
//     navigate("/book", {
//       state: {
//         tutorId: tutor._id,
//       },
//     })
//   }

//   return (
//     <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg border border-orange-200 overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white">
//         <h2 className="text-xl font-bold flex items-center">
//           <Shield className="mr-2 h-5 w-5" />
//           Contact & Booking
//         </h2>
//         <p className="text-orange-100 text-sm mt-1">Secure communication channel</p>
//       </div>

//       {/* Contact Info */}
//       <div className="p-5">
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-5 border border-orange-100">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-medium text-gray-700 flex items-center">
//               <Lock className="h-4 w-4 mr-1.5 text-orange-500" />
//               Contact Information
//             </h3>
//             <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Protected</span>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center bg-orange-50 p-3 rounded-lg">
//               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-orange-100">
//                 <Phone className="h-4 w-4 text-orange-600" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center">
//                   <p className="text-gray-800 font-medium">{maskedPhone}</p>
//                   <div className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">Phone</div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-0.5">Revealed after booking</p>
//               </div>
//             </div>

//             <div className="flex items-center bg-orange-50 p-3 rounded-lg">
//               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-orange-100">
//                 <Mail className="h-4 w-4 text-orange-600" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center">
//                   <p className="text-gray-800 font-medium">{maskedEmail}</p>
//                   <div className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">Email</div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-0.5">Revealed after booking</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={handleBookTutor}
//             className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm"
//           >
//             <Calendar className="mr-2 h-5 w-5" />
//             <span>Book a Session</span>
//             <ChevronRight className="ml-2 h-4 w-4" />
//           </button>

//           <button
//             onClick={handleSendMessage}
//             className="w-full bg-white hover:bg-orange-50 border border-orange-200 text-orange-700 font-medium py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm"
//           >
//             <MessageSquare className="mr-2 h-5 w-5" />
//             <span>Send Message</span>
//           </button>
//         </div>

//         {/* Security Note */}
//         <div className="mt-5 bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-100 flex items-start">
//           <Shield className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
//           <div className="ml-2">
//             <p className="text-xs text-gray-600">
//               <span className="font-medium text-orange-700">Privacy Protected:</span> Contact information is only
//               revealed after booking confirmation to ensure privacy and security for both parties.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Phone, Mail, Shield, Lock } from "lucide-react";

export default function ContactCard({ tutor }) {
  // Extract phone number and email
  const phoneNumber = tutor?.tutorData?.PhoneNumber || "N/A";
  const email = tutor?.email || "N/A";

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg border border-orange-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Contact Details
        </h2>
        <p className="text-orange-100 text-sm mt-1">Your information is safe with us</p>
      </div>

      {/* Contact Info */}
      <div className="p-5">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700 flex items-center">
              <Lock className="h-4 w-4 mr-1.5 text-orange-500" />
              Contact Information
            </h3>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Visible</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center bg-orange-50 p-3 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-orange-100">
                <Phone className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="text-gray-800 font-medium">{phoneNumber}</p>
                  <div className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">Phone</div>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-orange-50 p-3 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-orange-100">
                <Mail className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="text-gray-800 font-medium">{email}</p>
                  <div className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">Email</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-5 bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-100 flex items-start">
          <Shield className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div className="ml-2">
            <p className="text-xs text-gray-600">
              <span className="font-medium text-orange-700">Note:</span> These contact details are provided by the tutor and are visible to all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
