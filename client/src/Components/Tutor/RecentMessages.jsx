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
import React from "react";
import Avatar from "@mui/material/Avatar";

function RecentMessages() {
  const messages = [
    {
      name: "Alice Brown",
      text: "Can we reschedule tomorrow's session to 3 PM?",
      time: "10:30 AM",
      avatar: "/path_to_alice_avatar.jpg",
      unread: true,
    },
    {
      name: "James Wilson",
      text: "Thank you for the great physics lesson!",
      time: "Yesterday",
      avatar: "/path_to_james_avatar.jpg",
      unread: false,
    },
    {
      name: "Emma Davis",
      text: "Hey, do you have the notes from last class?",
      time: "2 days ago",
      avatar: "/path_to_emma_avatar.jpg",
      unread: true,
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Messages</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start space-x-4">
            <Avatar src={message.avatar} alt={message.name} className="w-12 h-12" />
            <div className="flex flex-col bg-gray-100 p-3 rounded-lg shadow-sm w-full">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">{message.name}</p>
                <p className="text-xs text-gray-500">{message.time}</p>
              </div>
              <p className="text-gray-700 mt-1">{message.text}</p>
              {message.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentMessages;
