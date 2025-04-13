
// import { useState, useContext, useEffect } from "react"
// import axios from "axios"
// import { AppContent } from "../../../Context/AppContex"
// import {
//   Heart,
//   Star,
//   MapPin,
//   Calendar,
//   CheckCircle,
//   Clock,
//   GraduationCap,
//   ChevronDown,
//   Zap,
//   Award,
//   Languages,
//   Briefcase,
//   MessageSquare,
// } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// export default function HeaderCard({ tutor }) {
//   const [isFavorite, setIsFavorite] = useState(false)
//   const [expanded, setExpanded] = useState(false)
//   const { backendUrl, userData } = useContext(AppContent)
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (userData && tutor?._id) {
//       axios
//         .get(`${backendUrl}/api/favorites/checkFavorite`, {
//           params: { userId: userData._id, tutorId: tutor._id },
//           withCredentials: true,
//         })
//         .then((response) => setIsFavorite(response.data.isFavorite))
//         .catch((error) => console.error("Error checking favorite status:", error))
//     }
//   }, [userData, tutor, backendUrl])

//   const handleBookNow = () => {
//     navigate("/book", {
//       state: {
//         tutorId: tutor._id,
//       },
//     })
//   }

//   const handleSendMessage = () => {
//     navigate("/chat", {
//       state: {
//         tutorId: tutor._id,
//         tutorObj: tutor,
//       },
//     })
//   }

//   const availability = tutor?.tutorData?.availability || {}
//   const availableDaysCount = Object.values(availability).filter((slots) => slots && slots.length > 0).length

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-slate-100">
//       <div className="md:flex">
//         <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 md:w-1/3 relative">
//           <div className="absolute inset-0 opacity-10">
//             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
//               <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
//                 <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
//               </pattern>
//               <rect width="100%" height="100%" fill="url(#grid)" />
//             </svg>
//           </div>

//           <div className="relative z-10 flex flex-col items-center md:items-start">
//             <div className="relative mb-4">
//               <div className="w-28 h-28 rounded-xl bg-white p-1 shadow-lg">
//                 <div className="w-full h-full rounded-lg overflow-hidden bg-orange-100">
//                   <img
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTn5kP8NKJ3_kZczVgSU8RR5qM68RGVcP2QA&s"
//                     alt={tutor.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
//                 <CheckCircle className="h-5 w-5 text-emerald-500 fill-white" />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2 w-full mt-2">
//               <StatCard icon={<Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />} label="Rating" value={tutor.rating || "4.0"} />
//               <StatCard icon={<Clock className="h-3.5 w-3.5 text-emerald-400" />} label="Experience" value={`${tutor.tutorData?.Experience || "N/A"} yrs`} />
//               <StatCard icon={<Calendar className="h-3.5 w-3.5 text-blue-400" />} label="Available" value={`${availableDaysCount}/7 days`} />
//               <StatCard icon={<Zap className="h-3.5 w-3.5 text-purple-400" />} label="Price" value={`₹${tutor.tutorData?.HourlyRate || "N/A"}`} />
//             </div>

//             <div className="flex gap-2 w-full mt-4 md:hidden">
//               <ActionButton icon={<Calendar className="h-4 w-4" />} label="Book Now" onClick={handleBookNow} primary />
//               <ActionButton icon={<MessageSquare className="h-4 w-4" />} label="Send Message" onClick={handleSendMessage} />
//             </div>
//           </div>
//         </div>

//         <div className="p-6 md:p-8 md:w-2/3">
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{tutor.name}</h1>
//                 <p className="text-slate-500 mt-1 flex items-center">
//                   <MapPin className="h-3.5 w-3.5 mr-1.5 inline" />
//                   {tutor.tutorData?.City || "Unknown City"}
//                 </p>
//               </div>

//               <div className="hidden md:flex gap-2">
//                 <ActionButton icon={<Calendar className="h-4 w-4" />} label="Book Now" onClick={handleBookNow} primary />
//                 <ActionButton icon={<MessageSquare className="h-4 w-4" />} label="Send Message" onClick={handleSendMessage} />
//               </div>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-sm font-medium text-slate-500 mb-2">Subjects</h3>
//               <div className="flex flex-wrap gap-2">
//                 {tutor.tutorData?.SelectedSubjects?.map((subject, index) => (
//                   <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
//                     {subject}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
//               <InfoItem icon={<GraduationCap className="h-4 w-4 text-slate-400" />} label="Education" value={(tutor.tutorData?.Qualifications || "Not specified").split(",")[0]} />
//               <InfoItem icon={<Languages className="h-4 w-4 text-slate-400" />} label="Languages" value={(tutor.tutorData?.languages || ["English"]).join(", ")} />
//               <InfoItem icon={<Briefcase className="h-4 w-4 text-slate-400" />} label="Teaching Mode" value={tutor.tutorData?.TeachingMode || "Online & Offline"} />
//             </div>

//             <div className="mt-auto pt-4">
//               <button
//                 onClick={() => setExpanded(!expanded)}
//                 className="w-full flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-slate-700"
//               >
//                 {expanded ? "Show less" : "Show more"}
//                 <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
//               </button>

//               {expanded && (
//                 <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
//                   <h3 className="text-sm font-medium text-slate-500 mb-2">About</h3>
//                   <p className="text-slate-600 text-sm">
//                     {tutor.tutorData?.aboutMe ||
//                       "An experienced tutor dedicated to helping students achieve their academic goals through personalized learning approaches."}
//                   </p>

//                   <div className="mt-4 flex gap-2">
//                     <ActionButton icon={<MessageSquare className="h-4 w-4" />} label="Send Message" onClick={handleSendMessage} />
//                     <ActionButton icon={<Calendar className="h-4 w-4" />} label="Book Now" onClick={handleBookNow} primary />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function StatCard({ icon, label, value }) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-3 text-center">
//       <div className="mb-2">{icon}</div>
//       <p className="text-xs text-slate-500">{label}</p>
//       <p className="text-lg font-semibold text-slate-700">{value}</p>
//     </div>
//   )
// }

// function ActionButton({ icon, label, onClick, primary }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full ${primary ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white border text-blue-600 hover:bg-blue-50 border-blue-200"} font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
//     >
//       {icon}
//       <span className="text-sm">{label}</span>
//     </button>
//   )
// }

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2">
//       {icon}
//       <div>
//         <p className="text-xs text-slate-500">{label}</p>
//         <p className="font-semibold text-sm text-slate-700">{value}</p>
//       </div>
//     </div>
//   )
// }

import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AppContent } from "../../../Context/AppContex"
import {
  Heart,
  Star,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  ChevronDown,
  Zap,
  Award,
  Languages,
  Briefcase,
  MessageSquare,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function HeaderCard({ tutor }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { backendUrl, userData } = useContext(AppContent)
  const navigate = useNavigate()

  useEffect(() => {
    if (userData && tutor?._id) {
      axios
        .get(`${backendUrl}/api/favorites/checkFavorite`, {
          params: { userId: userData._id, tutorId: tutor._id },
          withCredentials: true,
        })
        .then((response) => setIsFavorite(response.data.isFavorite))
        .catch((error) => console.error("Error checking favorite status:", error))
    }
  }, [userData, tutor, backendUrl])

  const handleBookNow = () => {
    navigate("/TutorBook", {
      state: {
        tutorId: tutor._id,
      },
    })
  }

  const handleSendMessage = () => {
    navigate("/chat", {
      state: {
        tutorId: tutor._id,
        tutorObj: tutor,
      },
    })
  }

  const availability = tutor?.tutorData?.availability || {}
  const availableDaysCount = Object.values(availability).filter((slots) => slots && slots.length > 0).length

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-slate-100">
      <div className="md:flex">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 md:w-1/3 relative">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center md:items-start">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-lg overflow-hidden bg-orange-100">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTn5kP8NKJ3_kZczVgSU8RR5qM68RGVcP2QA&s"
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                <CheckCircle className="h-5 w-5 text-emerald-500 fill-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <StatCard icon={<Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />} label="Rating" value={tutor.rating || "4.0"} />
              <StatCard icon={<Clock className="h-3.5 w-3.5 text-emerald-400" />} label="Experience" value={`${tutor.tutorData?.Experience || "N/A"} yrs`} />
              <StatCard icon={<Calendar className="h-3.5 w-3.5 text-blue-400" />} label="Available" value={`${availableDaysCount}/7 days`} />
              <StatCard icon={<Zap className="h-3.5 w-3.5 text-purple-400" />} label="Price" value={`₹${tutor.tutorData?.HourlyRate || "N/A"}`} />
            </div>

            <div className="flex gap-2 w-full mt-4 md:hidden">
              <ActionButton icon={<Calendar className="h-4 w-4" />} label="Book Now" onClick={handleBookNow} primary />
              <ActionButton icon={<MessageSquare className="h-4 w-4" />} label="Send Message" onClick={handleSendMessage} />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 md:w-2/3">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{tutor.name}</h1>
                <p className="text-slate-500 mt-1 flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 inline" />
                  {tutor.tutorData?.City || "Unknown City"}
                </p>
              </div>

              <div className="hidden md:flex gap-2">
                <ActionButton icon={<Calendar className="h-4 w-4" />} label="Book Now" onClick={handleBookNow} primary />
                <ActionButton icon={<MessageSquare className="h-4 w-4" />} label="Send Message" onClick={handleSendMessage} />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-500 mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.tutorData?.SelectedSubjects?.map((subject, index) => (
                  <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoItem icon={<GraduationCap className="h-4 w-4 text-slate-400" />} label="Education" value={(tutor.tutorData?.Qualifications || "Not specified").split(",")[0]} />
              <InfoItem icon={<Languages className="h-4 w-4 text-slate-400" />} label="Languages" value={(tutor.tutorData?.languages || ["English"]).join(", ")} />
              <InfoItem icon={<Briefcase className="h-4 w-4 text-slate-400" />} label="Teaching Mode" value={tutor.tutorData?.TeachingMode || "Online & Offline"} />
            </div>

            <div className="mt-auto pt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-slate-700"
              >
                {expanded ? "Show less" : "Show more"}
                <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>

              {expanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                  <h3 className="text-sm font-medium text-slate-500 mb-2">About</h3>
                  <p className="text-slate-600 text-sm">
                    {tutor.tutorData?.aboutMe ||
                      "An experienced tutor dedicated to helping students achieve their academic goals through personalized learning approaches."}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <ActionButton icon={<MessageSquare className="h-4 w-4" />} label="Send Message" onClick={handleSendMessage} />
                    <ActionButton icon={<Calendar className="h-4 w-4" />} label="Book Now" onClick={handleBookNow} primary />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 text-center">
      <div className="mb-2">{icon}</div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-slate-700">{value}</p>
    </div>
  )
}

function ActionButton({ icon, label, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      className={`w-full ${primary ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border text-orange-600 hover:bg-orange-50 border-orange-200"} font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-sm text-slate-700">{value}</p>
      </div>
    </div>
  )
}
