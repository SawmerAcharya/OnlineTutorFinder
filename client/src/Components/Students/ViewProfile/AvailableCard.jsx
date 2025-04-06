// import React from "react";
// import { Calendar} from 'lucide-react';

// function AvailableCard() {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
//         <Calendar size={20} className="mr-2 text-indigo-500" />
//         Availability
//       </h2>

//       <div className="border rounded-lg overflow-hidden">
//         <div className="grid grid-cols-7 bg-gray-50 border-b">
//           {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//             <div
//               key={day}
//               className="py-2 text-center text-sm font-medium text-gray-600"
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 text-sm">
//           {["", "", "", "", "04:00 PM", "02:00 PM", ""].map((time, index) => (
//             <div
//               key={index}
//               className={`py-3 px-1 text-center ${
//                 time ? "text-indigo-600 font-medium" : "text-gray-400"
//               }`}
//             >
//               {time}
//               {index === 5 && (
//                 <div className="mt-2 text-indigo-600 font-medium">04:00 PM</div>
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
import { Calendar } from "lucide-react";

function AvailableCard({ tutor }) {
  // Extract availability data
  const availability = tutor?.tutorData?.availability || {};

  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const displayDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
        <Calendar size={20} className="mr-2 text-indigo-500" />
        Availability
      </h2>

      <div className="border rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {displayDays.map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Time Slots Row */}
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, index) => (
            <div key={index} className="py-3 px-1 text-center text-gray-600">
              {availability[day] && availability[day].length > 0 ? (
                <div className="text-indigo-600 font-medium">
                  {availability[day].map((time, i) => (
                    <div key={i}>{time}</div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400">---</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AvailableCard;
