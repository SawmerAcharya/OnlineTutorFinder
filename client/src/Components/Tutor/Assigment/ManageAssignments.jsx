import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import Tabs from "./Tabs";
import { AppContent } from "../../../Context/AppContex";
import AssignmentCard from "./AssignmentCard";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteAssignment from "./DeleteAssignment";

const MOCK_ASSIGNMENTS = [
  {
    id: "1",
    title: "Research Paper on Modern Architecture",
    dueDate: "2025-05-10",
    assignedStudents: 3,
    status: "active",
  },
  {
    id: "2",
    title: "Mathematics Problem Set 3",
    dueDate: "2025-05-05",
    assignedStudents: 3,
    status: "active",
  },
  {
    id: "3",
    title: "Literature Review Essay",
    dueDate: "2025-05-15",
    assignedStudents: 3,
    status: "active",
  },
];

function ManageAssignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [deleteAssignment, setDeleteAssignment] = useState(null);

  const { userData } = useContext(AppContent);
  const storedTutorId = localStorage.getItem("tutorId");
  const tutorId = userData?._id || storedTutorId || null;

  const tabs = [
    { name: "Create Assignment", href: `/assign/${tutorId}`, current: false },
    { name: "Manage Assignments", href: "/manage", current: true },
  ];
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/assignments/tutorAllAssignment",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setAssignments(res.data.assignments);
        }
      } catch (error) {
        console.error("Failed to fetch assignments", error);
      }
    };

    fetchAssignments();
  }, []);

  // const handleEdit = (id) => {
  //   console.log(`Edit assignment with ID: ${id}`);
  // };

  const handleEdit = (assignmentId) => {
    navigate(`/assign/${tutorId}?edit=${assignmentId}`);
  };

  const handleViewSubmissions = (id) => {
    navigate(`/submissions/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Tutor Assignment Center
        </h1>

        <Tabs tabs={tabs} />

        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Current Assignments
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Manage your existing assignments
          </p>

          <div className="space-y-4">
            {assignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No assignments found</p>
                <button
                  onClick={() => navigate(`/assign/${tutorId}`)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create New Assignment
                </button>
              </div>
            ) : (
              assignments.map((assignment, index) => (
                <AssignmentCard
                  key={assignment._id || index}
                  id={assignment._id}
                  title={assignment.title}
                  dueDate={new Date(assignment.dueDate)}
                  assignedStudents={assignment.assignedStudents?.length || 0}
                  status={assignment.status}
                  onEdit={() => handleEdit(assignment._id)}
                  onViewSubmissions={handleViewSubmissions}
                  onDelete={() => setDeleteAssignment(assignment)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {deleteAssignment && (
        <DeleteAssignment
          assignment={deleteAssignment}
          setDeleteAssignment={setDeleteAssignment}
          onDeleted={(id) =>
            setAssignments(assignments.filter((a) => a._id !== id))
          }
        />
      )}
    </div>
  );
}

export default ManageAssignments;