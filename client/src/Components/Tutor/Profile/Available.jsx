// import { Clock } from "lucide-react";
// import React, { useState, useEffect } from "react";

// export default function Available({ availability, editMode, onAvailabilityChange }) {
//   const [selectedDays, setSelectedDays] = useState({
//     mon: false,
//     tue: false,
//     wed: false,
//     thu: false,
//     fri: false,
//     sat: false,
//     sun: false,
//   });

//   const timeSlots = ["02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];
//   const displayDays = [
//     { key: "mon", label: "Mon" },
//     { key: "tue", label: "Tue" },
//     { key: "wed", label: "Wed" },
//     { key: "thu", label: "Thu" },
//     { key: "fri", label: "Fri" },
//     { key: "sat", label: "Sat" },
//     { key: "sun", label: "Sun" },
//   ];

//   // Initialize selected days based on availability
//   useEffect(() => {
//     const initialSelectedDays = displayDays.reduce(
//       (acc, { key }) => ({
//         ...acc,
//         [key]: (availability[key]?.length || 0) > 0,
//       }),
//       {}
//     );
//     setSelectedDays(initialSelectedDays);
//   }, [availability]);

//   const handleDayToggle = (day) => {
//     if (!editMode) return;
//     setSelectedDays((prev) => ({
//       ...prev,
//       [day]: !prev[day],
//     }));
//   };

//   const handleTimeSlotToggle = (day, timeSlot) => {
//     if (!editMode) return;
//     onAvailabilityChange(day, timeSlot);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//       <div className="flex items-center space-x-2 mb-6">
//         <Clock className="w-6 h-6 text-blue-600" />
//         <h3 className="text-xl font-semibold text-gray-900">Teaching Schedule</h3>
//       </div>

//       <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
//         {/* Available Days */}
//         <div className="mb-8">
//           <h4 className="text-lg font-medium text-gray-900 mb-4">Available Days</h4>
//           <div className="grid grid-cols-7 gap-4">
//             {displayDays.map(({ key, label }) => (
//               <div
//                 key={key}
//                 onClick={() => handleDayToggle(key)}
//                 className={`flex flex-col items-center p-3 rounded-lg transition-all ${
//                   !editMode ? "cursor-not-allowed" : "cursor-pointer"
//                 } ${
//                   selectedDays[key]
//                     ? "bg-white shadow-sm border border-blue-200"
//                     : "hover:bg-white/50"
//                 }`}
//               >
//                 <span className="text-sm font-medium text-gray-700 mb-2">{label}</span>
//                 <div
//                   className={`w-4 h-4 rounded border ${
//                     selectedDays[key]
//                       ? "bg-blue-600 border-blue-600"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   {selectedDays[key] && (
//                     <svg
//                       className="w-4 h-4 text-white"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Time Slots */}
//         <div>
//           <h4 className="text-lg font-medium text-gray-900 mb-4">Time Slots</h4>
//           <div className="space-y-4">
//             {displayDays.map(({ key, label }) =>
//               selectedDays[key] ? (
//                 <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
//                   <h5 className="text-sm font-medium text-gray-700 capitalize mb-3">{label}</h5>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     {timeSlots.map((slot) => (
//                       <label
//                         key={`${key}-${slot}`}
//                         className={`relative flex items-center p-3 rounded-lg transition-all ${
//                           editMode ? "cursor-pointer hover:bg-gray-50" : "cursor-not-allowed"
//                         } ${
//                           availability[key]?.includes(slot)
//                             ? "bg-blue-50 border border-blue-200"
//                             : "border border-gray-200"
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={availability[key]?.includes(slot) || false}
//                           onChange={() => handleTimeSlotToggle(key, slot)}
//                           disabled={!editMode}
//                           className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
//                         />
//                         <span className="ml-3 text-sm font-medium text-gray-700">
//                           {slot}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Available = ({ availability, editMode, onAvailabilityChange }) => {
  const [selectedDays, setSelectedDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const timeSlots = ["02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];
  const displayDays = [
    { key: "mon", label: "Mon" },
    { key: "tue", label: "Tue" },
    { key: "wed", label: "Wed" },
    { key: "thu", label: "Thu" },
    { key: "fri", label: "Fri" },
    { key: "sat", label: "Sat" },
    { key: "sun", label: "Sun" },
  ];

  // Initialize selected days based on availability
  useEffect(() => {
    const initialSelectedDays = displayDays.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: (availability[key]?.length || 0) > 0,
      }),
      {}
    );
    setSelectedDays(initialSelectedDays);
  }, [availability]);

  const handleDayToggle = (day) => {
    if (!editMode) return;
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleTimeSlotToggle = (day, timeSlot) => {
    if (!editMode) return;
    onAvailabilityChange(day, timeSlot);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-white" />
          <h3 className="text-xl font-semibold text-white">Teaching Schedule</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
          {/* Available Days */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Available Days</h4>
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {displayDays.map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => handleDayToggle(key)}
                  className={`flex flex-col items-center p-2 sm:p-3 rounded-lg transition-all ${
                    !editMode ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                  } ${
                    selectedDays[key]
                      ? "bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 shadow-sm"
                      : "hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`text-sm font-medium mb-2 ${selectedDays[key] ? "text-orange-800" : "text-gray-700"}`}
                  >
                    {label}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedDays[key] ? "bg-orange-500 text-white" : "border border-gray-300"
                    }`}
                  >
                    {selectedDays[key] && <CheckCircle className="w-4 h-4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Time Slots</h4>
            <div className="space-y-4">
              {displayDays.map(({ key, label }) =>
                selectedDays[key] ? (
                  <div
                    key={key}
                    className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm transition-all hover:shadow-md"
                  >
                    <h5 className="text-sm font-medium text-orange-700 capitalize mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2">
                        {label.charAt(0)}
                      </span>
                      {label}day
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <label
                          key={`${key}-${slot}`}
                          className={`relative flex items-center p-3 rounded-lg transition-all ${
                            editMode ? "cursor-pointer hover:bg-orange-50" : "cursor-not-allowed opacity-80"
                          } ${
                            availability[key]?.includes(slot)
                              ? "bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200"
                              : "border border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={availability[key]?.includes(slot) || false}
                            onChange={() => handleTimeSlotToggle(key, slot)}
                            disabled={!editMode}
                            className="h-4 w-4 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span
                            className={`ml-3 text-sm font-medium ${
                              availability[key]?.includes(slot) ? "text-orange-800" : "text-gray-700"
                            }`}
                          >
                            {slot}
                          </span>
                          {availability[key]?.includes(slot) && (
                            <CheckCircle className="w-4 h-4 text-orange-500 ml-auto" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Available;
