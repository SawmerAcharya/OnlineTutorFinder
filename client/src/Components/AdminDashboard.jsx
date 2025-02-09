import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaFileAlt, FaCheck, FaTimes, FaEye, FaChartLine, FaChalkboardTeacher, FaUsers, FaSignOutAlt } from "react-icons/fa";

const tutorRequests = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", subject: "Mathematics", mode: "Online", status: "Pending", certificate: "certificate1.pdf" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", subject: "Physics", mode: "Offline", status: "Pending", certificate: "certificate2.pdf" },
];

export default function AdminDashboard() {
  const [requests, setRequests] = useState(tutorRequests);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const handleAction = (id, status) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    alert(`Tutor request ${status}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-6 space-y-6 shadow-lg flex flex-col h-screen justify-between">
        <div>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 py-3 px-4 rounded hover:bg-gray-700"><FaChartLine /> Dashboard</a>
            <a href="#" className="flex items-center gap-3 py-3 px-4 rounded hover:bg-gray-700"><FaChalkboardTeacher /> Tutor Requests</a>
            <a href="#" className="flex items-center gap-3 py-3 px-4 rounded hover:bg-gray-700"><FaUsers /> Settings</a>
          </nav>
        </div>
        <div>
          <a href="#" className="flex items-center gap-3 py-3 px-4 rounded hover:bg-gray-700 text-red-400"><FaSignOutAlt /> Logout</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[{ label: "Total Tutors", value: 245, color: "bg-blue-100" },
            { label: "New Requests", value: 12, color: "bg-red-100" },
            { label: "Online Tutors", value: 78, color: "bg-green-100" },
            { label: "Offline Tutors", value: 167, color: "bg-yellow-100" }]
            .map((stat, index) => (
              <div key={index} className={`${stat.color} p-6 rounded-xl shadow-lg text-center`}>
                <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
          ))}
        </div>

        {/* Tutor Requests */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Tutor Requests</h2>
          <div className="space-y-6">
            {requests.map((req) => (
              <div key={req.id} className="p-6 flex justify-between items-center border rounded-xl shadow bg-gray-50 hover:shadow-xl transition">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><FaUser /> {req.name}</h2>
                  <p className="text-md text-gray-600">Subject: <span className="font-medium">{req.subject}</span></p>
                  <p className="text-md text-gray-600">Mode: <span className="font-medium">{req.mode}</span></p>
                  <p className={`text-md font-semibold ${req.status === "Accepted" ? "text-green-600" : req.status === "Declined" ? "text-red-600" : "text-gray-600"}`}>Status: {req.status}</p>
                </div>
                <div className="flex gap-4">
                  {req.status === "Pending" && (
                    <>
                      <button onClick={() => handleAction(req.id, "Accepted")} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-green-700 transition"><FaCheck /> Accept</button>
                      <button onClick={() => handleAction(req.id, "Declined")} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-red-700 transition"><FaTimes /> Decline</button>
                    </>
                  )}
                  <button onClick={() => setSelectedTutor(req)} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-700 transition"><FaEye /> View</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tutor Detail Box */}
        {selectedTutor && (
          <div className="absolute top-20 right-10 p-6 bg-white shadow-xl rounded-lg border w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tutor Details</h3>
            <p className="flex items-center gap-2"><FaUser /> <strong>Name:</strong> {selectedTutor.name}</p>
            <p className="flex items-center gap-2"><FaEnvelope /> <strong>Email:</strong> {selectedTutor.email}</p>
            <p className="flex items-center gap-2"><FaPhone /> <strong>Phone:</strong> {selectedTutor.phone}</p>
            <p className="flex items-center gap-2"><FaFileAlt /> <strong>Certificate:</strong> <a href={selectedTutor.certificate} className="text-blue-600 underline">View Certificate</a></p>
            <button onClick={() => setSelectedTutor(null)} className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}