// import React, { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { AppContent } from "../../Context/AppContex";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function TopTutors() {
//   const { backendUrl } = useContext(AppContent);
//   const [tutors, setTutors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTutors = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/user/tutors`, {
//           withCredentials: true, // Ensures authentication cookies are sent
//         });

//         if (response.data && Array.isArray(response.data.tutors)) {
//           console.log("Fetched Tutors:", response.data.tutors);
//           setTutors(response.data.tutors);
//           if (response.data.tutors.length > 0) {
//             toast.success("Tutors fetched successfully!", {
//               toastId: "fetch-success",
//             });
//           } else {
//             toast.info("No tutors found.", { toastId: "fetch-info" });
//           }
//         } else {

//           toast.info("No tutors found ", {
//             toastId: "fetch-info",
//           });
//         }
//       } catch (error) {
//         console.error(" Error fetching tutors:", error);
//         toast.error("Failed to fetch tutors. Please try again.", {
//           toastId: "fetch-error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     // const fetchTutors = async () => {
//     //   try {
//     //     const response = await axios.get(`${backendUrl}/api/user/tutors`, {
//     //       withCredentials: true,
//     //     });

//     //     if (response.data && Array.isArray(response.data.tutors)) {
//     //       console.log("Fetched Tutors:", response.data.tutors);
//     //       response.data.tutors.forEach(tutor => console.log(`${tutor.name} - Status: ${tutor.status}`)); // This will log each tutor's name and status

//     //       setTutors(response.data.tutors);
//     //       if (response.data.tutors.length > 0) {
//     //         toast.success("Tutors fetched successfully!", {
//     //           toastId: "fetch-success",
//     //         });
//     //       } else {
//     //         toast.info("No tutors found.", { toastId: "fetch-info" });
//     //       }
//     //     } else {
//     //       toast.info("No tutors found.", { toastId: "fetch-info" });
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching tutors:", error);
//     //     toast.error("Failed to fetch tutors. Please try again.", {
//     //       toastId: "fetch-error",
//     //     });
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     fetchTutors();
//   }, [backendUrl]);

//   return (
//     <div className="bg-white shadow rounded-lg p-4 mt-5">
//       <h3 className="text-lg font-semibold mb-4">Registered Tutors</h3>
//       {loading ? (
//         <p className="text-center text-gray-500">Loading tutors...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left text-gray-500">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//               <tr>
//                 <th className="py-3 px-6">Tutor</th>
//                 <th className="py-3 px-6">Email</th>
//                 <th className="py-3 px-6">Subjects</th>
//                 <th className="py-3 px-6">Approval Status</th>
//                 <th className="py-3 px-6">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tutors.length > 0 ? (
//                 tutors.map((tutor) => (
//                   <tr key={tutor._id} className="bg-white border-b">
//                     <td className="py-4 px-6 font-medium text-gray-900">
//                       {tutor.name}
//                     </td>
//                     <td className="py-4 px-6">{tutor.email}</td>
//                     <td className="py-4 px-6">
//                       {tutor.tutorData?.CurrentSubject || "N/A"}
//                     </td>

//                     <td className="py-4 px-6">
//                       <span
//                         className={`font-semibold ${
//                           tutor.isApproved ? "text-green-600" : "text-red-600"
//                         }`}
//                       >
//                         {tutor.isApproved ? "Approved" : "Pending"}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <Link
//                         to={`/profile/${tutor._id}`} // Pass tutor ID to the profile route
//                         className="text-blue-600 hover:underline"
//                       >
//                         View Profile
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-gray-500">
//                     No tutors registered yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TopTutors;


import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TopTutors() {
  const { backendUrl } = useContext(AppContent);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/tutors`, {
          withCredentials: true,
        });

        if (response.data && Array.isArray(response.data.tutors)) {
          // console.log("Fetched Tutors:", response.data.tutors);
          setTutors(response.data.tutors);
          if (response.data.tutors.length > 0) {
            toast.success("Tutors fetched successfully!", {
              toastId: "fetch-success",
            });
          } else {
            toast.info("No tutors found.", { toastId: "fetch-info" });
          }
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

    fetchTutors();
  }, [backendUrl]);

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-5">
      <h3 className="text-lg font-semibold mb-4">Registered Tutors</h3>
      {loading ? (
        <p className="text-center text-gray-500">Loading tutors...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Tutor</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Subjects</th>
                <th className="py-3 px-6">Approval Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.length > 0 ? (
                tutors.map((tutor) => (
                  <tr key={tutor._id} className="bg-white border-b">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {tutor.name}
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
                          ? tutor.tutorData.status.charAt(0).toUpperCase() +
                            tutor.tutorData.status.slice(1)
                          : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/profile/${tutor._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No tutors registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TopTutors;
