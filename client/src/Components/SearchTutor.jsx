// import { useState, useEffect, useContext } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Header from "./Header";
// import Footer from "./Footer";
// import TutorCard from "./TutorCard";
// import { AppContent } from "../Context/AppContex";
// import { useTutors } from "../hooks/useTutors";

// function SearchTutor() {
//   const { data: allTutors } = useTutors();
//   const { backendUrl } = useContext(AppContent);

//   const [searchSubject, setSearchSubject] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [filteredTutors, setFilteredTutors] = useState([]);

//   const levels = [
//     "Primary (Class 1-5)",
//     "L Secondary (Class 6-8)",
//     "Secondary (Class 9-10)",
//     "H Secondary (Class 11-12)",
//     "Bachelor Level",
//     "Masters Level",
//   ];

//   useEffect(() => {
//     if (!allTutors || allTutors.length === 0) {
//       setFilteredTutors([]);
//       return;
//     }

//     const normalizedSubject = searchSubject.trim().toLowerCase();
//     const normalizedLocation = searchLocation.trim().toLowerCase();

//     const filtered = allTutors.filter(({ tutorData }) => {
//       if (!tutorData) return false;
//       return (
//         (!normalizedSubject || tutorData.CurrentSubject?.toLowerCase().includes(normalizedSubject)) &&
//         (!normalizedLocation || tutorData.City?.toLowerCase().includes(normalizedLocation)) &&
//         (!selectedLevel || tutorData.TeachingLevels?.includes(selectedLevel))
//       );
//     });

//     setFilteredTutors(filtered);

//     if (filtered.length === 0 && (searchSubject || searchLocation || selectedLevel)) {
//       toast.error("No tutors found for the entered criteria!", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   }, [searchSubject, searchLocation, selectedLevel, allTutors]);

//   return (
//     <div className="MainContainer">
//       <Header />

//       {/* Search Bar Section */}
//       <div className="bg-white p-8">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Search for a Tutor</h2>

//         <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
//           <input
//             type="text"
//             placeholder="Search subject"
//             value={searchSubject}
//             onChange={(e) => setSearchSubject(e.target.value)}
//             className="w-full md:w-1/4 h-12 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//           />
//           <input
//             type="text"
//             placeholder="Search location"
//             value={searchLocation}
//             onChange={(e) => setSearchLocation(e.target.value)}
//             className="w-full md:w-1/4 h-12 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//           />
//           <select
//             value={selectedLevel}
//             onChange={(e) => setSelectedLevel(e.target.value)}
//             className="w-full md:w-1/4 h-12 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//           >
//             <option value="">Select Level</option>
//             {levels.map((level) => (
//               <option key={level} value={level}>
//                 {level}
//               </option>
//             ))}
//           </select>
//         </div>

//         <hr className="my-4" />

//         {/* Results Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTutors.length > 0 ? (
//             filteredTutors.map((tutor, index) => (
//               <TutorCard key={index} tutor={tutor} />
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-full">
//               No tutors found.
//             </p>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

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
