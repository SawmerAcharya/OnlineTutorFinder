// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Available from "./Available";
// import TutorSlider from "./TutorSlider";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// function ProfileTutor() {
//   const { tutorId } = useParams(); // Get tutor ID from URL
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     PhoneNumber: "",
//     Qualifications: "",
//     Experience: "",
//     City: "",
//     TeachingMode: "",
//     TeachingLevels: [],
//     aboutMe: "",
//     availability: {},
//   });

//   // Fetch tutor profile on mount
//   useEffect(() => {
//     if (!tutorId) {
//       setError("Tutor ID not found.");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`http://localhost:5001/api/user/tutors/${tutorId}`)
//       .then((response) => {
//         console.log("Tutor data received:", response.data);
//         const data = response.data.tutor?.tutorData;
//         if (!data) {
//           setError("Tutor profile not found.");
//           setLoading(false);
//           return;
//         }
//         // If TeachingLevels is missing in fetched data, fallback to an empty array
//         setFormData({
//           ...data,
//           TeachingLevels: data.TeachingLevels || [],
//           availability: data.availability || {},
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching tutor profile:", err);
//         setError("Failed to load tutor profile.");
//         setLoading(false);
//       });
//   }, [tutorId]);

//   // List of available teaching levels
//   const teachingLevels = [
//     "Primary (Class 1-5)",
//     "L Secondary (Class 6-8)",
//     "Secondary (Class 9-10)",
//     "H Secondary (Class 11-12)",
//     "Bachelor Level",
//     "Masters Level",
//   ];

//   // Toggle a teaching level selection
//   const toggleTeachingLevel = (level) => {
//     setFormData((prev) => {
//       const isSelected = prev.TeachingLevels.includes(level);
//       return {
//         ...prev,
//         TeachingLevels: isSelected
//           ? prev.TeachingLevels.filter((l) => l !== level)
//           : [...prev.TeachingLevels, level],
//       };
//     });
//   };

//   // Update availability state
//   const onAvailabilityChange = (day, timeSlot) => {
//     setFormData((prev) => ({
//       ...prev,
//       availability: {
//         ...prev.availability,
//         [day]: prev.availability[day]?.includes(timeSlot)
//           ? prev.availability[day].filter((slot) => slot !== timeSlot)
//           : [...(prev.availability[day] || []), timeSlot],
//       },
//     }));
//   };

//   // Function to handle save changes via PUT request
//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5001/api/user/tutors/${tutorId}`,
//         { tutorData: formData } 
//       );
//       console.log("Update successful:", response.data);
//       toast.success("Profile updated successfully!");
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating tutor profile:", error);
//       toast.error("Failed to update profile.");
//       alert("Failed to update profile.");
//     }
//   };

//   if (loading)
//     return <div className="text-center text-gray-500">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//           <div className="md:col-span-3">
//             <TutorSlider />
//           </div>

//           <div className="md:col-span-9 bg-white rounded-lg shadow p-6">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Tutor Profile</h1>
//                 <button
//                   onClick={editMode ? handleSave : () => setEditMode(true)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   {editMode ? "Save Changes" : "Edit Profile"}
//                 </button>
//               </div>

//               <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">
//                   Professional Details
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.PhoneNumber}
//                       onChange={(e) =>
//                         setFormData({ ...formData, PhoneNumber: e.target.value })
//                       }
//                       disabled={!editMode}
//                       className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Qualifications
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.Qualifications}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           Qualifications: e.target.value,
//                         })
//                       }
//                       disabled={!editMode}
//                       className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Experience (years)
//                     </label>
//                     <input
//                       type="number"
//                       value={formData.Experience}
//                       onChange={(e) =>
//                         setFormData({ ...formData, Experience: e.target.value })
//                       }
//                       disabled={!editMode}
//                       className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.City}
//                       onChange={(e) =>
//                         setFormData({ ...formData, City: e.target.value })
//                       }
//                       disabled={!editMode}
//                       className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Teaching Mode
//                     </label>
//                     <select
//                       value={formData.TeachingMode}
//                       onChange={(e) =>
//                         setFormData({ ...formData, TeachingMode: e.target.value })
//                       }
//                       disabled={!editMode}
//                       className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                     >
//                       <option value="Online">Online</option>
//                       <option value="In-person">In-person</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Teaching Levels */}
//               <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">
//                   Teaching Levels
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {teachingLevels.map((level) => (
//                     <button
//                       key={level}
//                       onClick={() => editMode && toggleTeachingLevel(level)}
//                       disabled={!editMode}
//                       className={`p-3 border rounded-lg text-center ${
//                         formData.TeachingLevels.includes(level)
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <Available
//                 availability={formData.availability}
//                 editMode={editMode}
//                 onAvailabilityChange={onAvailabilityChange}
//               />

//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">
//                   About Me
//                 </h2>
//                 <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
//                   <textarea
//                     value={formData.aboutMe}
//                     onChange={(e) =>
//                       setFormData({ ...formData, aboutMe: e.target.value })
//                     }
//                     disabled={!editMode}
//                     rows={6}
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none bg-white/80 p-3"
//                     placeholder="Share your teaching philosophy, experience, and what makes you unique as a tutor..."
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileTutor;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Available from "./Available";
import TutorSlider from "./TutorSlider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Save, Briefcase, Phone, Award, Clock, MapPin, Video, CheckCircle, User } from "lucide-react";

function ProfileTutor() {
  const { tutorId } = useParams(); // Get tutor ID from URL
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    PhoneNumber: "",
    Qualifications: "",
    Experience: "",
    City: "",
    TeachingMode: "",
    TeachingLevels: [],
    aboutMe: "",
    availability: {},
  });

  // Fetch tutor profile on mount
  useEffect(() => {
    if (!tutorId) {
      setError("Tutor ID not found.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5001/api/user/tutors/${tutorId}`)
      .then((response) => {
        console.log("Tutor data received:", response.data);
        const data = response.data.tutor?.tutorData;
        if (!data) {
          setError("Tutor profile not found.");
          setLoading(false);
          return;
        }
        // If TeachingLevels is missing in fetched data, fallback to an empty array
        setFormData({
          ...data,
          TeachingLevels: data.TeachingLevels || [],
          availability: data.availability || {},
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutor profile:", err);
        setError("Failed to load tutor profile.");
        setLoading(false);
      });
  }, [tutorId]);

  // List of available teaching levels
  const teachingLevels = [
    "Primary (Class 1-5)",
    "L Secondary (Class 6-8)",
    "Secondary (Class 9-10)",
    "H Secondary (Class 11-12)",
    "Bachelor Level",
    "Masters Level",
  ];

  // Toggle a teaching level selection
  const toggleTeachingLevel = (level) => {
    setFormData((prev) => {
      const isSelected = prev.TeachingLevels.includes(level);
      return {
        ...prev,
        TeachingLevels: isSelected
          ? prev.TeachingLevels.filter((l) => l !== level)
          : [...prev.TeachingLevels, level],
      };
    });
  };

  // Update availability state
  const onAvailabilityChange = (day, timeSlot) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day]?.includes(timeSlot)
          ? prev.availability[day].filter((slot) => slot !== timeSlot)
          : [...(prev.availability[day] || []), timeSlot],
      },
    }));
  };

  // Function to handle save changes via PUT request
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/user/tutors/${tutorId}`, { tutorData: formData });
      console.log("Update successful:", response.data);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating tutor profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-50 to-amber-100 flex justify-center items-center">
        <div className="text-orange-700 text-xl font-medium animate-pulse flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-50 to-amber-100 flex justify-center items-center">
        <div className="text-red-600 text-xl font-medium bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <TutorSlider />
          </div>

          <div className="md:col-span-9">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-6 px-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white">Tutor Profile</h1>
                  <button
                    onClick={editMode ? handleSave : () => setEditMode(true)}
                    className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all shadow-md flex items-center gap-2 font-medium"
                  >
                    {editMode ? (
                      <>
                        <Save className="w-4 h-4" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" /> Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Professional Details */}
                  <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                    <div className="flex items-center space-x-2 mb-6">
                      <Briefcase className="w-5 h-5 text-orange-500" />
                      <h2 className="text-xl font-bold text-gray-800">Professional Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-orange-500" />
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={formData.PhoneNumber}
                          onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
                          disabled={!editMode}
                          className={`block w-full border rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all ${
                            !editMode ? "bg-gray-50 text-gray-500" : "bg-white text-gray-700"
                          } ${editMode && !formData.PhoneNumber ? "border-orange-300 bg-orange-50" : "border-gray-200"}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-orange-500" />
                          Qualifications
                        </label>
                        <input
                          type="text"
                          value={formData.Qualifications}
                          onChange={(e) => setFormData({ ...formData, Qualifications: e.target.value })}
                          disabled={!editMode}
                          className={`block w-full border rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all ${
                            !editMode ? "bg-gray-50 text-gray-500" : "bg-white text-gray-700"
                          } ${
                            editMode && !formData.Qualifications ? "border-orange-300 bg-orange-50" : "border-gray-200"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-orange-500" />
                          Experience (years)
                        </label>
                        <input
                          type="number"
                          value={formData.Experience}
                          onChange={(e) => setFormData({ ...formData, Experience: e.target.value })}
                          disabled={!editMode}
                          className={`block w-full border rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all ${
                            !editMode ? "bg-gray-50 text-gray-500" : "bg-white text-gray-700"
                          } ${editMode && !formData.Experience ? "border-orange-300 bg-orange-50" : "border-gray-200"}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.City}
                          onChange={(e) => setFormData({ ...formData, City: e.target.value })}
                          disabled={!editMode}
                          className={`block w-full border rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all ${
                            !editMode ? "bg-gray-50 text-gray-500" : "bg-white text-gray-700"
                          } ${editMode && !formData.City ? "border-orange-300 bg-orange-50" : "border-gray-200"}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Video className="w-4 h-4 mr-2 text-orange-500" />
                          Teaching Mode
                        </label>
                        <select
                          value={formData.TeachingMode}
                          onChange={(e) => setFormData({ ...formData, TeachingMode: e.target.value })}
                          disabled={!editMode}
                          className={`block w-full border rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all ${
                            !editMode ? "bg-gray-50 text-gray-500" : "bg-white text-gray-700"
                          } ${
                            editMode && !formData.TeachingMode ? "border-orange-300 bg-orange-50" : "border-gray-200"
                          }`}
                        >
                          <option value="">Select Teaching Mode</option>
                          <option value="Online">Online</option>
                          <option value="In-person">In-person</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                
                  <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                    <div className="flex items-center space-x-2 mb-6">
                      <Award className="w-5 h-5 text-orange-500" />
                      <h2 className="text-xl font-bold text-gray-800">Teaching Levels</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {teachingLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => editMode && toggleTeachingLevel(level)}
                          disabled={!editMode}
                          className={`p-4 border rounded-lg text-center transition-all ${
                            !editMode ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                          } ${
                            formData.TeachingLevels.includes(level)
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md border-orange-400"
                              : "bg-white border-gray-200 hover:bg-orange-50"
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <span>{level}</span>
                            {formData.TeachingLevels.includes(level) && (
                              <CheckCircle className="w-4 h-4 ml-2 text-white" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability Component */}
                  <Available
                    availability={formData.availability}
                    editMode={editMode}
                    onAvailabilityChange={onAvailabilityChange}
                  />

                  {/* About Me */}
                  <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                    <div className="flex items-center space-x-2 mb-6">
                      <User className="w-5 h-5 text-orange-500" />
                      <h2 className="text-xl font-bold text-gray-800">About Me</h2>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                      <textarea
                        value={formData.aboutMe}
                        onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                        disabled={!editMode}
                        rows={6}
                        className={`block w-full rounded-lg border shadow-sm focus:border-orange-400 focus:ring-orange-300 resize-none p-4 ${
                          !editMode ? "bg-white/80 text-gray-500" : "bg-white"
                        } ${editMode && !formData.aboutMe ? "border-orange-300" : "border-gray-200"}`}
                        placeholder="Share your teaching philosophy, experience, and what makes you unique as a tutor..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTutor;
