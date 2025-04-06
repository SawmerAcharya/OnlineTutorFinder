import React from "react";
import { User, GraduationCap, BookMarked, Star } from "lucide-react";

const tabs = [
  { id: "about", label: "About", icon: <User size={18} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
  { id: "subjects", label: "Subjects", icon: <BookMarked size={18} /> },
  { id: "reviews", label: "Reviews", icon: <Star size={18} /> },
];

function TabNav({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-t-xl shadow-md overflow-hidden">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabNav;
