

// import React, { useState, useContext, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AppContent } from "../../Context/AppContex"; 
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Video, MapPin, MessageSquare } from "lucide-react";

// function TutorBook() {
//   const { tutorId } = useParams();
//   const navigate = useNavigate();
//   const { userData, backendUrl } = useContext(AppContent);

//   const [tutor, setTutor] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [totalHours, setTotalHours] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [mode, setMode] = useState("online");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchTutor = async () => {
//       try {
//         const response = await axios.get(
//           `${backendUrl}/api/user/tutors/${tutorId}`,
//           { withCredentials: true }
//         );
//         setTutor(response.data.tutor);
//       } catch (err) {
//         console.error("Error fetching tutor:", err);
//         toast.error("Error fetching tutor details.");
//       }
//     };
//     fetchTutor();
//   }, [tutorId, backendUrl]);

//   const getAvailableTimes = () => {
//     const times = [];
//     for (let hour = 0; hour < 24; hour++) {
//       const ampm = hour >= 12 ? "PM" : "AM";
//       const hourIn12HrFormat = hour % 12 === 0 ? 12 : hour % 12;
//       const label = `${hourIn12HrFormat}:00 ${ampm}`;
//       times.push(label);
//     }
//     return times;
//   };

//   const calculateTotalDays = (start, end) => {
//     const s = new Date(start);
//     const e = new Date(end);
//     return (e - s) / (1000 * 3600 * 24);
//   };

//   useEffect(() => {
//     if (
//       startDate &&
//       endDate &&
//       totalHours > 0 &&
//       tutor?.tutorData?.HourlyRate
//     ) {
//       const totalDays = calculateTotalDays(startDate, endDate);
//       const totalSessionHours = totalDays * totalHours;
//       setTotalCost(totalSessionHours * tutor.tutorData.HourlyRate);
//     } else {
//       setTotalCost(0);
//     }
//   }, [startDate, endDate, totalHours, tutor]);

//   const handleBooking = async () => {
//     if (!userData || !userData._id) {
//       setError("User not logged in.");
//       toast.error("User not logged in.");
//       return;
//     }

//     if (!startDate || !endDate || !selectedTime.length || totalHours <= 0) {
//       if (!startDate) toast.error("Start date is required.");
//       if (!endDate) toast.error("End date is required.");
//       if (selectedTime.length === 0)
//         toast.error("Please select at least one time slot.");
//       if (totalHours <= 0) toast.error("Please enter the number of hours.");
//       setError("Please fill in all booking fields.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/bookings/book`,
//         {
//           userId: userData._id,
//           tutorId,
//           startDate,
//           endDate,
//           time: selectedTime.join(", "),
//           dailyHour: totalHours,
//           mode,
//           message,
//         },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         toast.success("Booking successful!");
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } else {
//         setError(response.data.message || "Booking failed");
//         toast.error(response.data.message || "Booking failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Something went wrong. Please try again."
//       );
//       toast.error(
//         err.response?.data?.message || "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!tutor) return <p>Loading tutor details...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           Book Your Tutoring Session with {tutor?.name || "Tutor"}
//         </h1>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="flex items-center text-gray-700 font-medium">
//               Start Date
//             </label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => {
//                 setStartDate(e.target.value);
//                 setSelectedTime([]);
//               }}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300"
//               min={new Date().toISOString().split("T")[0]}
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="flex items-center text-gray-700 font-medium">
//               End Date
//             </label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => {
//                 setEndDate(e.target.value);
//                 setSelectedTime([]);
//               }}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300"
//               min={startDate}
//             />
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <label className="flex items-center text-gray-700 font-medium">
//               Select Time
//             </label>
//             <select
//               multiple
//               value={selectedTime}
//               onChange={(e) =>
//                 setSelectedTime(
//                   Array.from(e.target.selectedOptions, (option) => option.value)
//                 )
//               }
//               className="w-full px-4 py-2 rounded-lg border border-gray-300"
//             >
//               {getAvailableTimes().map((time, index) => (
//                 <option key={index} value={time}>
//                   {time}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <label className="flex items-center text-gray-700 font-medium">
//               Enter Daily Hours
//             </label>
//             <input
//               type="number"
//               value={totalHours}
//               min="0"
//               step="0.5"
//               onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300"
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           <label className="block text-sm font-[600] text-gray-700 mb-2">
//             Mode of Tutoring
//           </label>
//           <div className="flex space-x-4">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="mode"
//                 value="online"
//                 checked={mode === "online"}
//                 onChange={() => setMode("online")}
//                 className="mr-2"
//               />
//               <Video className="w-4 h-4 mr-1 text-blue-600" />
//               Online
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="mode"
//                 value="offline"
//                 checked={mode === "offline"}
//                 onChange={() => setMode("offline")}
//                 className="mr-2"
//               />
//               <MapPin className="w-4 h-4 mr-1 text-blue-600" />
//               In-Person
//             </label>
//           </div>
//         </div>

//         <div className="mt-6">
//           <label className=" text-sm font-[600] text-gray-700 mb-2 flex items-center">
//             <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
//             Additional Information
//           </label>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Enter any additional information (e.g., your phone number, further instructions, etc.)"
//             rows={4}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//         </div>

//         {error && (
//           <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
//             {error}
//           </div>
//         )}

//         <div className="mt-8 p-6 bg-blue-50 rounded-xl">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Session Summary
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span>Total Hours:</span>
//               <span>{totalHours.toFixed(1)} hours per day</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Rate per Hour:</span>
//               <span>
//                 Rs{" "}
//                 {tutor.tutorData?.HourlyRate
//                   ? Number(tutor.tutorData.HourlyRate).toFixed(2)
//                   : "N/A"}
//               </span>
//             </div>
//             <div className="pt-4 border-t border-blue-200">
//               <div className="flex justify-between items-center text-lg">
//                 <span>Total Cost:</span>
//                 <span>Rs {totalCost.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           className={`mt-8 w-full text-white py-3 px-6 rounded-lg font-semibold transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           onClick={handleBooking}
//           disabled={!totalHours || !startDate || !endDate || loading}
//         >
//           {loading ? "Processing..." : "Confirm Booking"}
//         </button>
//       </div>
//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// }

// export default TutorBook;


import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Video, MapPin, MessageSquare } from "lucide-react";

function TutorBook() {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContent);

  const [tutor, setTutor] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("online");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/tutors/${tutorId}`,
          { withCredentials: true }
        );
        setTutor(response.data.tutor);
      } catch (err) {
        console.error("Error fetching tutor:", err);
        toast.error("Error fetching tutor details.");
      }
    };
    fetchTutor();
  }, [tutorId, backendUrl]);

  const getAvailableTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const hourIn12HrFormat = hour % 12 === 0 ? 12 : hour % 12;
      const label = `${hourIn12HrFormat}:00 ${ampm}`;
      times.push(label);
    }
    return times;
  };

  const calculateTotalDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return (e - s) / (1000 * 3600 * 24);
  };

  useEffect(() => {
    if (
      startDate &&
      endDate &&
      totalHours > 0 &&
      tutor?.tutorData?.HourlyRate
    ) {
      const totalDays = calculateTotalDays(startDate, endDate);
      const totalSessionHours = totalDays * totalHours;
      setTotalCost(totalSessionHours * tutor.tutorData.HourlyRate);
    } else {
      setTotalCost(0);
    }
  }, [startDate, endDate, totalHours, tutor]);

  const handleBooking = async () => {
    if (!userData || !userData._id) {
      setError("User not logged in.");
      toast.error("User not logged in.");
      return;
    }

    if (!startDate || !endDate || !selectedTime.length || totalHours <= 0) {
      if (!startDate) toast.error("Start date is required.");
      if (!endDate) toast.error("End date is required.");
      if (selectedTime.length === 0)
        toast.error("Please select at least one time slot.");
      if (totalHours <= 0) toast.error("Please enter the number of hours.");
      setError("Please fill in all booking fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${backendUrl}/api/bookings/book`,
        {
          userId: userData._id,
          tutorId,
          startDate,
          endDate,
          time: selectedTime.join(", "),
          dailyHour: totalHours,
          mode,
          message,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Booking successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(response.data.message || "Booking failed");
        toast.error(response.data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!tutor) return <p>Loading tutor details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Book Your Tutoring Session with {tutor?.name || "Tutor"}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setSelectedTime([]);
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setSelectedTime([]);
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              min={startDate}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center text-gray-700 font-medium">
              Select Time
            </label>
            <select
              multiple
              value={selectedTime}
              onChange={(e) =>
                setSelectedTime(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            >
              {getAvailableTimes().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center text-gray-700 font-medium">
              Enter Daily Hours
            </label>
            <input
              type="number"
              value={totalHours}
              min="0"
              step="0.5"
              onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-[600] text-gray-700 mb-2">
            Mode of Tutoring
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="online"
                checked={mode === "online"}
                onChange={() => setMode("online")}
                className="mr-2"
              />
              <Video className="w-4 h-4 mr-1 text-blue-600" />
              Online
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="offline"
                checked={mode === "offline"}
                onChange={() => setMode("offline")}
                className="mr-2"
              />
              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
              In-Person
            </label>
          </div>
        </div>

        <div className="mt-6">
          <label className=" text-sm font-[600] text-gray-700 mb-2 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
            Additional Information
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter any additional information (e.g., your phone number, further instructions, etc.)"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="mt-8 p-6 bg-orange-50 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Session Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Hours:</span>
              <span>{totalHours.toFixed(1)} hours per day</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Rate per Hour:</span>
              <span>
                Rs{" "}
                {tutor.tutorData?.HourlyRate
                  ? Number(tutor.tutorData.HourlyRate).toFixed(2)
                  : "N/A"}
              </span>
            </div>
            <div className="pt-4 border-t border-orange-200">
              <div className="flex justify-between items-center text-lg">
                <span>Total Cost:</span>
                <span>Rs {totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`mt-8 w-full text-white py-3 px-6 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          onClick={handleBooking}
          disabled={!totalHours || !startDate || !endDate || loading}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default TutorBook;
