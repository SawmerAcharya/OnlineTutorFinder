// import React, { useState } from "react";
// import HeaderCard from "./HeaderCard";
// import LocationCard from "./LocationCard";
// import ContactCard from "./ContactCard";
// import AvailableCard from "./AvailableCard";
// import TabNav from "./TabNav";
// import TabContent from "./TabContent";

// function ProfileInfo() {
//   const [activeTab, setActiveTab] = useState("about");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4 md:p-8 font-sans">
//       <div className="max-w-5xl mx-auto">
//         {/* Header Card */}
//         <HeaderCard />

//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column */}
//           <div className="w-full lg:w-2/3">
//             <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
//             <TabContent activeTab={activeTab} />
//             <AvailableCard />
//           </div>

//           {/* Right Column */}
//           <div className="w-full lg:w-1/3">
//             <ContactCard />
//             <LocationCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileInfo;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderCard from "./HeaderCard";
import LocationCard from "./LocationCard";
import ContactCard from "./ContactCard";
import AvailableCard from "./AvailableCard";
import TabNav from "./TabNav";
import TabContent from "./TabContent";

function ProfileInfo() {
  const { id } = useParams(); // Get tutor ID from URL
  const [tutor, setTutor] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

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

  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Card with tutor data */}
        <HeaderCard tutor={tutor} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full lg:w-2/3">
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContent activeTab={activeTab} tutor={tutor} />
            <AvailableCard tutor={tutor}/>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3">
            <ContactCard tutor={tutor}/>
            <LocationCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
