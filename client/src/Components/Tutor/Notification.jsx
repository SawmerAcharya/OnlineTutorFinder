import React from "react";

function Notification({ notifications, onClearAll }) {
  console.log("Notification component received notifications:", notifications);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="absolute right-0 mt-5 w-96 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No new messages</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {/* <img
                  className="h-10 w-10 rounded-full"
                  src="https://via.placeholder.com/120"
                  alt="User avatar"
                /> */}

                <img
                  src={
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
                  }
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTime(notif.createdAt)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {!notif.read && (
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
