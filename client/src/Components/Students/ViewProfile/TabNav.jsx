// import React from "react";
// import { User, GraduationCap, BookMarked, Star } from "lucide-react";

// const tabs = [
//   { id: "about", label: "About", icon: <User size={18} /> },
//   { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
//   { id: "subjects", label: "Subjects", icon: <BookMarked size={18} /> },
//   { id: "reviews", label: "Reviews", icon: <Star size={18} /> },
// ];

// function TabNav({ activeTab, setActiveTab }) {
//   return (
//     <div className="bg-white rounded-t-xl shadow-md overflow-hidden">
//       <div className="flex border-b">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
//               activeTab === tab.id
//                 ? "text-indigo-600 border-b-2 border-indigo-600"
//                 : "text-gray-600 hover:text-indigo-600"
//             }`}
//           >
//             <div className="flex items-center justify-center gap-2">
//               {tab.icon}
//               <span>{tab.label}</span>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TabNav;

import { User, GraduationCap, BookOpen, Star, ChevronRight } from "lucide-react"

function TabNav({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "about",
      label: "About",
      icon: User,
      description: "Personal information and teaching style",
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      description: "Qualifications and academic background",
    },
    {
      id: "subjects",
      label: "Subjects",
      icon: BookOpen,
      description: "Areas of expertise and teaching topics",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      description: "Feedback from previous students",
    },
  ]

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-4 border border-orange-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Tutor Profile</h2>

      <div className="grid gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full text-left transition-all duration-200 ease-in-out
                ${isActive
                  ? "bg-white shadow-md border-l-4 border-orange-500"
                  : "bg-white/60 hover:bg-white/80 border-l-4 border-transparent"
                }
                rounded-lg overflow-hidden group
              `}
            >
              <div className="flex items-center p-3">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500"}
                  `}
                >
                  <Icon size={18} />
                </div>

                <div className="ml-3 flex-grow">
                  <div className={`font-medium ${isActive ? "text-orange-700" : "text-gray-700"}`}>{tab.label}</div>
                  <div className={`text-xs ${isActive ? "text-orange-600" : "text-gray-500"}`}>{tab.description}</div>
                </div>

                <ChevronRight
                  size={16}
                  className={`
                    transition-transform duration-200
                    ${isActive ? "text-orange-500 rotate-90" : "text-gray-400 group-hover:text-orange-400"}
                  `}
                />
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">Select a tab to view detailed information</div>
    </div>
  )
}

export default TabNav
