import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AssignmentList from "../Assign/AssignmentList";
import { Bell } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "upcoming", label: "Upcoming" },
    { key: "submitted", label: "Submitted" },
    // { key: "past", label: "Past Due" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">
            Student Assignment Portal
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === "/"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-black mb-6">My Assignments</h2>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Assignment List Component */}
        <AssignmentList type={activeTab} />
      </main>
    </div>
  );
}