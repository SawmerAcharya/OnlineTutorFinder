


// import React from "react";
// import { Calendar } from "lucide-react";

// function AvailableCard({ tutor }) {
//   // Extract availability data
//   const availability = tutor?.tutorData?.availability || {};

//   const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
//   const displayDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
//         <Calendar size={20} className="mr-2 text-indigo-500" />
//         Availability
//       </h2>

//       <div className="border rounded-lg overflow-hidden">
//         {/* Header Row */}
//         <div className="grid grid-cols-7 bg-gray-50 border-b">
//           {displayDays.map((day) => (
//             <div key={day} className="py-2 text-center text-sm font-medium text-gray-600">
//               {day}
//             </div>
//           ))}
//         </div>

//         {/* Time Slots Row */}
//         <div className="grid grid-cols-7 text-sm">
//           {days.map((day, index) => (
//             <div key={index} className="py-3 px-1 text-center text-gray-600">
//               {availability[day] && availability[day].length > 0 ? (
//                 <div className="text-indigo-600 font-medium">
//                   {availability[day].map((time, i) => (
//                     <div key={i}>{time}</div>
//                   ))}
//                 </div>
//               ) : (
//                 <span className="text-gray-400">---</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AvailableCard;


import React from "react";
import { Calendar, Clock, CheckCircle2, X } from "lucide-react";

function AvailableCard({ tutor }) {
  const availability = tutor?.tutorData?.availability || {};

  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const displayDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const availableDaysCount = Object.values(availability).filter(
    (slots) => slots && slots.length > 0
  ).length;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg p-6 border border-orange-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="bg-orange-100 p-2 rounded-full mr-3">
            <Calendar size={20} className="text-orange-600" />
          </div>
          Weekly Availability
        </h2>
        <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-orange-700 shadow-sm border border-orange-200 flex items-center">
          <Clock size={14} className="mr-1.5 text-orange-500" />
          Available {availableDaysCount}/7 days
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {shortDays.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">{day}</div>
            <div
              className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center text-sm font-medium ${
                availability[days[index]] && availability[days[index]].length > 0
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Availability */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="grid gap-3">
          {days.map((day, index) => {
            const hasAvailability = availability[day] && availability[day].length > 0;
            return (
              <div
                key={day}
                className={`flex items-center p-2 rounded-lg ${
                  hasAvailability ? "bg-orange-50" : "bg-gray-50"
                }`}
              >
                <div className="w-24 flex-shrink-0">
                  <div className="font-medium text-gray-700">{displayDays[index]}</div>
                </div>

                <div className="flex-grow">
                  {hasAvailability ? (
                    <div className="flex flex-wrap gap-2">
                      {availability[day].map((time, i) => (
                        <div
                          key={i}
                          className="bg-white text-orange-700 px-3 py-1 rounded-full text-sm border border-orange-200 shadow-sm flex items-center"
                        >
                          <Clock size={12} className="mr-1.5 text-orange-500" />
                          {time}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400 text-sm">
                      <X size={14} className="mr-1.5" />
                      Not available
                    </div>
                  )}
                </div>

                <div className="w-8 flex-shrink-0 flex justify-center">
                  {hasAvailability ? (
                    <CheckCircle2 size={18} className="text-orange-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
        <Clock size={12} className="mr-1.5 text-gray-400" />
        All times are shown in your local timezone
      </div>
    </div>
  );
}

export default AvailableCard;
