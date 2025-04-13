

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUsers, FiClock } from 'react-icons/fi';

function DashboardWidgets() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalStudents: 0,
    pendingTutors: 0,
    approvedTutors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/user/dashboard/stats");
        setStats(response.data); // Set stats directly from the API response
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex space-x-4 p-4 bg-gray-50">
      {/* Total Users Widget */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center space-x-6">
        <div className="p-4 text-blue-500 bg-blue-100 rounded-full">
          <FiUsers size={28} />
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">Total Users</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
          <p className="text-sm text-gray-500">{stats.totalTutors} Tutors · {stats.totalStudents} Students</p>
        </div>
      </div>

      {/* Pending Verification Widget */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center space-x-6">
        <div className="p-4 text-yellow-500 bg-yellow-100 rounded-full">
          <FiClock size={28} />
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">Pending Tutor Verification</p>
          <p className="text-3xl font-bold text-gray-800">{stats.pendingTutors}</p>
          <p className="text-sm text-gray-500">{stats.approvedTutors} Verified Tutors</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardWidgets;
