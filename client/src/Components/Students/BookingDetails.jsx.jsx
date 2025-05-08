
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Calendar,
//   Clock,
//   MessageSquare,
//   Timer,
//   ArrowLeft,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// function InfoBlock({ icon: Icon, label, value }) {
//   return (
//     <div className="bg-gray-50 rounded-lg p-5 hover:bg-violet-50 transition-colors">
//       <div className="flex items-start">
//         <div className="bg-violet-100 p-3 rounded-full mr-4">
//           <Icon size={20} className="text-violet-600" />
//         </div>
//         <div>
//           <p className="text-sm text-gray-500 mb-1">{label}</p>
//           <p className="font-medium text-gray-900">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const getStatusBadgeStyles = (status) => {
//   const base =
//     "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium";
//   if (status.includes("confirmed"))
//     return `${base} bg-emerald-50 text-emerald-700 border border-emerald-200`;
//   if (status.includes("cancelled") || status.includes("refunded"))
//     return `${base} bg-red-50 text-red-700 border border-red-200`;
//   if (status.includes("pending"))
//     return `${base} bg-amber-50 text-amber-700 border border-amber-200`;
//   return `${base} bg-violet-50 text-violet-700 border border-violet-200`;
// };

// const getStatusIcon = (status) => {
//   if (status.includes("confirmed"))
//     return <CheckCircle size={16} className="text-emerald-600" />;
//   if (status.includes("cancelled") || status.includes("refunded"))
//     return <XCircle size={16} className="text-red-600" />;
//   return <AlertCircle size={16} className="text-amber-600" />;
// };

// function BookingDetails() {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const formatDate = (iso) =>
//     new Date(iso).toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });

//   useEffect(() => {
//     async function fetchBooking() {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `http://localhost:5001/api/bookings/${bookingId}`
//         );
//         if (res.data.success) setBooking(res.data.data);
//         else setError(res.data.message || "Failed to load booking");
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (bookingId) fetchBooking();
//   }, [bookingId]);

//   const handleConfirmAndClose = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5001/api/bookings/studentClose/${bookingId}`,
//         { action: "confirm" },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = response.data;

//       console.log("just check:", data);

//       if (data.success) {
//         setBooking(data.booking); // update booking info in UI
//         toast.success(data.message || "Booking confirmed and closed.");
//         setTimeout(() => navigate("/mybooking"), 1200);
//       } else {
//         toast.error("Failed to confirm and close booking.");
//       }
//     } catch (error) {
//       console.error("Error confirming and closing booking:", error);
//       toast.error("An error occurred while confirming.");
//     }
//   };

//   const handleRejectAndClose = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5001/api/bookings/studentClose/${bookingId}`,
//         { action: "reject" },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = response.data;

//       if (data.success) {
//         setBooking(data.booking); // update booking info in UI
//         toast.success(data.message); // show success toast
//         setTimeout(() => navigate("/mybooking"), 1200);
//       } else {
//         toast.error("Failed to reject and close booking.");
//       }
//     } catch (error) {
//       console.error("Error rejecting and closing booking:", error);
//       toast.error("An error occurred.");
//     }
//   };

//   const handleAction = async (newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:5001/api/bookings/${bookingId}/status`,
//         { status: newStatus }
//       );
//       setBooking((prev) => ({ ...prev, status: newStatus }));
//     } catch (err) {
//       console.error("Failed to update booking:", err);
//       alert("Failed to update status.");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-12 w-12 bg-violet-200 rounded-full mb-4"></div>
//           <div className="h-4 w-48 bg-violet-200 rounded mb-2"></div>
//           <div className="h-3 w-32 bg-violet-200 rounded"></div>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-red-100">
//           <div className="flex flex-col items-center text-center">
//             <div className="bg-red-100 p-3 rounded-full mb-4">
//               <AlertCircle className="text-red-600" size={32} />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">
//               Error Loading Booking
//             </h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <button
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium flex items-center"
//             >
//               <ArrowLeft size={16} className="mr-2" /> Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );

//   if (!booking)
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-violet-100">
//           <div className="flex flex-col items-center text-center">
//             <div className="bg-violet-100 p-3 rounded-full mb-4">
//               <AlertCircle className="text-violet-600" size={32} />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">No Booking Found</h2>
//             <p className="text-gray-600 mb-6">
//               That booking doesn’t exist or was removed.
//             </p>
//             <button
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-violet-100 hover:bg-violet-200 rounded-lg text-violet-700 font-medium flex items-center"
//             >
//               <ArrowLeft size={16} className="mr-2" /> Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );

//   const { tutorId, startDate, endDate, startTime, dailyHour, message, status } =
//     booking;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-violet-100">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white">Booking Details</h1>
//               <p className="text-violet-100 mt-1">
//                 Review and manage the booking request
//               </p>
//             </div>
//             <div className={getStatusBadgeStyles(status)}>
//               {getStatusIcon(status)}
//               <span className="capitalize ml-1">
//                 {status.replace(/-/g, " ")}
//               </span>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div>
//               <div className="bg-white border border-violet-100 rounded-xl shadow-sm hover:shadow-md overflow-hidden">
//                 <div className="bg-violet-50 px-4 py-3 border-b border-violet-100 flex items-center">
//                   <User className="text-violet-600 mr-2" size={18} />
//                   <h3 className="font-semibold text-violet-800">
//                     Tutor Information
//                   </h3>
//                 </div>
//                 <div className="p-5 space-y-5">
//                   <InfoBlock
//                     icon={User}
//                     label="Full Name"
//                     value={tutorId?.name || "N/A"}
//                   />
//                   <InfoBlock
//                     icon={Mail}
//                     label="Email Address"
//                     value={tutorId?.email || "N/A"}
//                   />
//                   <InfoBlock
//                     icon={Timer}
//                     label="Phone Number"
//                     value={tutorId?.tutorData?.PhoneNumber || "N/A"}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-2 space-y-6">
//               <div className="bg-white border border-violet-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                 <div className="bg-violet-50 px-4 py-3 border-b border-violet-100 flex items-center">
//                   <Calendar className="text-violet-600 mr-2" size={18} />
//                   <h3 className="font-semibold text-violet-800">
//                     Session Details
//                   </h3>
//                 </div>
//                 <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <InfoBlock
//                     icon={Calendar}
//                     label="Start Date"
//                     value={formatDate(startDate)}
//                   />
//                   <InfoBlock
//                     icon={Calendar}
//                     label="End Date"
//                     value={formatDate(endDate)}
//                   />
//                   <InfoBlock
//                     icon={Clock}
//                     label="Start Time"
//                     value={startTime}
//                   />
//                   <InfoBlock
//                     icon={Timer}
//                     label="Daily Hours"
//                     value={`${dailyHour} hours`}
//                   />
//                 </div>
//               </div>
//               <div className="bg-white border border-violet-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                 <div className="bg-violet-50 px-4 py-3 border-b border-violet-100 flex items-center">
//                   <MessageSquare className="text-violet-600 mr-2" size={18} />
//                   <h3 className="font-semibold text-violet-800">
//                     Additional Information
//                   </h3>
//                 </div>
//                 <div className="p-5">
//                   <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
//                     {message || "No additional information provided."}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-full flex justify-between items-center mt-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
//               >
//                 <ArrowLeft className="mr-2" size={18} /> Go Back
//               </button>

//               {status ===
//                 "booking-completed-and-awaiting-student-confirmation" && (
//                 <div className="space-x-3">
//                   <button
//                     onClick={handleConfirmAndClose}
//                     className="px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
//                   >
//                     Accept & Close
//                   </button>

//                   <button
//                     onClick={handleRejectAndClose}
//                     className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
//                   >
//                     Reject & Close
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  Timer,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function InfoBlock({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-5 hover:bg-violet-50 transition-colors">
      <div className="flex items-start">
        <div className="bg-violet-100 p-3 rounded-full mr-4">
          <Icon size={20} className="text-violet-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="font-medium text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

const getStatusBadgeStyles = (status) => {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium";
  if (status.includes("confirmed"))
    return `${base} bg-emerald-50 text-emerald-700 border border-emerald-200`;
  if (status.includes("cancelled") || status.includes("refunded"))
    return `${base} bg-red-50 text-red-700 border border-red-200`;
  if (status.includes("pending"))
    return `${base} bg-amber-50 text-amber-700 border border-amber-200`;
  return `${base} bg-violet-50 text-violet-700 border border-violet-200`;
};

const getStatusIcon = (status) => {
  if (status.includes("confirmed"))
    return <CheckCircle size={16} className="text-emerald-600" />;
  if (status.includes("cancelled") || status.includes("refunded"))
    return <XCircle size={16} className="text-red-600" />;
  return <AlertCircle size={16} className="text-amber-600" />;
};

function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  useEffect(() => {
    async function fetchBooking() {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5001/api/bookings/${bookingId}`
        );
        if (res.data.success) setBooking(res.data.data);
        else setError(res.data.message || "Failed to load booking");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handleConfirmAndClose = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/bookings/studentClose/${bookingId}`,
        { action: "confirm" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      console.log("just check:", data);

      if (data.success) {
        setBooking(data.booking); // update booking info in UI
        toast.success(data.message || "Booking confirmed and closed.");
        setTimeout(() => navigate("/mybooking"), 1200);
      } else {
        toast.error("Failed to confirm and close booking.");
      }
    } catch (error) {
      console.error("Error confirming and closing booking:", error);
      toast.error("An error occurred while confirming.");
    }
  };

  const handleRejectAndClose = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/bookings/studentClose/${bookingId}`,
        { action: "reject" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setBooking(data.booking); // update booking info in UI
        toast.success(data.message); // show success toast
        setTimeout(() => navigate("/mybooking"), 1200);
      } else {
        toast.error("Failed to reject and close booking.");
      }
    } catch (error) {
      console.error("Error rejecting and closing booking:", error);
      toast.error("An error occurred.");
    }
  };

  const handleAction = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:5001/api/bookings/${bookingId}/status`,
        { status: newStatus }
      );
      setBooking((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to update booking:", err);
      alert("Failed to update status.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-violet-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-violet-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-violet-200 rounded"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-red-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Error Loading Booking
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );

  if (!booking)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-violet-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-violet-100 p-3 rounded-full mb-4">
              <AlertCircle className="text-violet-600" size={32} />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Booking Found</h2>
            <p className="text-gray-600 mb-6">
              That booking doesn’t exist or was removed.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-violet-100 hover:bg-violet-200 rounded-lg text-violet-700 font-medium flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );

  const { tutorId, startDate, endDate, startTime, dailyHour, message, status } =
    booking;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-violet-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Booking Details</h1>
              <p className="text-violet-100 mt-1">
                Review and manage the booking request
              </p>
            </div>
            <div className={getStatusBadgeStyles(status)}>
              {getStatusIcon(status)}
              <span className="capitalize ml-1">
                {status.replace(/-/g, " ")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <div className="bg-white border border-violet-100 rounded-xl shadow-sm hover:shadow-md overflow-hidden">
                <div className="bg-violet-50 px-4 py-3 border-b border-violet-100 flex items-center">
                  <User className="text-violet-600 mr-2" size={18} />
                  <h3 className="font-semibold text-violet-800">
                    Tutor Information
                  </h3>
                </div>
                <div className="p-5 space-y-5">
                  <InfoBlock
                    icon={User}
                    label="Full Name"
                    value={tutorId?.name || "N/A"}
                  />
                  <InfoBlock
                    icon={Mail}
                    label="Email Address"
                    value={tutorId?.email || "N/A"}
                  />
                  <InfoBlock
                    icon={Timer}
                    label="Phone Number"
                    value={tutorId?.tutorData?.PhoneNumber || "N/A"}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-violet-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-violet-50 px-4 py-3 border-b border-violet-100 flex items-center">
                  <Calendar className="text-violet-600 mr-2" size={18} />
                  <h3 className="font-semibold text-violet-800">
                    Session Details
                  </h3>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InfoBlock
                    icon={Calendar}
                    label="Start Date"
                    value={formatDate(startDate)}
                  />
                  <InfoBlock
                    icon={Calendar}
                    label="End Date"
                    value={formatDate(endDate)}
                  />
                  <InfoBlock
                    icon={Clock}
                    label="Start Time"
                    value={startTime}
                  />
                  <InfoBlock
                    icon={Timer}
                    label="Daily Hours"
                    value={`${dailyHour} hours`}
                  />
                </div>
              </div>
              <div className="bg-white border border-violet-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-violet-50 px-4 py-3 border-b border-violet-100 flex items-center">
                  <MessageSquare className="text-violet-600 mr-2" size={18} />
                  <h3 className="font-semibold text-violet-800">
                    Additional Information
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {message || "No additional information provided."}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-full flex justify-between items-center mt-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
              >
                <ArrowLeft className="mr-2" size={18} /> Go Back
              </button>

              {status ===
                "booking-completed-and-awaiting-student-confirmation" && (
                <div className="space-x-3">
                  <button
                    onClick={handleConfirmAndClose}
                    className="px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
                  >
                    Accept & Close
                  </button>

                  <button
                    onClick={handleRejectAndClose}
                    className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    Reject & Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;