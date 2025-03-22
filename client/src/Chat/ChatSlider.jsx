import React from "react";

export function ChatSidebar({ tutors, selectedTutorId, onSelectTutor }) {
  return (
    <div className="w-72 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
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
                  tutor?.tutorData?.profile
                    ? `https://utfs.io/f/${tutor.tutorData.profile}`
                    : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
                }
                alt={tutor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <p className="font-medium">{tutor.name}</p>
                <p className="text-sm text-gray-600">
                  {tutor.tutorData?.CurrentSubject ||
                    tutor.subject ||
                    "Subject not provided"}
                </p>
              </div>
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
