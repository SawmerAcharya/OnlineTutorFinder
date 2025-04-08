
// import { Avatar } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import { IoLanguage, IoEye } from "react-icons/io5";
// import { IoMdSchool } from "react-icons/io";

// export default function TutorCard({ tutor, onViewProfile }) {
//   const navigate = useNavigate();

//   const handleViewProfile = () => {
//     if (onViewProfile) {
//       onViewProfile(tutor._id);
//     } else {
//       navigate(`/tutor/${tutor._id}`);
//     }
//   };

//   return (
//     <div className="rounded-2xl shadow-sm border bg-white max-w-md w-full overflow-hidden">
//       {/* Top Section */}
//       <div className="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center bg-gradient-to-br from-orange-50 to-pink-50 relative">
//         {/* Avatar */}
//         <Avatar
//           src={
//             tutor?.profile
//               ? `https://utfs.io/f/${tutor.profile}`
//               : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTn5kP8NKJ3_kZczVgSU8RR5qM68RGVcP2QA&s"
//           }
//           alt={tutor.name}
//           sx={{ width: 60, height: 60 }}
//           className="border-2 border-white shadow-sm"
//         />

//         {/* Name + Location + Rating */}
//         <div className="flex flex-col justify-center">
//           <h2 className="text-lg font-bold text-gray-800">{tutor.name}</h2>
//           <div className="flex items-center text-sm text-gray-600">
//             <FaMapMarkerAlt className="mr-1" />
//             {tutor.tutorData?.City || "Unknown Location"}
//           </div>
//           <div className="flex items-center text-sm text-yellow-500">
//             <FaStar className="mr-1" />
//             {tutor.rating || "4.0"} ({tutor?.reviewsCount || 15})
//           </div>
//         </div>

//         {/* Hourly Rate */}
//         <div className="text-center px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm font-semibold">
//           <div>HOURLY</div>
//           <div className="text-lg font-bold">₹{tutor.tutorData?.HourlyRate || "N/A"}</div>
//         </div>
//       </div>

//       {/* Subject Tags */}
//       <div className="flex flex-wrap gap-2 px-4 pt-3">
//         {tutor.tutorData?.SelectedSubjects?.length > 0 ? (
//           tutor.tutorData.SelectedSubjects.map((subject, i) => (
//             <span
//               key={i}
//               className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
//             >
//               {subject}
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-400 text-sm">No subjects listed</span>
//         )}
//       </div>

//       {/* Experience / Mode / Language */}
//       <div className="grid grid-cols-3 text-center py-4 text-sm mt-2 border-b">
//         <div>
//           <div className="font-semibold text-gray-800">
//             <FaClock className="inline text-orange-500 mr-1" />
//             {tutor.tutorData?.Experience || "N/A"} years
//           </div>
//           <div className="text-xs text-gray-500 mt-1">Experience</div>
//         </div>
//         <div>
//           <div className="font-semibold text-gray-800">
//             {tutor.tutorData?.TeachingMode || "N/A"}
//           </div>
//           <div className="text-xs text-gray-500 mt-1">Mode</div>
//         </div>
//         <div>
//           <div className="font-semibold text-gray-800">
//             {tutor.languages || "N/A"}
//           </div>
//           <div className="text-xs text-gray-500 mt-1">Languages</div>
//         </div>
//       </div>

//       {/* Full Info Section (Always Visible) */}
//       <div className="px-4 py-4 text-sm text-gray-800 space-y-3">
//         {/* Qualifications */}
//         <div>
//           <div className="font-semibold flex items-center gap-1">
//             <IoMdSchool className="text-orange-500" />
//             Qualifications
//           </div>
//           <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
//             {(tutor.tutorData?.Qualifications || "Not Provided")
//               .split(",")
//               .map((q, i) => (
//                 <li key={i}>{q}</li>
//               ))}
//           </ul>
//         </div>

//         {/* Teaching Style */}
//         {tutor.tutorData?.TeachingStyle && (
//           <div>
//             <div className="font-semibold">Teaching Style</div>
//             <p className="text-gray-700 mt-1 text-sm">
//               {tutor.tutorData.TeachingStyle}
//             </p>
//           </div>
//         )}

//         {/* Languages (Detailed) */}
//         {Array.isArray(tutor.tutorData?.SpokenLanguages) && (
//           <div>
//             <div className="font-semibold">Languages</div>
//             <div className="flex flex-wrap gap-2 mt-1">
//               {tutor.tutorData.SpokenLanguages.map((lang, i) => (
//                 <span
//                   key={i}
//                   className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
//                 >
//                   {lang}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* View Profile Button */}
//       <div className="px-4 pb-4">
//         <button
//           onClick={handleViewProfile}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-full flex items-center justify-center gap-2 transition"
//         >
//           <IoEye className="text-lg" />
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// }

import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { IoLanguage, IoEye } from "react-icons/io5";
import { IoMdSchool } from "react-icons/io";

export default function TutorCard({ tutor, onViewProfile }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(tutor._id);
    } else {
      navigate(`/tutor/${tutor._id}`);
    }
  };

  return (
    <div className="rounded-2xl shadow-sm border bg-white max-w-md w-full overflow-hidden">
      {/* Top Section */}
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 text-center px-6 pt-6 pb-4 relative">
        <Avatar
          src={
            tutor?.profile
              ? `https://utfs.io/f/${tutor.profile}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTn5kP8NKJ3_kZczVgSU8RR5qM68RGVcP2QA&s"
          }
          alt={tutor.name}
          sx={{ width: 80, height: 80 }}
          className="mx-auto border-4 border-white shadow-md"
        />

        <h2 className="text-xl font-bold mt-3 text-gray-800">{tutor.name}</h2>

        <div className="flex justify-center items-center text-sm text-gray-600 mt-1 gap-1">
          <FaMapMarkerAlt />
          <span>{tutor.tutorData?.City || "Unknown Location"}</span>
        </div>

        <div className="flex justify-center items-center text-sm text-yellow-500 mt-1 gap-1">
          <FaStar />
          <span>{tutor.rating || "4.0"} ({tutor?.reviewsCount || 15})</span>
        </div>

        <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-semibold">
          <div>HOURLY</div>
          <div className="text-lg font-bold">₹{tutor.tutorData?.HourlyRate || "N/A"}</div>
        </div>
      </div>

      {/* Subject Tags */}
      <div className="flex flex-wrap gap-2 px-4 pt-3">
        {tutor.tutorData?.SelectedSubjects?.length > 0 ? (
          tutor.tutorData.SelectedSubjects.map((subject, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
            >
              {subject}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">No subjects listed</span>
        )}
      </div>

      {/* Experience / Mode / Language */}
      <div className="grid grid-cols-3 text-center py-4 text-sm mt-2 border-b">
        <div>
          <div className="font-semibold text-gray-800">
            <FaClock className="inline text-orange-500 mr-1" />
            {tutor.tutorData?.Experience || "N/A"} years
          </div>
          <div className="text-xs text-gray-500 mt-1">Experience</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {tutor.tutorData?.TeachingMode || "N/A"}
          </div>
          <div className="text-xs text-gray-500 mt-1">Mode</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {tutor.languages || "N/A"}
          </div>
          <div className="text-xs text-gray-500 mt-1">Languages</div>
        </div>
      </div>

      {/* Full Info Section */}
      <div className="px-4 py-4 text-sm text-gray-800 space-y-3">
        {/* Qualifications */}
        <div>
          <div className="font-semibold flex items-center gap-1">
            <IoMdSchool className="text-orange-500" />
            Qualifications
          </div>
          <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
            {(tutor.tutorData?.Qualifications || "Not Provided")
              .split(",")
              .map((q, i) => (
                <li key={i}>{q}</li>
              ))}
          </ul>
        </div>

        {/* Teaching Style */}
        {tutor.tutorData?.TeachingStyle && (
          <div>
            <div className="font-semibold">Teaching Style</div>
            <p className="text-gray-700 mt-1 text-sm">
              {tutor.tutorData.TeachingStyle}
            </p>
          </div>
        )}

        {/* Languages (Detailed) */}
        {Array.isArray(tutor.tutorData?.SpokenLanguages) && (
          <div>
            <div className="font-semibold">Languages</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {tutor.tutorData.SpokenLanguages.map((lang, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View Profile Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleViewProfile}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full flex items-center justify-center gap-2 transition"
        >
          <IoEye className="text-lg" />
          View Profile
        </button>
      </div>
    </div>
  );
}
