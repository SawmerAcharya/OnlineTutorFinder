

// export default SearchTutor;
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import TutorCard from "./TutorCard";
import { AppContent } from "../Context/AppContex";
import { useTutors } from "../hooks/useTutors";

function SearchTutor() {
  const { data: allTutors } = useTutors();
  const { backendUrl } = useContext(AppContent);

  const [searchSubject, setSearchSubject] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    if (!allTutors || allTutors.length === 0) {
      setFilteredTutors([]);
      return;
    }

    const normalizedSubject = searchSubject.trim().toLowerCase();
    const normalizedLocation = searchLocation.trim().toLowerCase();

    const filtered = allTutors.filter(({ tutorData }) => {
      if (!tutorData) return false;
      return (
        (!normalizedSubject || tutorData.CurrentSubject?.toLowerCase().includes(normalizedSubject)) &&
        (!normalizedLocation || tutorData.City?.toLowerCase().includes(normalizedLocation))
      );
    });

    setFilteredTutors(filtered);

    if (filtered.length === 0 && (searchSubject || searchLocation)) {
      toast.error("No tutors found for the entered criteria!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [searchSubject, searchLocation, allTutors]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fef9f4" }}>
      <Header />

      {/* Orange Themed Search Section */}
      <div className="bg-orange-500 py-8 px-4 md:px-6 flex flex-col items-center shadow-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Find Your Ideal Tutor</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center">
          <input
            type="text"
            placeholder="Subject"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
            className="px-5 py-3 border border-orange-300 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-orange-200 text-gray-800 bg-white shadow-sm"
          />
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="px-5 py-3 border border-orange-300 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-orange-200 text-gray-800 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Tutor Grid */}
      <main className="flex-grow container mx-auto px-4 py-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor, index) => (
            <TutorCard key={index} tutor={tutor} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg font-semibold">
            No tutors found.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default SearchTutor;
