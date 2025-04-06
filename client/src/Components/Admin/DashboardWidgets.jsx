import React from 'react';
import { FiUsers, FiClock } from 'react-icons/fi';

function DashboardWidgets() {
  return (
    <div className="flex space-x-4 p-4 bg-gray-50"> {/* Adding a light background for overall spacing */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center space-x-6"> {/* Increased padding and space between items */}
        <div className="p-4 text-blue-500 bg-blue-100 rounded-full"> {/* Increased padding for icon background */}
          <FiUsers size={28} /> {/* Slightly larger icon size for better visibility */}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">Total Users</p>
          <p className="text-3xl font-bold text-gray-800">1,479</p> {/* Larger font size for main numbers */}
          <p className="text-sm text-gray-500">245 Tutors · 1,234 Students</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center space-x-6"> {/* Consistent styling with the first widget */}
        <div className="p-4 text-yellow-500 bg-yellow-100 rounded-full"> {/* Consistent icon padding */}
          <FiClock size={28} /> {/* Consistent icon size */}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">Pending Tutor Verification</p>
          <p className="text-3xl font-bold text-gray-800">12</p> {/* Increased font size for emphasis */}
          <p className="text-sm text-gray-500">Awaiting Document Review</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardWidgets;
