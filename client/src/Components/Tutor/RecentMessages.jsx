// import React from "react";
// import Avatar from "@mui/material/Avatar";

// function RecentMessages() {
//   const messages = [
//     {
//       name: "Alice Brown",
//       text: "Can we reschedule tomorrow's session to 3 PM?",
//       time: "10:30 AM",
//       avatar: "/path_to_alice_avatar.jpg", 
//     },
//     {
//       name: "James Wilson",
//       text: "Thank you for the great physics lesson!",
//       time: "Yesterday",
//       avatar: "/path_to_james_avatar.jpg",
//     },
//     {
//       name: "James Wilson",
//       text: "Thank you for the great physics lesson!",
//       time: "Yesterday",
//       avatar: "/path_to_james_avatar.jpg",
//     },
//   ];

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Recent Messages</h2>
//         <button className="text-blue-500 hover:text-blue-600">View All</button>
//       </div>
//       {messages.map((message, index) => (
//         <div
//           key={index}
//           className={`flex items-center justify-between mb-6 ${index === messages.length - 1 ? 'mb-0' : ''}`}
//         >
//           <div className="flex items-center space-x-3">
//             <Avatar src={message.avatar} alt={message.name} className="w-10 h-10" />
//             <div className="flex flex-col">
//               <p className="font-semibold">{message.name}</p>
//               <p className="text-gray-500">{message.text}</p>
//             </div>
//           </div>
//           <p className="text-sm text-gray-500">{message.time}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RecentMessages;


import { ChevronRight } from "lucide-react"

export default function RecentMessages() {
  const messages = [
    {
      name: "Alice Brown",
      text: "Can we reschedule tomorrow's session to 3 PM?",
      time: "10:30 AM",
      avatar: "/path_to_alice_avatar.jpg",
    },
    {
      name: "James Wilson",
      text: "Thank you for the great physics lesson!",
      time: "Yesterday",
      avatar: "/path_to_james_avatar.jpg",
    },
    {
      name: "Emma Davis",
      text: "I've completed the assignment you sent over.",
      time: "Yesterday",
      avatar: "/path_to_emma_avatar.jpg",
    },
  ]

  // Function to get initials from name
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex flex-row items-center justify-between border-b p-4 pb-2">
        <h3 className="text-xl font-semibold">Recent Messages</h3>
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 -mr-2 rounded-md px-2 py-1">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <div className="space-y-0">
          {messages.map((message, index) => (
            <div key={index}>
              <div className="flex items-start justify-between py-4 hover:bg-gray-50 rounded-md px-2 transition-colors">
                <div className="flex gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border shadow-sm">
                    <img
                      src={message.avatar || "/placeholder.svg"}
                      alt={message.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                    <div
                      className="absolute inset-0 hidden items-center justify-center bg-gray-200 text-sm font-medium"
                      style={{ display: "none" }}
                    >
                      {getInitials(message.name)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{message.name}</p>
                    <p className="text-sm text-gray-500">{message.text}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{message.time}</span>
              </div>
              {index < messages.length - 1 && <div className="h-px bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}