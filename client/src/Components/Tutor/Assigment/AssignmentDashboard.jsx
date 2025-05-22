


import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import Tabs from "./Tabs";
import { AppContent } from "../../../Context/AppContex";

function AssignmentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const { userData } = useContext(AppContent);
  const storedTutorId = localStorage.getItem("tutorId");
  const tutorId = userData?._id || storedTutorId || null;

  const tabs = [
    {
      name: "Create Assignment",
      href: `/assign/${tutorId}`,
      current: activeTab === "create",
    },
    {
      name: "Manage Assignments",
      href: "/manage",
      current: activeTab === "manage",
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === "create" ? "/assign" : "/manage");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Tutor Assignment Center
        </h1>

        <Tabs tabs={tabs} onTabChange={handleTabChange} />
        <div className="mt-6">
          {activeTab === "create" ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Please use the Assign Assignment button in the header or select
                the Create Assignment tab to create a new assignment.
              </p>
              <button
                onClick={() => navigate(`/assign/${tutorId}`)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Assignment
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Please use the Manage Assignments tab to view and manage your
                existing assignments.
              </p>
              <button
                onClick={() => navigate("/manage")}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Manage Assignments
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentDashboard;