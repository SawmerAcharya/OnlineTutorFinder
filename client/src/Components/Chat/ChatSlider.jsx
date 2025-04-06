import React from "react";

export function ChatSidebar({ tutors, selectedTutorId, onSelectTutor }) {
  return (
    <div className="w-72 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Tutors</h2>
        <div className="space-y-2">
          {tutors.map((tutor) => (
            <button
              key={tutor._id}
              onClick={() => onSelectTutor(tutor._id)}
              className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                selectedTutorId === tutor._id
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={
                  tutor?.profile
                    ? `https://utfs.io/f/${tutor.profile}`
                    : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                }
                alt={tutor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <p className="font-medium">{tutor.name}</p>
                <p className="text-sm text-gray-600">
                  {tutor.tutorData?.City || "Subject not provided"}
                </p>
              </div>
              {/* Online Status Indicator */}
              <span
                className={`w-2 h-2 rounded-full ${
                  tutor.status === "online" ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
