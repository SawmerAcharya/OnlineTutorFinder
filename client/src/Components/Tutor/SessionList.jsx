// import React from "react";
// import Avatar from "@mui/material/Avatar";

// function SessionsList() {
//   const sessions = [
//     {
//       name: "Alice Brown",
//       subject: "Advanced Calculus",
//       time: "2:00 PM - 3:00 PM",
//       status: "Confirmed",
//       avatar: "/path_to_alice_image.jpg",
//     },
//     {
//       name: "James Wilson",
//       subject: "Quantum Physics",
//       time: "4:30 PM - 5:30 PM",
//       status: "Pending",
//       avatar: "/path_to_james_image.jpg",
//     },
//   ];

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl ">
      
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
//         <button className="text-blue-500 hover:text-blue-600">View All</button>
//       </div>
//       {sessions.map((session, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-between mb-6 last:mb-0 p-4 rounded-lg hover:bg-gray-100"
//         >
//           <div className="flex items-center space-x-4 flex-grow">
//             {" "}
//             {/* Ensure flex items can grow */}
//             <Avatar
//               src={session.avatar}
//               alt={session.name}
//               className="w-14 h-14"
//             />
//             <div className="min-w-0">
//               {" "}
//               {/* Prevent overflow */}
//               <p className="font-semibold text-lg truncate">
//                 {session.name}
//               </p>{" "}
//               {/* Truncate long names */}
//               <p className="text-gray-600 truncate">{session.subject}</p>{" "}
//               {/* Truncate long subjects */}
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div>
//               <p className="text-md">{session.time}</p>
//               <span
//                 className={`px-4 py-2 text-sm rounded-full font-semibold gap-3 ${
//                   session.status === "Confirmed"
//                     ? "bg-green-200 text-green-900"
//                     : "bg-yellow-200 text-yellow-900"
//                 }`}
//               >
//                 {session.status}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SessionsList;

import React from "react";
import Avatar from "@mui/material/Avatar";
import { Clock } from "lucide-react";

export default function SessionsList() {
  const sessions = [
    {
      name: "Alice Brown",
      subject: "Advanced Calculus",
      time: "2:00 PM - 3:00 PM",
      status: "Confirmed",
      avatar: "/path_to_alice_image.jpg",
    },
    {
      name: "James Wilson",
      subject: "Quantum Physics",
      time: "4:30 PM - 5:30 PM",
      status: "Pending",
      avatar: "/path_to_james_image.jpg",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Upcoming Sessions</h2>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-4">
              <Avatar
                src={session.avatar}
                alt={session.name}
                className="w-14 h-14"
              />
              <div>
                <p className="text-lg font-medium text-gray-800">{session.name}</p>
                <p className="text-sm text-gray-600">{session.subject}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-gray-600 justify-end">
                <Clock size={14} className="mr-1" />
                {session.time}
              </div>
              <span
                className={`mt-1 inline-block text-xs px-3 py-1 rounded-full font-medium ${
                  session.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {session.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
