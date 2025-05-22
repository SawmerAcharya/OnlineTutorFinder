// // import { useContext, useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   User,
// //   Mail,
// //   Calendar,
// //   Clock,
// //   MessageSquare,
// //   Timer,
// //   CheckCircle,
// //   XCircle,
// //   ArrowLeft,
// //   AlertCircle,
// // } from "lucide-react";
// // import axios from "axios";
// // import { AppContent } from "../../Context/AppContex";
// // import { toast } from "react-toastify";

// // function BookingViewDetails() {
// //   const { bookingId } = useParams();
// //   const navigate = useNavigate();
// //   const { backendUrl } = useContext(AppContent);

// //   const [booking, setBooking] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [updating, setUpdating] = useState(false);

// //   useEffect(() => {
// //     const fetchBooking = async () => {
// //       setLoading(true);
// //       try {
// //         const { data } = await axios.get(
// //           `${backendUrl}/api/bookings/${bookingId}`,
// //           { withCredentials: true }
// //         );
// //         if (data.success) {
// //           setBooking(data.data);
// //         } else {
// //           setError(data.message || "Failed to load booking");
// //         }
// //       } catch (err) {
// //         console.error("Error fetching booking details:", err);
// //         setError(err.response?.data?.message || err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     if (bookingId) fetchBooking();
// //   }, [bookingId, backendUrl]);

// //   const handleStatusUpdate = async (newStatus) => {
// //     if (!bookingId || !booking) return;

// //     if (booking.status === newStatus) {
// //       toast.info(
// //         `Booking is already marked as "${newStatus.replace(/-/g, " ")}".`
// //       );
// //       return;
// //     }

// //     const confirmAction = window.confirm(
// //       `Are you sure you want to set the status to '${newStatus.replace(
// //         /-/g,
// //         " "
// //       )}'?`
// //     );
// //     if (!confirmAction) return;

// //     setUpdating(true);
// //     try {
// //       const response = await axios.put(
// //         `${backendUrl}/api/bookings/updateStatus/${bookingId}`,
// //         { status: newStatus },
// //         { withCredentials: true }
// //       );

// //       if (response.data.success) {
// //         setBooking((prev) => ({ ...prev, status: newStatus }));
// //         toast.success(
// //           `Booking for ${booking.userId.name} marked as "${newStatus.replace(
// //             /-/g,
// //             " "
// //           )}".`
// //         );
// //         setTimeout(() => {
// //           navigate("/Bookinglist");
// //         }, 1500);
// //       } else {
// //         toast.error("Failed to update booking status.");
// //       }
// //     } catch (error) {
// //       console.error("Status update error:", error);
// //       toast.error(
// //         "Error updating status: " +
// //           (error.response?.data?.message || error.message)
// //       );
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   const handleCloseBooking = async () => {
// //     if (!window.confirm("Are you sure you want to close this booking?")) return;

// //     setUpdating(true);
// //     try {
// //       const res = await axios.put(
// //         `${backendUrl}/api/bookings/tutorClose/${bookingId}`,
// //         {},
// //         { withCredentials: true }
// //       );
// //       if (res.data.success) {
// //         setBooking((b) => ({
// //           ...b,
// //           status: res.data.booking.status,
// //         }));
// //         toast.success(
// //           "Booking marked completed and awaiting student confirmation."
// //         );
// //         setTimeout(() => navigate("/Bookinglist"), 1500);
// //       } else {
// //         toast.error("Failed to close booking.");
// //       }
// //     } catch (e) {
// //       console.error(e);
// //       toast.error("Error: " + (e.response?.data?.message || e.message));
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   const getStatusBadgeStyles = (status) => {
// //     const baseClasses =
// //       "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium";

// //     if (status.includes("confirmed")) {
// //       return `${baseClasses} bg-emerald-50 text-emerald-700 border border-emerald-200`;
// //     } else if (status.includes("cancelled") || status.includes("refunded")) {
// //       return `${baseClasses} bg-red-50 text-red-700 border border-red-200`;
// //     } else if (status.includes("pending")) {
// //       return `${baseClasses} bg-amber-50 text-amber-700 border border-amber-200`;
// //     } else {
// //       return `${baseClasses} bg-violet-50 text-violet-700 border border-violet-200`;
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     if (status.includes("confirmed")) {
// //       return <CheckCircle size={16} className="text-emerald-600" />;
// //     } else if (status.includes("cancelled") || status.includes("refunded")) {
// //       return <XCircle size={16} className="text-red-600" />;
// //     } else {
// //       return <AlertCircle size={16} className="text-amber-600" />;
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="animate-pulse flex flex-col items-center">
// //           <div className="h-12 w-12 bg-violet-200 rounded-full mb-4"></div>
// //           <div className="h-4 w-48 bg-violet-200 rounded mb-2"></div>
// //           <div className="h-3 w-32 bg-violet-200 rounded"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //         <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-red-100">
// //           <div className="flex flex-col items-center text-center">
// //             <div className="bg-red-100 p-3 rounded-full mb-4">
// //               <AlertCircle className="text-red-600" size={32} />
// //             </div>
// //             <h2 className="text-xl font-semibold mb-2">
// //               Error Loading Booking
// //             </h2>
// //             <p className="text-gray-600 mb-6">{error}</p>
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center"
// //             >
// //               <ArrowLeft size={16} className="mr-2" />
// //               Go Back
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!booking) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //         <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-violet-100">
// //           <div className="flex flex-col items-center text-center">
// //             <div className="bg-violet-100 p-3 rounded-full mb-4">
// //               <AlertCircle className="text-violet-600" size={32} />
// //             </div>
// //             <h2 className="text-xl font-semibold mb-2">No Booking Found</h2>
// //             <p className="text-gray-600 mb-6">
// //               The booking you're looking for doesn't exist or has been removed.
// //             </p>
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="px-4 py-2 bg-violet-100 hover:bg-violet-200 rounded-lg text-violet-700 font-medium transition-colors flex items-center"
// //             >
// //               <ArrowLeft size={16} className="mr-2" />
// //               Go Back
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { userId, startDate, endDate, startTime, dailyHour, message, status } =
// //     booking;

// //   const formatDate = (isoString) => {
// //     const date = new Date(isoString);
// //     return date.toLocaleDateString("en-US", {
// //       weekday: "short",
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };

// //   const showManage = status === "payment-received-awaiting-tutor-confirmation";
// //   const showClose = status === "payment-received-and-tutor-confirmed";

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-violet-100">
// //           <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6">
// //             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-white">
// //                   Booking Details
// //                 </h1>
// //                 <p className="text-violet-100 mt-1">
// //                   Review and manage the booking request
// //                 </p>
// //               </div>
// //               <div className="mt-4 md:mt-0">
// //                 <div className={getStatusBadgeStyles(status)}>
// //                   {getStatusIcon(status)}
// //                   <span className="capitalize">
// //                     {status.replace(/-/g, " ")}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="p-6">
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //               <div className="lg:col-span-1">
// //                 <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
// //                   <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
// //                     <div className="flex items-center">
// //                       <User className="text-violet-600 mr-2" size={18} />
// //                       <h3 className="font-semibold text-violet-800">
// //                         Student Information
// //                       </h3>
// //                     </div>
// //                   </div>
// //                   <div className="p-5 space-y-5">
// //                     <InfoBlock
// //                       icon={User}
// //                       label="Full Name"
// //                       value={userId.name}
// //                     />
// //                     <InfoBlock
// //                       icon={Mail}
// //                       label="Email Address"
// //                       value={userId.email}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="lg:col-span-2 space-y-6">
// //                 <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
// //                   <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
// //                     <div className="flex items-center">
// //                       <Calendar className="text-violet-600 mr-2" size={18} />
// //                       <h3 className="font-semibold text-violet-800">
// //                         Session Details
// //                       </h3>
// //                     </div>
// //                   </div>
// //                   <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
// //                     <InfoBlock
// //                       icon={Calendar}
// //                       label="Start Date"
// //                       value={formatDate(startDate)}
// //                     />
// //                     <InfoBlock
// //                       icon={Calendar}
// //                       label="End Date"
// //                       value={formatDate(endDate)}
// //                     />
// //                     <InfoBlock
// //                       icon={Clock}
// //                       label="Start Time"
// //                       value={startTime}
// //                     />
// //                     <InfoBlock
// //                       icon={Timer}
// //                       label="Daily Hours"
// //                       value={`${dailyHour} hours`}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
// //                   <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
// //                     <div className="flex items-center">
// //                       <MessageSquare
// //                         className="text-violet-600 mr-2"
// //                         size={18}
// //                       />
// //                       <h3 className="font-semibold text-violet-800">
// //                         Additional Information
// //                       </h3>
// //                     </div>
// //                   </div>
// //                   <div className="p-5">
// //                     <div className="bg-gray-50 rounded-lg p-5 hover:bg-violet-50 transition-colors">
// //                       <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
// //                         {message || "No additional information provided."}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
// //               <button
// //                 onClick={() => navigate(-1)}
// //                 className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center"
// //               >
// //                 <ArrowLeft size={18} className="mr-2" /> Close
// //               </button>

// //               {showManage && (
// //                 <>
// //                   <button
// //                     disabled={updating}
// //                     onClick={() => handleStatusUpdate("refunded-and-cancelled")}
// //                     className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
// //                       updating
// //                         ? "bg-red-100 text-red-400 cursor-not-allowed"
// //                         : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
// //                     }`}
// //                   >
// //                     <XCircle size={18} /> Reject Booking
// //                   </button>
// //                   <button
// //                     disabled={updating}
// //                     onClick={() =>
// //                       handleStatusUpdate("payment-received-and-tutor-confirmed")
// //                     }
// //                     className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
// //                       updating
// //                         ? "bg-violet-100 text-violet-400 cursor-not-allowed"
// //                         : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
// //                     }`}
// //                   >
// //                     <CheckCircle size={18} /> Accept Booking
// //                   </button>
// //                 </>
// //               )}

// //               {showClose && (
// //                 <button
// //                   disabled={updating}
// //                   onClick={handleCloseBooking}
// //                   className="px-6 py-3 bg-violet-100 text-violet-700 rounded-lg font-medium hover:bg-violet-200 transition-colors flex items-center justify-center "
// //                 >
// //                   Booking Closed
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function InfoBlock({ icon: Icon, label, value }) {
// //   return (
// //     <div className="bg-gray-50 rounded-lg p-5 hover:bg-violet-50 transition-colors">
// //       <div className="flex items-start">
// //         <div className="bg-violet-100 p-3 rounded-full mr-4">
// //           <Icon size={20} className="text-violet-600" />
// //         </div>
// //         <div>
// //           <p className="text-sm text-gray-500 mb-1">{label}</p>
// //           <p className="font-medium text-gray-900">{value}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BookingViewDetails;


// "use client"

// import { useContext, useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import {
//   User,
//   Mail,
//   Calendar,
//   Clock,
//   MessageSquare,
//   Timer,
//   CheckCircle,
//   XCircle,
//   ArrowLeft,
//   AlertCircle,
// } from "lucide-react"
// import axios from "axios"
// import { AppContent } from "../../Context/AppContex"
// import { toast } from "react-toastify"

// function BookingViewDetails() {
//   const { bookingId } = useParams()
//   const navigate = useNavigate()
//   const { backendUrl } = useContext(AppContent)

//   const [booking, setBooking] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [updating, setUpdating] = useState(false)

//   useEffect(() => {
//     const fetchBooking = async () => {
//       setLoading(true)
//       try {
//         const { data } = await axios.get(`${backendUrl}/api/bookings/${bookingId}`, { withCredentials: true })
//         if (data.success) {
//           setBooking(data.data)
//         } else {
//           setError(data.message || "Failed to load booking")
//         }
//       } catch (err) {
//         console.error("Error fetching booking details:", err)
//         setError(err.response?.data?.message || err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     if (bookingId) fetchBooking()
//   }, [bookingId, backendUrl])

//   const handleStatusUpdate = async (newStatus) => {
//     if (!bookingId || !booking) return

//     if (booking.status === newStatus) {
//       toast.info(`Booking is already marked as "${newStatus.replace(/-/g, " ")}".`)
//       return
//     }

//     const confirmAction = window.confirm(
//       `Are you sure you want to set the status to '${newStatus.replace(/-/g, " ")}'?`,
//     )
//     if (!confirmAction) return

//     setUpdating(true)
//     try {
//       const response = await axios.put(
//         `${backendUrl}/api/bookings/updateStatus/${bookingId}`,
//         { status: newStatus },
//         { withCredentials: true },
//       )

//       if (response.data.success) {
//         setBooking((prev) => ({ ...prev, status: newStatus }))
//         toast.success(`Booking for ${booking.userId.name} marked as "${newStatus.replace(/-/g, " ")}".`)
//         setTimeout(() => {
//           navigate("/Bookinglist")
//         }, 1500)
//       } else {
//         toast.error("Failed to update booking status.")
//       }
//     } catch (error) {
//       console.error("Status update error:", error)
//       toast.error("Error updating status: " + (error.response?.data?.message || error.message))
//     } finally {
//       setUpdating(false)
//     }
//   }

//   const handleCloseBooking = async () => {
//     if (!window.confirm("Are you sure you want to close this booking?")) return

//     setUpdating(true)
//     try {
//       const res = await axios.put(`${backendUrl}/api/bookings/tutorClose/${bookingId}`, {}, { withCredentials: true })
//       if (res.data.success) {
//         setBooking((b) => ({
//           ...b,
//           status: res.data.booking.status,
//         }))
//         toast.success("Booking marked completed and awaiting student confirmation.")
//         setTimeout(() => navigate("/Bookinglist"), 1500)
//       } else {
//         toast.error("Failed to close booking.")
//       }
//     } catch (e) {
//       console.error(e)
//       toast.error("Error: " + (e.response?.data?.message || e.message))
//     } finally {
//       setUpdating(false)
//     }
//   }

//   const getStatusBadgeStyles = (status) => {
//     if (status.includes("confirmed")) {
//       return "bg-emerald-50 text-emerald-700 border-emerald-200"
//     } else if (status.includes("cancelled") || status.includes("refunded")) {
//       return "bg-rose-50 text-rose-700 border-rose-200"
//     } else if (status.includes("pending")) {
//       return "bg-amber-50 text-amber-700 border-amber-200"
//     } else {
//       return "bg-sky-50 text-sky-700 border-sky-200"
//     }
//   }

//   const getStatusIcon = (status) => {
//     if (status.includes("confirmed")) {
//       return <CheckCircle size={16} className="text-emerald-600" />
//     } else if (status.includes("cancelled") || status.includes("refunded")) {
//       return <XCircle size={16} className="text-rose-600" />
//     } else {
//       return <AlertCircle size={16} className="text-amber-600" />
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-12 w-12 bg-sky-200 rounded-full mb-4"></div>
//           <div className="h-4 w-48 bg-sky-200 rounded mb-2"></div>
//           <div className="h-3 w-32 bg-sky-200 rounded"></div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-red-100">
//           <div className="flex flex-col items-center text-center">
//             <div className="bg-red-100 p-4 rounded-full mb-6">
//               <AlertCircle className="text-red-600" size={32} />
//             </div>
//             <h2 className="text-2xl font-bold mb-3 text-slate-800">Error Loading Booking</h2>
//             <p className="text-slate-600 mb-8">{error}</p>
//             <button
//               onClick={() => navigate(-1)}
//               className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors flex items-center shadow-sm"
//             >
//               <ArrowLeft size={18} className="mr-2" />
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!booking) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-sky-100">
//           <div className="flex flex-col items-center text-center">
//             <div className="bg-sky-100 p-4 rounded-full mb-6">
//               <AlertCircle className="text-sky-600" size={32} />
//             </div>
//             <h2 className="text-2xl font-bold mb-3 text-slate-800">No Booking Found</h2>
//             <p className="text-slate-600 mb-8">The booking you're looking for doesn't exist or has been removed.</p>
//             <button
//               onClick={() => navigate(-1)}
//               className="px-6 py-3 bg-sky-100 hover:bg-sky-200 rounded-xl text-sky-700 font-medium transition-colors flex items-center shadow-sm"
//             >
//               <ArrowLeft size={18} className="mr-2" />
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const { userId, startDate, endDate, startTime, dailyHour, message, status } = booking

//   const formatDate = (isoString) => {
//     const date = new Date(isoString)
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     })
//   }

//   const showManage = status === "payment-received-awaiting-tutor-confirmation"
//   const showClose = status === "payment-received-and-tutor-confirmed"

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
//           >
//             <ArrowLeft size={16} className="mr-2" />
//             Back to Bookings
//           </button>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 sm:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-white">Booking Details</h1>
//                 <div className="flex items-center mt-2">
//                   <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
//                     <User className="h-4 w-4 text-white" />
//                   </div>
//                   <p className="text-teal-50 font-medium">{userId.name}</p>
//                 </div>
//               </div>
//               <div>
//                 <div
//                   className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadgeStyles(status)}`}
//                 >
//                   {getStatusIcon(status)}
//                   <span className="capitalize">{status.replace(/-/g, " ")}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 sm:p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//               {/* Left Column */}
//               <div className="lg:col-span-4 space-y-6">
//                 {/* Student Info Card */}
//                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//                   <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
//                     <h3 className="font-semibold text-slate-800 flex items-center">
//                       <User className="text-sky-600 mr-2" size={18} />
//                       Student Information
//                     </h3>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
//                         <User className="h-5 w-5 text-sky-600" />
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-xs text-slate-500">Full Name</p>
//                         <p className="font-medium text-slate-800">{userId.name}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
//                         <Mail className="h-5 w-5 text-teal-600" />
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-xs text-slate-500">Email Address</p>
//                         <p className="font-medium text-slate-800">{userId.email}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Message Card */}
//                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//                   <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
//                     <h3 className="font-semibold text-slate-800 flex items-center">
//                       <MessageSquare className="text-teal-600 mr-2" size={18} />
//                       Student Message
//                     </h3>
//                   </div>
//                   <div className="p-5">
//                     <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
//                       <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
//                         {message || "No additional information provided."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="lg:col-span-8 space-y-6">
//                 {/* Session Details Card */}
//                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//                   <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
//                     <h3 className="font-semibold text-slate-800 flex items-center">
//                       <Calendar className="text-teal-600 mr-2" size={18} />
//                       Session Details
//                     </h3>
//                   </div>
//                   <div className="p-5">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                       <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-start">
//                         <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
//                           <Calendar className="h-5 w-5 text-teal-600" />
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-xs text-slate-500">Start Date</p>
//                           <p className="font-medium text-slate-800">{formatDate(startDate)}</p>
//                         </div>
//                       </div>
//                       <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-start">
//                         <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
//                           <Calendar className="h-5 w-5 text-teal-600" />
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-xs text-slate-500">End Date</p>
//                           <p className="font-medium text-slate-800">{formatDate(endDate)}</p>
//                         </div>
//                       </div>
//                       <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-start">
//                         <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
//                           <Clock className="h-5 w-5 text-teal-600" />
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-xs text-slate-500">Start Time</p>
//                           <p className="font-medium text-slate-800">{startTime}</p>
//                         </div>
//                       </div>
//                       <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-start">
//                         <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
//                           <Timer className="h-5 w-5 text-teal-600" />
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-xs text-slate-500">Daily Hours</p>
//                           <p className="font-medium text-slate-800">{dailyHour} hours</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Timeline Card */}
//                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//                   <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
//                     <h3 className="font-semibold text-slate-800 flex items-center">
//                       <Clock className="text-teal-600 mr-2" size={18} />
//                       Booking Timeline
//                     </h3>
//                   </div>
//                   <div className="p-5">
//                     <div className="relative pl-8 pb-1">
//                       <div className="absolute top-0 left-0 h-full w-px bg-sky-200"></div>

//                       <div className="relative mb-6">
//                         <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full border-2 border-sky-500 bg-white"></div>
//                         <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
//                           <p className="text-sm font-medium text-slate-800">Booking Created</p>
//                           <p className="text-xs text-slate-500 mt-1">Student requested a booking</p>
//                         </div>
//                       </div>

//                       <div className="relative mb-6">
//                         <div
//                           className={`absolute -left-8 mt-1.5 w-4 h-4 rounded-full border-2 ${status.includes("payment") ? "border-sky-500 bg-sky-500" : "border-slate-300 bg-white"}`}
//                         ></div>
//                         <div
//                           className={`rounded-lg p-4 border ${status.includes("payment") ? "bg-sky-50 border-sky-100" : "bg-slate-50 border-slate-100"}`}
//                         >
//                           <p className="text-sm font-medium text-slate-800">Payment Received</p>
//                           <p className="text-xs text-slate-500 mt-1">Student completed payment</p>
//                         </div>
//                       </div>

//                       <div className="relative mb-6">
//                         <div
//                           className={`absolute -left-8 mt-1.5 w-4 h-4 rounded-full border-2 ${status.includes("tutor-confirmed") ? "border-teal-500 bg-teal-500" : "border-slate-300 bg-white"}`}
//                         ></div>
//                         <div
//                           className={`rounded-lg p-4 border ${status.includes("tutor-confirmed") ? "bg-teal-50 border-teal-100" : "bg-slate-50 border-slate-100"}`}
//                         >
//                           <p className="text-sm font-medium text-slate-800">Tutor Confirmation</p>
//                           <p className="text-xs text-slate-500 mt-1">Tutor accepted the booking</p>
//                         </div>
//                       </div>

//                       <div className="relative">
//                         <div
//                           className={`absolute -left-8 mt-1.5 w-4 h-4 rounded-full border-2 ${status.includes("completed") ? "border-teal-500 bg-teal-500" : "border-slate-300 bg-white"}`}
//                         ></div>
//                         <div
//                           className={`rounded-lg p-4 border ${status.includes("completed") ? "bg-teal-50 border-teal-100" : "bg-slate-50 border-slate-100"}`}
//                         >
//                           <p className="text-sm font-medium text-slate-800">Session Completed</p>
//                           <p className="text-xs text-slate-500 mt-1">Tutoring session completed</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
//               {showManage && (
//                 <>
//                   <button
//                     disabled={updating}
//                     onClick={() => handleStatusUpdate("refunded-and-cancelled")}
//                     className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
//                       updating
//                         ? "bg-red-100 text-red-400 cursor-not-allowed"
//                         : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
//                     }`}
//                   >
//                     <XCircle size={18} /> Reject Booking
//                   </button>
//                   <button
//                     disabled={updating}
//                     onClick={() => handleStatusUpdate("payment-received-and-tutor-confirmed")}
//                     className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
//                       updating
//                         ? "bg-sky-100 text-sky-400 cursor-not-allowed"
//                         : "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-sm"
//                     }`}
//                   >
//                     <CheckCircle size={18} /> Accept Booking
//                   </button>
//                 </>
//               )}

//               {showClose && (
//                 <button
//                   disabled={updating}
//                   onClick={handleCloseBooking}
//                   className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
//                     updating
//                       ? "bg-sky-100 text-sky-400 cursor-not-allowed"
//                       : "bg-sky-100 text-sky-700 hover:bg-sky-200 shadow-sm"
//                   }`}
//                 >
//                   <CheckCircle size={18} /> Mark Session Complete
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingViewDetails



import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  Timer,
  CheckCircle,
  XCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import { toast } from "react-toastify";

function BookingViewDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/bookings/${bookingId}`,
          { withCredentials: true }
        );
        if (data.success) {
          setBooking(data.data);
        } else {
          setError(data.message || "Failed to load booking");
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) fetchBooking();
  }, [bookingId, backendUrl]);

  const handleStatusUpdate = async (newStatus) => {
    if (!bookingId || !booking) return;

    if (booking.status === newStatus) {
      toast.info(
        `Booking is already marked as "${newStatus.replace(/-/g, " ")}".`
      );
      return;
    }

    const confirmAction = window.confirm(
      `Are you sure you want to set the status to '${newStatus.replace(
        /-/g,
        " "
      )}'?`
    );
    if (!confirmAction) return;

    setUpdating(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/bookings/updateStatus/${bookingId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        setBooking((prev) => ({ ...prev, status: newStatus }));
        toast.success(
          `Booking for ${booking.userId.name} marked as "${newStatus.replace(
            /-/g,
            " "
          )}".`
        );
        setTimeout(() => {
          navigate("/BookingsList");
        }, 1500);
      } else {
        toast.error("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(
        "Error updating status: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseBooking = async () => {
    if (!window.confirm("Are you sure you want to close this booking?")) return;

    setUpdating(true);
    try {
      const res = await axios.put(
        `${backendUrl}/api/bookings/tutorClose/${bookingId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setBooking((b) => ({
          ...b,
          status: res.data.booking.status,
        }));
        toast.success(
          "Booking marked completed and awaiting student confirmation."
        );
        setTimeout(() => navigate("/BookingsList"), 1500);
      } else {
        toast.error("Failed to close booking.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error: " + (e.response?.data?.message || e.message));
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadgeStyles = (status) => {
    const baseClasses =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium";

    if (status.includes("confirmed")) {
      return `${baseClasses} bg-emerald-50 text-emerald-700 border border-emerald-200`;
    } else if (status.includes("cancelled") || status.includes("refunded")) {
      return `${baseClasses} bg-red-50 text-red-700 border border-red-200`;
    } else if (status.includes("pending")) {
      return `${baseClasses} bg-amber-50 text-amber-700 border border-amber-200`;
    } else {
      return `${baseClasses} bg-violet-50 text-violet-700 border border-violet-200`;
    }
  };

  const getStatusIcon = (status) => {
    if (status.includes("confirmed")) {
      return <CheckCircle size={16} className="text-emerald-600" />;
    } else if (status.includes("cancelled") || status.includes("refunded")) {
      return <XCircle size={16} className="text-red-600" />;
    } else {
      return <AlertCircle size={16} className="text-amber-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-violet-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-violet-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-violet-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
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
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-violet-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-violet-100 p-3 rounded-full mb-4">
              <AlertCircle className="text-violet-600" size={32} />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Booking Found</h2>
            <p className="text-gray-600 mb-6">
              The booking you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-violet-100 hover:bg-violet-200 rounded-lg text-violet-700 font-medium transition-colors flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { userId, startDate, endDate, startTime, dailyHour, message, status } =
    booking;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const showManage = status === "payment-received-awaiting-tutor-confirmation";
  const showClose = status === "payment-received-and-tutor-confirmed";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-violet-100">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Booking Details
                </h1>
                <p className="text-violet-100 mt-1">
                  Review and manage the booking request
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className={getStatusBadgeStyles(status)}>
                  {getStatusIcon(status)}
                  <span className="capitalize">
                    {status.replace(/-/g, " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
                    <div className="flex items-center">
                      <User className="text-violet-600 mr-2" size={18} />
                      <h3 className="font-semibold text-violet-800">
                        Student Information
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-5">
                    <InfoBlock
                      icon={User}
                      label="Full Name"
                      value={userId.name}
                    />
                    <InfoBlock
                      icon={Mail}
                      label="Email Address"
                      value={userId.email}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
                    <div className="flex items-center">
                      <Calendar className="text-violet-600 mr-2" size={18} />
                      <h3 className="font-semibold text-violet-800">
                        Session Details
                      </h3>
                    </div>
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

                <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
                    <div className="flex items-center">
                      <MessageSquare
                        className="text-violet-600 mr-2"
                        size={18}
                      />
                      <h3 className="font-semibold text-violet-800">
                        Additional Information
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="bg-gray-50 rounded-lg p-5 hover:bg-violet-50 transition-colors">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {message || "No additional information provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center"
              >
                <ArrowLeft size={18} className="mr-2" /> Close
              </button>

              {showManage && (
                <>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusUpdate("refunded-and-cancelled")}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      updating
                        ? "bg-red-100 text-red-400 cursor-not-allowed"
                        : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
                    }`}
                  >
                    <XCircle size={18} /> Reject Booking
                  </button>
                  <button
                    disabled={updating}
                    onClick={() =>
                      handleStatusUpdate("booking-completed-and-student-confirmed")
                    }
                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      updating
                        ? "bg-violet-100 text-violet-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
                    }`}
                  >
                    <CheckCircle size={18} /> Accept Booking
                  </button>
                </>
              )}

              {showClose && (
                <button
                  disabled={updating}
                  onClick={handleCloseBooking}
                  className="px-6 py-3 bg-violet-100 text-violet-700 rounded-lg font-medium hover:bg-violet-200 transition-colors flex items-center justify-center "
                >
                  Booking Closed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default BookingViewDetails;