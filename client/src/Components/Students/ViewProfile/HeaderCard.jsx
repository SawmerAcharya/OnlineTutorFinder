// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AppContent } from "../../../Context/AppContex";
// import {
//   Heart,
//   Star,
//   MapPin,
//   Globe,
//   Calendar,
//   CheckCircle,
// } from "lucide-react";

// export default function HeaderCard({ tutor }) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const { backendUrl, userData } = useContext(AppContent);

//   useEffect(() => {
//     console.log("User data loaded:", userData);
//   }, [userData]);

//   const handleSaveFavorite = async () => {
//     if (!userData || !userData._id) {
//       console.error("User not logged in or user data not loaded.");
//       alert("Please log in to save favorites.");
//       return;
//     }

//     // Handle case where tutorData might be null
//     if (!tutor || !tutor._id) {
//       console.error("Tutor data is invalid.");
//       alert("Invalid tutor data.");
//       return;
//     }

//     console.log("userId:", userData._id);
//     console.log("tutorId:", tutor._id);

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/favorites/AddFavorites`,
//         {
//           userId: userData._id,
//           tutorId: tutor._id,
//         },
//         { withCredentials: true }
//       );

//       console.log("Favorite saved successfully:", response.data);
//       setIsFavorite(true);
//     } catch (error) {
//       console.error(
//         "Error saving favorite:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   if (!userData) {
//     return <div>Loading user data...</div>; // or some other loading indicator
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
//       <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-32 md:h-48 relative">
//         <div className="absolute -bottom-16 left-6 md:left-8">
//           <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-white p-1.5 shadow-lg">
//             <div className="w-full h-full rounded-lg overflow-hidden">
//               {/* <img
//                 src={tutor.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"}
//                 alt={tutor.name}
//                 className="w-full h-full object-cover"
//               /> */}

//               <img
//                 src={
//                   tutor.tutorData?.profile
//                     ? `https://utfs.io/f/${tutor.tutorData.profile}`
//                     : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
//                 }
//                 alt={tutor.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="pt-20 pb-6 px-6 md:px-8">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                 {tutor.name}
//               </h1>
//               <span className="bg-blue-500 text-white p-0.5 rounded-full">
//                 <CheckCircle size={16} />
//               </span>
//             </div>

//             <div className="mt-3 flex flex-wrap gap-3">
//               <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
//                 <MapPin size={14} className="mr-1.5 text-indigo-500" />
//                 <span>{tutor.tutorData?.City || "Unknown City"}</span>
//               </div>
//               <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
//                 <Globe size={14} className="mr-1.5 text-indigo-500" />
//                 <span>
//                   {tutor.tutorData?.languages?.join(", ") || "Not Provided"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
//             <div className="flex items-center gap-2">
//               <div className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg font-semibold flex items-center">
//                 <Star
//                   size={16}
//                   className="fill-amber-500 text-amber-500 mr-1"
//                 />
//                 <span>{tutor.rating || "4.0"}</span>
//               </div>
//               <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
//                 <span>Rs. {tutor.tutorData?.HourlyRate || "N/A"}</span>
//                 <span className="text-xs text-blue-500 ml-1">/hr</span>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded-lg transition-colors flex items-center">
//                 <Calendar size={16} className="mr-2" />
//                 Book a session
//               </button>
//               <button
//                 onClick={handleSaveFavorite}
//                 className={`${
//                   isFavorite
//                     ? "bg-indigo-600 text-white"
//                     : "bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-600"
//                 } font-medium py-1.5 px-4 rounded-lg transition-colors flex items-center`}
//               >
//                 <Heart size={16} className="mr-2" />
//                 {isFavorite ? "Saved" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContent } from "../../../Context/AppContex";
import {
  Heart,
  Star,
  MapPin,
  Globe,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function HeaderCard({ tutor }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { backendUrl, userData } = useContext(AppContent);

  // Check the favorite status when the component loads or userData/tutor changes
  useEffect(() => {
    if (userData && tutor && tutor._id) {
      axios
        .get(`${backendUrl}/api/favorites/checkFavorite`, {
          params: { userId: userData._id, tutorId: tutor._id },
          withCredentials: true,
        })
        .then((response) => {
          setIsFavorite(response.data.isFavorite);
        })
        .catch((error) => {
          console.error("Error checking favorite status:", error);
        });
    }
  }, [userData, tutor, backendUrl]);

  useEffect(() => {
    console.log("User data loaded:", userData);
  }, [userData]);

  const handleToggleFavorite = async () => {
    if (!userData || !userData._id) {
      console.error("User not logged in or user data not loaded.");
      alert("Please log in to save favorites.");
      return;
    }

    // Check if tutor data exists
    if (!tutor || !tutor._id) {
      console.error("Tutor data is invalid.");
      alert("Invalid tutor data.");
      return;
    }

    console.log("userId:", userData._id);
    console.log("tutorId:", tutor._id);

    // If already saved, remove from favorites
    if (isFavorite) {
      try {
        const response = await axios.delete(
          `${backendUrl}/api/favorites/RemoveFavorites/${tutor._id}`,
          {
            data: { userId: userData._id },
            withCredentials: true,
          }
        );
        console.log("Favorite removed successfully:", response.data);
        setIsFavorite(false);
      } catch (error) {
        console.error(
          "Error removing favorite:",
          error.response?.data || error.message
        );
      }
    } else {
      // If not saved, add to favorites
      try {
        const response = await axios.post(
          `${backendUrl}/api/favorites/AddFavorites`,
          {
            userId: userData._id,
            tutorId: tutor._id,
          },
          { withCredentials: true }
        );
        console.log("Favorite saved successfully:", response.data);
        setIsFavorite(true);
      } catch (error) {
        console.error(
          "Error saving favorite:",
          error.response?.data || error.message
        );
      }
    }
  };

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-32 md:h-48 relative">
        <div className="absolute -bottom-16 left-6 md:left-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-white p-1.5 shadow-lg">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src={
                  tutor?.profile
                    ? `https://utfs.io/f/${tutor.profile}`
                    : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
                }
                alt={tutor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-6 px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {tutor.name}
              </h1>
              <span className="bg-blue-500 text-white p-0.5 rounded-full">
                <CheckCircle size={16} />
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <MapPin size={14} className="mr-1.5 text-indigo-500" />
                <span>{tutor.tutorData?.City || "Unknown City"}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <Globe size={14} className="mr-1.5 text-indigo-500" />
                <span>
                  {tutor.tutorData?.languages?.join(", ") || "Not Provided"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <div className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg font-semibold flex items-center">
                <Star size={16} className="fill-amber-500 text-amber-500 mr-1" />
                <span>{tutor.rating || "4.0"}</span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                <span>Rs. {tutor.tutorData?.HourlyRate || "N/A"}</span>
                <span className="text-xs text-blue-500 ml-1">/hr</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded-lg transition-colors flex items-center">
                <Calendar size={16} className="mr-2" />
                Book a session
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`${
                  isFavorite
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-600"
                } font-medium py-1.5 px-4 rounded-lg transition-colors flex items-center`}
              >
                <Heart size={16} className="mr-2" />
                {isFavorite ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
