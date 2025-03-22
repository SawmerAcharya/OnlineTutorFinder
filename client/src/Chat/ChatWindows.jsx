import React, { useState } from "react";
import { Send } from "lucide-react";

export function ChatWindow({ tutor, messages, onSendMessage, currentUserId }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Format timestamps for display
  const formatTime = (timestamp) => {
    if (!timestamp) return "Time not available";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleTimeString();
  };

  if (!tutor) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a tutor to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Tutor Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <img
            src={
              tutor?.tutorData?.profile
                ? `https://utfs.io/f/${tutor.tutorData.profile}`
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
            }
            alt={tutor.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{tutor.name}</h3>
            <p className="text-sm text-gray-600">
              {tutor.tutorData?.CurrentSubject ||
                tutor.subject ||
                "Subject not provided"}
            </p>
          </div>
          <span
            className={`ml-auto w-2 h-2 rounded-full ${
              tutor.status === "online" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          // Determine sender ID (handles both object and string cases)
          const senderId =
            typeof msg.sender === "object" ? msg.sender._id : msg.sender;
          const isSender = String(senderId) === String(currentUserId);

          return (
            <div
              key={msg._id || index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isSender ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-xs mt-1 opacity-70">
                  {formatTime(msg.timestamp || msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}


