import { useState } from "react";
import { Search, LogOut, User, BookOpen, MessageCircle, Settings, Users, HelpCircle, Bell } from "lucide-react";

const tutors = [
  {
    name: "Dr. Sarah Wilson",
    subject: "Mathematics",
    rating: 4.9,
    students: 124,
    hours: 1500,
    price: 45,
    description: "Mathematics PhD with 10+ years of teaching experience. Specialized in making complex concepts simple and engaging.",
    skills: ["Calculus", "Linear Algebra", "Statistics"],
    languages: "English, Spanish",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Prof. James Chen",
    subject: "Physics",
    rating: 4.8,
    students: 98,
    hours: 1200,
    price: 50,
    description: "Passionate physics professor with research experience at CERN. I believe in practical demonstrations and real-world applications.",
    skills: ["Quantum Physics", "Mechanics", "Electromagnetism"],
    languages: "English, Mandarin",
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Emma Davis",
    subject: "Computer Science",
    rating: 4.7,
    students: 165,
    hours: 1800,
    price: 55,
    description: "Full stack developer and coding instructor. I focus on practical projects and industry-relevant skills.",
    skills: ["Python", "JavaScript", "Data Structures"],
    languages: "English, French",
    image: "https://randomuser.me/api/portraits/women/47.jpg"
  }
];

export default function Userdashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 bg-white shadow-md p-8 flex flex-col justify-between">
        <nav className="space-y-8">
          <h1 className="text-2xl font-bold mb-6">UserHub</h1>
          <ul className="space-y-6">
            <li className="flex items-center gap-3 text-blue-600 font-semibold"><Users className="w-5 h-5" />Dashboard</li>
            <li className="flex items-center gap-3 text-gray-600"><MessageCircle className="w-5 h-5" />Messages</li>
            <li className="flex items-center gap-3 text-gray-600"><HelpCircle className="w-5 h-5" />Q&A Forum</li>
            <li className="flex items-center gap-3 text-gray-600"><Settings className="w-5 h-5" />Settings</li>
          </ul>
        </nav>
        <button className="flex items-center gap-2 border-t pt-4 text-red-500 font-semibold"><LogOut className="w-5 h-5" /> Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 w-2/3">
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search for tutors..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by subject..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <img src="https://randomuser.me/api/portraits/men/50.jpg" alt="User" className="w-10 h-10 rounded-full border" />
          </div>
        </div>

        {/* Tutors List */}
        <div className="space-y-4">
          {tutors.map((tutor, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-md flex gap-4 items-center">
              <img src={tutor.image} alt={tutor.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{tutor.name}</h2>
                <p className="text-sm text-gray-600">{tutor.subject}</p>
                <p className="text-sm text-gray-600">⭐ {tutor.rating} • {tutor.students} students • {tutor.hours} hours</p>
                <p className="text-sm mt-2">{tutor.description}</p>
                <div className="mt-2 text-xs text-gray-500 flex gap-2 flex-wrap">
                  {tutor.skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded-md">{skill}</span>
                  ))}
                </div>
                <p className="text-xs mt-1 text-gray-500">{tutor.languages}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">${tutor.price} <span className="text-sm font-normal">per hour</span></p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
