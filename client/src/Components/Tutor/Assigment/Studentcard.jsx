import React from "react";

function StudentCard({ id, name, email, profile, selected, onSelect }) {
  const avatarUrl = profile ? `https://utfs.io/f/${profile}` : null;

  return (
    <div className="flex items-center py-2">
      <input
        id={`student-${id}`}
        type="checkbox"
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        checked={selected}
        onChange={(e) => onSelect(id, e.target.checked)}
      />
      <label
        htmlFor={`student-${id}`}
        className="ml-3 flex items-center cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </label>
    </div>
  );
}

export default StudentCard;