// import React, { useState } from "react";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   Video,
//   User,
//   Mail,
//   Phone,
//   BookOpen,
//   MessageSquare,
// } from "lucide-react";

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
//     // Subjects management
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
//     // Here you would typically handle form submission (e.g., send data to your server)
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddSubject = (e) => {
//     e.preventDefault();
//     // Only add the new subject if it's not already in the list and not empty
//     if (
//       formData.NewSubject &&
//       !formData.Subjects.includes(formData.NewSubject)
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         Subjects: [...prev.Subjects, prev.NewSubject],
//         CurrentSubject: prev.NewSubject,
//         NewSubject: "",
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//       <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
//         {/* Header placed outside the padded container */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-6 px-4">
//           <h2 className="text-3xl font-bold">Book a Tutor</h2>
//           <p className="mt-2 text-lg">Schedule your personalized tutoring session</p>
//         </div>

//         <div className="px-6 py-8 sm:p-10">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               {/* Full Name */}
//               <div>
//                 <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                   <User className="w-4 h-4 mr-2 text-blue-600" />
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="John Doe"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                   <Mail className="w-4 h-4 mr-2 text-blue-600" />
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                   <Phone className="w-4 h-4 mr-2 text-blue-600" />
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="+977 9844678327"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* Subject Selection + Add New Subject - full width */}
//               <div className="sm:col-span-2">
//                 <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                   <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
//                   Subject
//                 </label>
//                 <div className="flex items-center">
//                   <select
//                     name="CurrentSubject"
//                     value={formData.CurrentSubject}
//                     onChange={handleChange}
//                     className="block w-full border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 mr-2"
//                   >
//                     {formData.Subjects.map((subject, index) => (
//                       <option key={index} value={subject}>
//                         {subject}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="text"
//                     name="NewSubject"
//                     value={formData.NewSubject}
//                     onChange={handleChange}
//                     placeholder="New Subject"
//                     className="border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 mr-2"
//                   />
//                   <button
//                     onClick={handleAddSubject}
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>

//               {/* Mode of Tutoring */}
//               <div>
//                 <label className="block text-sm font-[600] text-gray-700 mb-2">
//                   Mode of Tutoring
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="mode"
//                       value="online"
//                       checked={formData.mode === "online"}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     <Video className="w-4 h-4 mr-1 text-blue-600" />
//                     Online
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="mode"
//                       value="offline"
//                       checked={formData.mode === "offline"}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     <MapPin className="w-4 h-4 mr-1 text-blue-600" />
//                     In-Person
//                   </label>
//                 </div>
//               </div>

//               {/* Location (only if mode is offline) */}
//               {formData.mode === "offline" && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <MapPin className="w-4 h-4 mr-2 text-blue-600" />
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     placeholder="Enter preferred location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               )}

//               {/* Preferred Date */}
//               <div>
//                 <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-blue-600" />
//                   Preferred Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* Preferred Time */}
//               <div>
//                 <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                   <Clock className="w-4 h-4 mr-2 text-blue-600" />
//                   Preferred Time
//                 </label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* Level */}
//               <div>
//                 <label className="block text-sm font-[600] text-gray-700 mb-2">
//                   Level
//                 </label>
//                 <select
//                   name="level"
//                   value={formData.level}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select Level</option>
//                   {levels.map((level, index) => (
//                     <option key={index} value={level}>
//                       {level}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Additional Message */}
//             <div>
//               <label className="text-sm font-[600] text-gray-700 mb-2 flex items-center">
//                 <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
//                 Additional Message
//               </label>
//               <textarea
//                 name="message"
//                 placeholder="Any specific requirements or questions?"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
//               >
//                 Book Your Session
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Book;


import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, User, Mail, Phone, BookOpen, MessageSquare, Plus, CheckCircle, ArrowRight } from 'lucide-react';

const levels = [
  "Primary (Class 1-5)",
  "L Secondary (Class 6-8)",
  "Secondary (Class 9-10)",
  "H Secondary (Class 11-12)",
  "Bachelor Level",
  "Masters Level",
];

function Book() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    Subjects: ["Mathematics", "Science", "English"],
    CurrentSubject: "Mathematics",
    NewSubject: "",
    mode: "online",
    location: "",
    date: "",
    time: "",
    level: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (formData.NewSubject && !formData.Subjects.includes(formData.NewSubject)) {
      setFormData((prev) => ({
        ...prev,
        Subjects: [...prev.Subjects, prev.NewSubject],
        CurrentSubject: prev.NewSubject,
        NewSubject: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-8 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-5 left-1/4 w-20 h-20 bg-white rounded-full"></div>
          </div>
          <h2 className="text-3xl font-bold relative z-10">Book a Tutor</h2>
          <p className="mt-2 text-lg relative z-10">Schedule your personalized tutoring session</p>
        </div>

        <div className="px-6 py-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-lg font-semibold text-orange-700 mb-4 pb-2 border-b border-orange-100">
                  Personal Information
                </h3>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-orange-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                />
              </div>

              <div className="sm:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-orange-700 mb-4 pb-2 border-b border-orange-100">
                  Session Details
                </h3>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-orange-500" />
                  Subject
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    name="CurrentSubject"
                    value={formData.CurrentSubject}
                    onChange={handleChange}
                    className="block w-full border bg-white border-gray-200 text-gray-700 rounded-lg shadow-sm py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
                  >
                    {formData.Subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <div className="flex w-full sm:w-auto">
                    <input
                      type="text"
                      name="NewSubject"
                      value={formData.NewSubject}
                      onChange={handleChange}
                      className="w-full border bg-white border-gray-200 text-gray-700 rounded-l-lg py-3 px-4 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
                    />
                    <button
                      onClick={handleAddSubject}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-r-lg transition-all duration-200 flex items-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mode of Tutoring
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.mode === "online" 
                      ? "bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-sm" 
                      : "border-gray-200 hover:bg-orange-50"
                  }`}>
                    <input
                      type="radio"
                      name="mode"
                      value="online"
                      checked={formData.mode === "online"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Video className={`w-5 h-5 mr-2 ${formData.mode === "online" ? "text-orange-600" : "text-gray-500"}`} />
                    <span className={formData.mode === "online" ? "font-medium text-orange-800" : "text-gray-700"}>Online</span>
                    {formData.mode === "online" && <CheckCircle className="w-4 h-4 text-orange-500 ml-2" />}
                  </label>
                  <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.mode === "offline" 
                      ? "bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-sm" 
                      : "border-gray-200 hover:bg-orange-50"
                  }`}>
                    <input
                      type="radio"
                      name="mode"
                      value="offline"
                      checked={formData.mode === "offline"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <MapPin className={`w-5 h-5 mr-2 ${formData.mode === "offline" ? "text-orange-600" : "text-gray-500"}`} />
                    <span className={formData.mode === "offline" ? "font-medium text-orange-800" : "text-gray-700"}>In-Person</span>
                    {formData.mode === "offline" && <CheckCircle className="w-4 h-4 text-orange-500 ml-2" />}
                  </label>
                </div>
              </div>

              {formData.mode === "offline" && (
                <div className="animate-fadeIn">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Education Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {levels.map((level, index) => (
                    <label 
                      key={index}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.level === level 
                          ? "bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300 shadow-sm" 
                          : "border-gray-200 hover:bg-orange-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={formData.level === level}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={formData.level === level ? "font-medium text-orange-800" : "text-gray-700"}>
                        {level}
                      </span>
                      {formData.level === level && <CheckCircle className="w-4 h-4 text-orange-500 ml-auto" />}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
              ></textarea>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 shadow-md flex items-center"
              >
                Book Your Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Book;
