


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import HeaderCard from "./HeaderCard";
// // import LocationCard from "./LocationCard";
// import ContactCard from "./ContactCard";
// import AvailableCard from "./AvailableCard";
// import TabNav from "./TabNav";
// import TabContent from "./TabContent";

// function ProfileInfo() {
//   const { id } = useParams(); // Get tutor ID from URL
//   const [tutor, setTutor] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   useEffect(() => {
//     const fetchTutor = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/user/tutors/${id}`);
//         setTutor(response.data.tutor);
//       } catch (error) {
//         console.error("Error fetching tutor:", error);
//       }
//     };
//     fetchTutor();
//   }, [id]);

//   if (!tutor) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4 md:p-8 font-sans">
//       <div className="max-w-5xl mx-auto">
//         {/* Header Card with tutor data */}
//         <HeaderCard tutor={tutor} />

//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column */}
//           <div className="w-full lg:w-2/3">
//             <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
//             <TabContent activeTab={activeTab} tutor={tutor} />
//             <AvailableCard tutor={tutor}/>
//           </div>

//           {/* Right Column */}
//           <div className="w-full lg:w-1/3">
//             <ContactCard tutor={tutor}/>
//             {/* <LocationCard /> */}
//           </div>
//         </div>
//       </div>
//     </div>  );
// }

// export default ProfileInfo;


import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import HeaderCard from "./HeaderCard";
import ContactCard from "./ContactCard";
import AvailableCard from "./AvailableCard";
import TabNav from "./TabNav";
import TabContent from "./TabContent";

function ProfileInfo() {
  const { id } = useParams(); // Get tutor ID from URL
  const [tutor, setTutor] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/user/tutors/${id}`);
        setTutor(response.data.tutor);
      } catch (error) {
        console.error("Error fetching tutor:", error);
      }
    };
    fetchTutor();
  }, [id]);

  if (!tutor)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-700 text-lg animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Card with tutor data */}
        <div className="mb-6 transform transition-all duration-300 hover:shadow-lg">
          <HeaderCard tutor={tutor} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="p-6">
                <TabContent activeTab={activeTab} tutor={tutor} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                <AvailableCard tutor={tutor} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                <ContactCard tutor={tutor} />
              </div>
            </div>

            {/* Sticky "Book Now" button for mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-slate-200 z-10">
              <button
                onClick={() => navigate(`/book`)} // Navigate to the Book page
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
              >
                Book a Session
              </button>
            </div>

            {/* Desktop "Book Now" card */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg text-slate-800">Ready to learn?</h3>
                <p className="text-slate-600 text-sm">
                  Book a session with {tutor.name} and start improving your skills today.
                </p>
                <button
                  onClick={() => navigate(`/book`)} // Navigate to the Book page
                  className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
