// import React, { useState } from "react";
// import { Camera, Settings, BookOpen, Heart, Home } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { generateUploadButton } from "@uploadthing/react";
// import { AppContent } from "../../Context/AppContex";
// import { useContext,useEffect } from "react";
// export const UploadButton = generateUploadButton({
//   url: "http://localhost:5001/api/uploadthing",
// });


// const ProfileSidebar = () => {
//   const location = useLocation(); // Get current URL path
//   const activeTab = location.pathname; // Determine the active tab
//   const [image, setImage] = useState(null);
//   const { userData } = useContext(AppContent);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file)); // Show preview of the uploaded image
//     }
//   };


//    useEffect(() => {
//       // Prefer tutor ID from context; fallback to localStorage if not available
     
//       if(userData){
//         if(userData.profile){
//           setImage("https://utfs.io/f/"
//             +userData.profile)
//         }
        
//       }
//     }, [userData]);
  


//   return (
//     <div className="md:col-span-3 space-y-6">
//       {/* Profile Upload Section */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex flex-col items-center">
//           <div className="relative w-40 h-40 bg-gray-200 rounded-full mb-4 overflow-hidden">
//             {image ? (
//               <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-500">
//                 No Image
//               </div>
//             )}
//             <label className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer">
//               <Camera className="w-5 h-5 text-gray-600" />
//               <input type="file" className="hidden" onChange={handleImageUpload} />
//             </label>
//           </div>
//           <div className="text-center text-sm text-gray-500 mb-4">Upload your image</div>
//           <UploadButton 
                    
//                     endpoint="profileUploader"
//                     input={{"user_id":userData?._id}}
                    
//                     onUploadBegin={console.log}
                    
//                     onClientUploadComplete={(res) => {
//                       // Do something with the response
//                       //console.log("Files: ", res);
//                       const filekey = res[0].key;
          
                      
          
//                       setImage("https://utfs.io/f/"+filekey)
//                     }}/>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <div className="bg-white rounded-lg shadow">
//         <Link
//           to="/profile"
//           className={`p-4 border-b flex items-center space-x-2 w-full text-left ${
//             activeTab === "/profile"
//               ? "bg-blue-100 text-blue-600 font-semibold"
//               : "text-gray-700"
//           }`}
//         >
//           <Settings className="w-5 h-5" />
//           <span>Profile settings</span>
//         </Link>

//         <Link
//           to="/fav"
//           className={`p-4 border-b flex items-center space-x-2 w-full text-left ${
//             activeTab === "/fav"
//               ? "bg-blue-100 text-blue-600 font-semibold"
//               : "text-gray-700"
//           }`}
//         >
//           <Heart className="w-5 h-5 text-red-500" />
//           <span>Favourites</span>
//         </Link>

//         <Link
//           to="/bookings"
//           className={`p-4 border-b flex items-center space-x-2 w-full text-left ${
//             activeTab === "/bookings"
//               ? "bg-blue-100 text-blue-600 font-semibold"
//               : "text-gray-700"
//           }`}
//         >
//           <BookOpen className="w-5 h-5" />
//           <span>My bookings</span>
//         </Link>

//         <Link
//           to="/"
//           className={`p-4 flex items-center space-x-2 w-full text-left ${
//             activeTab === "/"
//               ? "bg-blue-100 text-blue-600 font-semibold"
//               : "text-gray-700"
//           }`}
//         >
//           <Home className="w-5 h-5" />
//           <span>Go to Dashboard</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProfileSidebar;

import { useState, useContext, useEffect } from "react";
import { Camera, Settings, BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { generateUploadButton } from "@uploadthing/react";
import { AppContent } from "../../Context/AppContex";

const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

const ProfileSidebar = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const [image, setImage] = useState(null);
  const { userData } = useContext(AppContent);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (userData?.profile) {
      setImage("https://utfs.io/f/" + userData.profile);
    }
  }, [userData]);

  return (
    <div className="md:col-span-3 space-y-6">
      {/* Profile Upload */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-6">
          <h2 className="text-lg font-semibold text-white">Profile Photo</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-4 overflow-hidden border-4 border-white shadow-md">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-orange-500 font-medium">
                  No Image
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md cursor-pointer border-2 border-white">
                <Camera className="w-5 h-5 text-white" />
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="text-sm text-gray-600 mb-4 text-center">
              Upload your profile photo
            </div>

            <UploadButton
              className="ut-button:bg-gradient-to-r ut-button:from-orange-500 ut-button:to-amber-500 ut-button:text-white ut-button:rounded-lg ut-button:font-medium ut-button:shadow-md ut-button:border-none ut-button:px-4 ut-button:py-2 ut-button:hover:from-orange-600 ut-button:hover:to-amber-600"
              endpoint="profileUploader"
              input={{ user_id: userData?._id }}
              onClientUploadComplete={(res) => {
                const fileKey = res[0]?.key;
                if (fileKey) {
                  setImage("https://utfs.io/f/" + fileKey);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-6">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
        </div>
        <div className="divide-y divide-orange-100">
          <NavItem
            to="/profile"
            icon={<Settings />}
            label="Profile settings"
            active={activeTab === "/profile"}
          />
          <NavItem
            to="/mybooking"
            icon={<BookOpen />}
            label="My bookings"
            active={activeTab === "/bookings"}
          />
          <NavItem
            to="/"
            icon={<Home />}
            label="Go to Dashboard"
            active={activeTab === "/"}
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`p-4 flex items-center space-x-3 transition-all hover:bg-orange-50 ${
      active ? "bg-orange-100 text-orange-700 font-medium" : "text-gray-700"
    }`}
  >
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        active ? "bg-orange-200" : "bg-gray-100"
      }`}
    >
      {icon && (
        <div className={`w-5 h-5 ${active ? "text-orange-700" : "text-gray-600"}`}>
          {icon}
        </div>
      )}
    </div>
    <span>{label}</span>
  </Link>
);

export default ProfileSidebar;
