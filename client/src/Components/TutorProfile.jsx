import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function TutorProfile() {
  const location = useLocation();
  const tutor = location.state?.tutor || {}; // Get tutor data from navigation state

  return (
    <>
      <Header />
      <div className="bg-[#f2f6ff] min-h-screen p-12 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-12 max-w-7xl w-full min-h-[90vh] flex flex-col justify-between">
          <div className="flex items-center gap-8">
            <img
              src={tutor.image || "/profile-pic.jpg"} // Default fallback image if not provided
              alt={tutor.name || "Tutor"} // Fallback for missing name
              className="w-48 h-48 rounded-full object-cover border-4 border-gray-300"
            />
            <div>
              <h2 className="text-3xl font-bold">{tutor.name || "Tutor Name"}</h2>
              <p className="text-gray-600 text-xl">{tutor.tutorData?.Tagline || "Education is power"}</p>
              <p className="flex items-center text-gray-500 text-xl">
                <FaMapMarkerAlt className="mr-2" /> {tutor.tutorData?.City || "Not Provided"}
              </p>
              <p className="text-xl"><strong>Languages:</strong> {tutor.languages || "Not Provided"}</p>
              <p className="text-lg text-gray-600 flex items-center">
                <span className="mr-2">Trial class available</span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center text-gray-600 text-xl">
              <FaStar className="text-yellow-500" /> <span className="ml-2">0 reviews</span>
            </div>
            <p className="text-2xl font-semibold">Rs {tutor.tutorData?.HourlyRate || "N/A"} / 60-min lesson</p>
            <div className="flex gap-6">
              <button className="border-2 border-gray-300 text-xl px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors">
                Send Message
              </button>
              <button className="bg-pink-500 text-white text-xl px-8 py-4 rounded-lg hover:bg-pink-600 transition-colors">
                Book a Tuition
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">About Me</h3>
            <p className="text-gray-700 mt-4 text-xl">
              {tutor.description || "No description available."}
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">I Can Teach</h3>
            <div className="mt-4 flex gap-4 flex-wrap">
              {(tutor.tutorData?.Subjects || []).map((subject, index) => (
                <span key={index} className="bg-gray-200 px-6 py-3 rounded-lg text-xl">{subject}</span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Availability</h3>
            <div className="text-gray-700 mt-4 text-xl">
              <p>{tutor.tutorData?.Availability || "Not Provided"}</p>
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            <h3 className="text-2xl font-semibold">Contact Details</h3>
            <p className="flex items-center text-gray-700 mt-4 text-xl">
              <FaPhoneAlt className="mr-2" /> {tutor.tutorData?.PhoneNumber || "N/A"}
            </p>
            <p className="flex items-center text-gray-700 mt-4 text-xl">
              <FaEnvelope className="mr-2" /> {tutor.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
