// import { useState, useEffect, useContext } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Header from "./Header";
// import Footer from "./Footer";
// import TutorCard from "./TutorCard";
// import { AppContent } from "../Context/AppContex";
// import { useUserData } from "../hooks/userData";
// import { useTutors } from "../hooks/useTutors";

// function SearchTutor() {
//   const { data: userData } = useUserData();
//   const { data: allTutors } = useTutors();
//   const { backendUrl } = useContext(AppContent);

//   const [filteredTutors, setFilteredTutors] = useState([]);
//   const [searchSubject, setSearchSubject] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState("");

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
//       <div className="bg-white p-8">
//         <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
//           <div className="flex-1">
//             <h1 className="text-6xl font-bold text-blue-600 mb-5">
//               Your journey to better learning starts here.
//             </h1>
//             <div className="search-box flex flex-col md:flex-row gap-4 mb-5">
//               <input
//                 type="text"
//                 placeholder="Search subject"
//                 value={searchSubject}
//                 onChange={(e) => setSearchSubject(e.target.value)}
//                 className="w-full max-w-xs h-12 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//               />
//               <input
//                 type="text"
//                 placeholder="Search location"
//                 value={searchLocation}
//                 onChange={(e) => setSearchLocation(e.target.value)}
//                 className="w-full max-w-xs h-12 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//               />
//               <select
//                 value={selectedLevel}
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//                 className="w-full max-w-xs h-12 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//               >
//                 <option value="">Select Level</option>
//                 {levels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={() => {}}
//                 className="btn btn-red btn-lg"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//           <div className="flex-1 hidden md:block"></div>
//         </div>
//         <hr className="my-4" />
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
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="MainContainer">
      <Header />

      {/* Hero Section */}
      <section
        className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-cover bg-center bg-[#E6ECF8]"
        style={{
          backgroundImage: `url('./Images/TutoringBackground.jpg')`,
        }}
      >
        <div className="w-full md:w-2/5 bg-white bg-opacity-90 p-8 rounded-md shadow-lg h-[400px] flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Online tutoring <br /> that releases potential
          </h2>
          <p className="text-gray-600 mt-4 text-base">
            We can't stop you worrying about your child. But our expert tutors
            can help their grades and confidence soar - and help you worry a
            little less.
          </p>
          <div className="mt-6 flex items-center">
            <button
              className="bg-blue-500 text-white px-6 py-2 text-base rounded hover:bg-blue-600 transition-all"
              onClick={() => navigate("/SearchTutor")}
            >
              Find a tutor
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 w-full md:w-3/5">
          <img
            src="/Tutoring.jpg"
            alt="Tutoring example"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Homepage;
