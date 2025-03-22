import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContent } from "../Context/AppContex";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Userdashboard() {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate(); // Use navigation hook

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/user/Approvedtutors`, { withCredentials: true })
      .then((response) => {
        if (response.data && Array.isArray(response.data.tutors)) {
          setTutors(response.data.tutors);
        } else {
          setTutors([]);
        }
      })
      .catch(() => {
        setTutors([]);
      });
  }, [backendUrl]);

  const filteredTutors = tutors.filter((tutor) =>
    tutor.tutorData?.CurrentSubject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Search Section */}
      <div className="bg-blue-600 py-8 px-8 flex justify-center items-center shadow-md">
        <input
          type="text"
          placeholder="🔍 Search tutors by subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-5 py-3 border border-gray-300 rounded-full w-96 max-w-full focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg text-gray-700 transition-all"
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-200 flex flex-col">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={tutor.image || "default-image-url.jpg"}
                  alt={tutor.name}
                  className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg mb-4"
                />
                <h2 className="text-3xl font-semibold text-gray-800">{tutor.name}</h2>
                <p className="text-gray-600 text-lg font-medium">📚 {tutor.tutorData?.CurrentSubject || "Not Provided"}</p>
                <p className="text-blue-600 font-semibold mt-2 text-lg">💰 ${tutor.tutorData?.HourlyRate || "N/A"} per hour</p>
              </div>

              {/* Additional Tutor Details */}
              <div className="text-gray-600 text-base mb-6">
                <div className="mb-3">
                  <p><strong>Phone Number:</strong> {tutor.tutorData?.PhoneNumber || "N/A"}</p>
                  <p><strong>City:</strong> {tutor.tutorData?.City || "N/A"}</p>
                </div>
                <div className="mb-3">
                  <p><strong>Qualifications:</strong> {tutor.tutorData?.Qualifications || "Not Provided"}</p>
                  <p><strong>Experience:</strong> {tutor.tutorData?.Experience || "Not Provided"}</p>
                </div>
                <p className="text-xs mt-2">🧑‍🏫 Teaching Mode: {tutor.tutorData?.TeachingMode || "Not Provided"}</p>
              </div>

              {/* Tutor Description */}
              <p className="mt-6 text-gray-700 text-base text-center mb-4">
                {tutor.description || "No description available."}
              </p>

              {/* Languages */}
              <p className="text-gray-500 text-sm text-center mb-6">
                🌍 Languages: {tutor.languages || "N/A"}
              </p>

              {/* View Profile Button */}
              <button
                onClick={() => navigate("/tutor-profile", { state: { tutor } })}
                className="mt-4 w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all shadow-md font-semibold"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg font-semibold">
            No tutors found for "{searchTerm}"
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
