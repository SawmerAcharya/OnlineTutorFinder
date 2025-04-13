

// import { useState } from 'react';
// import { Calendar, Clock, MapPin, Video, User, Mail, Phone, BookOpen, MessageSquare, Plus, CheckCircle, ArrowRight } from 'lucide-react';

// const levels = [
//   "Primary (Class 1-5)",
//   "L Secondary (Class 6-8)",
//   "Secondary (Class 9-10)",
//   "H Secondary (Class 11-12)",
//   "Bachelor Level",
//   "Masters Level",
// ];

// function Book() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     Subjects: ["Mathematics", "Science", "English"],
//     CurrentSubject: "Mathematics",
//     NewSubject: "",
//     mode: "online",
//     location: "",
//     date: "",
//     time: "",
//     level: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddSubject = (e) => {
//     e.preventDefault();
//     if (formData.NewSubject && !formData.Subjects.includes(formData.NewSubject)) {
//       setFormData((prev) => ({
//         ...prev,
//         Subjects: [...prev.Subjects, prev.NewSubject],
//         CurrentSubject: prev.NewSubject,
//         NewSubject: "",
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//       <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
//         <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-8 px-4 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-full opacity-10">
//             <div className="absolute -top-4 -left-4 w-32 h-32 bg-white rounded-full"></div>
//             <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full"></div>
//             <div className="absolute bottom-5 left-1/4 w-20 h-20 bg-white rounded-full"></div>
//           </div>
//           <h2 className="text-3xl font-bold relative z-10">Book a Tutor</h2>
//           <p className="mt-2 text-lg relative z-10">Schedule your personalized tutoring session</p>
//         </div>

//         <div className="px-6 py-8 sm:p-10">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <h3 className="text-lg font-semibold text-orange-700 mb-4 pb-2 border-b border-orange-100">
//                   Personal Information
//                 </h3>
//               </div>
              
//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                   <User className="w-4 h-4 mr-2 text-orange-500" />
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                   <Mail className="w-4 h-4 mr-2 text-orange-500" />
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                   <Phone className="w-4 h-4 mr-2 text-orange-500" />
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//                 />
//               </div>

//               <div className="sm:col-span-2 mt-4">
//                 <h3 className="text-lg font-semibold text-orange-700 mb-4 pb-2 border-b border-orange-100">
//                   Session Details
//                 </h3>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                   <BookOpen className="w-4 h-4 mr-2 text-orange-500" />
//                   Subject
//                 </label>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <select
//                     name="CurrentSubject"
//                     value={formData.CurrentSubject}
//                     onChange={handleChange}
//                     className="block w-full border bg-white border-gray-200 text-gray-700 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
//                   >
//                     {formData.Subjects.map((subject, index) => (
//                       <option key={index} value={subject}>
//                         {subject}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="flex w-full sm:w-auto">
//                     <input
//                       type="text"
//                       name="NewSubject"
//                       value={formData.NewSubject}
//                       onChange={handleChange}
//                       className="w-full border bg-white border-gray-200 text-gray-700 rounded-l-lg py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
//                     />
//                     <button
//                       onClick={handleAddSubject}
//                       className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-r-lg transition-all duration-200 flex items-center"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Mode of Tutoring
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
//                     formData.mode === "online" 
//                       ? "bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-sm" 
//                       : "border-gray-200 hover:bg-orange-50"
//                   }`}>
//                     <input
//                       type="radio"
//                       name="mode"
//                       value="online"
//                       checked={formData.mode === "online"}
//                       onChange={handleChange}
//                       className="sr-only"
//                     />
//                     <Video className={`w-5 h-5 mr-2 ${formData.mode === "online" ? "text-orange-600" : "text-gray-500"}`} />
//                     <span className={formData.mode === "online" ? "font-medium text-orange-800" : "text-gray-700"}>Online</span>
//                     {formData.mode === "online" && <CheckCircle className="w-4 h-4 text-orange-500 ml-2" />}
//                   </label>
//                   <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
//                     formData.mode === "offline" 
//                       ? "bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-sm" 
//                       : "border-gray-200 hover:bg-orange-50"
//                   }`}>
//                     <input
//                       type="radio"
//                       name="mode"
//                       value="offline"
//                       checked={formData.mode === "offline"}
//                       onChange={handleChange}
//                       className="sr-only"
//                     />
//                     <MapPin className={`w-5 h-5 mr-2 ${formData.mode === "offline" ? "text-orange-600" : "text-gray-500"}`} />
//                     <span className={formData.mode === "offline" ? "font-medium text-orange-800" : "text-gray-700"}>In-Person</span>
//                     {formData.mode === "offline" && <CheckCircle className="w-4 h-4 text-orange-500 ml-2" />}
//                   </label>
//                 </div>
//               </div>

//               {formData.mode === "offline" && (
//                 <div className="animate-fadeIn">
//                   <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                     <MapPin className="w-4 h-4 mr-2 text-orange-500" />
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-orange-500" />
//                   Preferred Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                   <Clock className="w-4 h-4 mr-2 text-orange-500" />
//                   Preferred Time
//                 </label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Education Level
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {levels.map((level, index) => (
//                     <label 
//                       key={index}
//                       className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
//                         formData.level === level 
//                           ? "bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-sm" 
//                           : "border-gray-200 hover:bg-orange-50"
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="level"
//                         value={level}
//                         checked={formData.level === level}
//                         onChange={handleChange}
//                         className="sr-only"
//                       />
//                       <span className={formData.level === level ? "font-medium text-orange-800" : "text-gray-700"}>
//                         {level}
//                       </span>
//                       {formData.level === level && <CheckCircle className="w-4 h-4 text-orange-500 ml-auto" />}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                 <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
//                 Additional Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
//               ></textarea>
//             </div>

//             <div className="flex justify-center pt-4">
//               <button
//                 type="submit"
//                 className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 shadow-md flex items-center"
//               >
//                 Book Your Session
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Book;

import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../Context/AppContex"; // Adjust path as needed
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
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

        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
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
            <div className="pt-4 border-t border-blue-200">
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
              : "bg-blue-600 hover:bg-blue-700"
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
