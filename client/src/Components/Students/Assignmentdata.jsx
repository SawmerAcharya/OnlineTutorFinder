

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate

const assignmentsData = [
  {
    id: 1,
    course: "CS101",
    status: ["Pending", "Not Started"],
    title: "Introduction to Programming Concepts",
    subtitle: "Introduction to Computer Science",
    due: "Mar 25, 11:59 PM",
  },
  {
    id: 2,
    course: "CS201",
    status: ["Pending", "In Progress"],
    title: "Data Structures Implementation",
    subtitle: "Data Structures and Algorithms",
    due: "Mar 28, 11:59 PM",
  },
  {
    id: 3,
    course: "WD200",
    status: ["Overdue", "Not Started"],
    title: "Web Development Project",
    subtitle: "Web Development Fundamentals",
    due: "Mar 20, 11:59 PM",
  },
  {
    id: 4,
    course: "DB250",
    status: ["Completed", "Submitted"],
    title: "Database Design Assignment",
    subtitle: "Database Systems",
    due: "Mar 15, 11:59 PM",
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // 👈 Initialize navigate

  const filteredAssignments = assignmentsData.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  // 👇 Function to navigate when clicking "View Assignment"
  const handleViewAssignment = (assignmentId) => {
    navigate(`/assignment/${assignmentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
        <p className="text-gray-700 mb-6">View and manage your course assignments</p>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search assignments..."
            className="px-4 py-2 rounded border w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="px-4 py-2 rounded border">
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white p-4 shadow rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">{assignment.course}</span>
                    {assignment.status.map((status, idx) => (
                      <span
                        key={idx}
                        className={`text-sm px-2 py-1 rounded-full ${
                          status === 'Overdue' ? 'bg-red-200 text-red-800'
                          : status === 'Completed' ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {status}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-semibold text-lg">{assignment.title}</h2>
                  <p className="text-sm text-gray-600">{assignment.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1">📅 Due {assignment.due}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <button
                    onClick={() => handleViewAssignment(assignment.id)} // 👈 Call navigate on click
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View Assignment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
