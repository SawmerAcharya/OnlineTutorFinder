// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import SlideBars from "./SlideBars";
// import Nav from "./Nav";
// import { IoEyeOutline } from "react-icons/io5";
// import axios from "axios";
// import { AppContent } from "../../Context/AppContex";

// function Bookinglist() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { userData, backendUrl } = useContext(AppContent);
//   const tutorId = userData?._id;

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!tutorId) {
//         console.log("Tutor ID not available yet.");
//         return;
//       }

//       console.log("Fetching bookings for tutorId:", tutorId);
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `${backendUrl}/api/bookings/tutor/getBooking/${tutorId}`
//         );

//         if (data.success) {
//           setBookings(data.data);
//           console.log("Bookings fetched:", data.data);
//         } else {
//           console.error("Failed to fetch bookings");
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching bookings:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [tutorId, backendUrl]);

//   const filteredBookings = bookings.filter(
//     (booking) =>
//       booking.userId &&
//       booking.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <SlideBars />
//       <div className="flex flex-col flex-grow">
//         <Nav setSearchTerm={setSearchTerm} />
//         <div className="p-5">
//           <div className="bg-white shadow rounded-lg p-4 relative">
//             <h3 className="text-lg font-semibold mb-4">Booking List</h3>

//             {loading ? (
//               <p className="text-center text-gray-500">Loading bookings...</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left text-gray-500">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                     <tr>
//                       <th className="py-3 px-6">Full Name</th>
//                       <th className="py-3 px-6">Mode</th>
//                       <th className="py-3 px-6">Start Date</th>
//                       <th className="py-3 px-6">End Date</th>
//                       <th className="py-3 px-6">Status</th>
//                       <th className="py-3 px-6 text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredBookings.length > 0 ? (
//                       filteredBookings.map((booking) => (
//                         <tr key={booking._id} className="bg-white border-b">
//                           <td className="py-4 px-6 font-medium text-gray-900 flex items-center">
//                             <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
//                               {booking.userId.profile ? (
//                                 <img
//                                   src={`https://utfs.io/f/${booking.userId.profile}`}
//                                   alt="Profile"
//                                   className="w-full h-full object-cover rounded-full"
//                                 />
//                               ) : (
//                                 booking.userId.name?.charAt(0)
//                               )}
//                             </span>
//                             <span className="ml-2">
//                               {booking.userId?.name || "No User"}
//                             </span>
//                           </td>
//                           <td className="py-4 px-6 capitalize">
//                             {booking.mode}
//                           </td>
//                           <td className="py-4 px-6">
//                             {formatDate(booking.startDate)}
//                           </td>
//                           <td className="py-4 px-6">
//                             {formatDate(booking.endDate)}
//                           </td>
//                           <td className="py-4 px-6">
//                             <span
//                               className={`text-sm font-medium px-2 py-1 rounded-full
//                                 ${
//                                   booking.status ===
//                                   "payment-received-awaiting-tutor-confirmation"
//                                     ? "bg-yellow-100 text-yellow-800"
//                                     : booking.status ===
//                                       "payment-received-and-tutor-confirmed"
//                                     ? "bg-green-100 text-green-800"
//                                     : booking.status ===
//                                       "refunded-and-cancelled"
//                                     ? "bg-red-100 text-red-800"
//                                     : "bg-gray-100 text-gray-800"
//                                 }
//                               `}
//                             >
//                               {booking.status.replace(/-/g, " ")}
//                             </span>
//                           </td>

//                           <td className="py-4 px-6 text-center">
//                             <Link
//                               to={`/BookingViewDetails/${booking._id}`}
//                               className="text-blue-600 hover:underline flex justify-center items-center"
//                             >
//                               <IoEyeOutline className="mr-1 text-blue-500" />
//                               View Details
//                             </Link>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="6"
//                           className="py-4 px-6 text-center text-gray-500"
//                         >
//                           No bookings found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Bookinglist;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import SlideBars from "./SlideBars";
import { AppContent } from "../../Context/AppContex";

function Bookinglist() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData, backendUrl } = useContext(AppContent);
  const tutorId = userData?._id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!tutorId) return;
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/bookings/tutor/getBooking/${tutorId}`);
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [tutorId, backendUrl]);

  const filteredBookings = bookings.filter((booking) =>
    booking.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <SlideBars />
      <div className="flex flex-col flex-grow">
        <Nav setSearchTerm={setSearchTerm} />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">Bookings</h2>
                <p className="text-sm text-gray-500">Track your student sessions easily</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search students..."
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-indigo-100 text-indigo-800">
                  <tr>
                    <th className="px-6 py-3 font-medium">Student</th>
                    <th className="px-6 py-3 font-medium">Mode</th>
                    <th className="px-6 py-3 font-medium">Start</th>
                    <th className="px-6 py-3 font-medium">End</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 text-center font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        <div className="animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
                      </td>
                    </tr>
                  ) : filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking._id} className="border-t hover:bg-indigo-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={booking.userId.profile ? `https://utfs.io/f/${booking.userId.profile}` : "https://via.placeholder.com/40"}
                            alt={booking.userId.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-medium text-gray-800">{booking.userId.name}</span>
                        </td>
                        <td className="px-6 py-4 capitalize">{booking.mode}</td>
                        <td className="px-6 py-4">{formatDate(booking.startDate)}</td>
                        <td className="px-6 py-4">{formatDate(booking.endDate)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                            booking.status === "payment-received-awaiting-tutor-confirmation"
                              ? "bg-yellow-200 text-yellow-800"
                              : booking.status === "payment-received-and-tutor-confirmed"
                              ? "bg-green-200 text-green-800"
                              : booking.status === "refunded-and-cancelled"
                              ? "bg-red-200 text-red-800"
                              : "bg-gray-200 text-gray-800"
                          }`}>
                            {booking.status.replace(/-/g, " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            to={`/BookingViewDetails/${booking._id}`}
                            className="text-indigo-600 font-medium hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-400">
                        <UserRound className="w-6 h-6 mx-auto mb-2" />
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookinglist;
