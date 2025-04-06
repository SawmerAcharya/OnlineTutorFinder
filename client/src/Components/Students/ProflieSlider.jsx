import React, { useState } from "react";
import { Camera, Settings, BookOpen, Heart, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { generateUploadButton } from "@uploadthing/react";
import { AppContent } from "../../Context/AppContex";
import { useContext,useEffect } from "react";
export const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});


const ProfileSidebar = () => {
  const location = useLocation(); // Get current URL path
  const activeTab = location.pathname; // Determine the active tab
  const [image, setImage] = useState(null);
  const { userData } = useContext(AppContent);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Show preview of the uploaded image
    }
  };


   useEffect(() => {
      // Prefer tutor ID from context; fallback to localStorage if not available
     
      if(userData){
        if(userData.profile){
          setImage("https://utfs.io/f/"
            +userData.profile)
        }
        
      }
    }, [userData]);
  


  return (
    <div className="md:col-span-3 space-y-6">
      {/* Profile Upload Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 bg-gray-200 rounded-full mb-4 overflow-hidden">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <label className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer">
              <Camera className="w-5 h-5 text-gray-600" />
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="text-center text-sm text-gray-500 mb-4">Upload your image</div>
          <UploadButton 
                    
                    endpoint="profileUploader"
                    input={{"user_id":userData?._id}}
                    
                    onUploadBegin={console.log}
                    
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      //console.log("Files: ", res);
                      const filekey = res[0].key;
          
                      
          
                      setImage("https://utfs.io/f/"+filekey)
                    }}/>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-lg shadow">
        <Link
          to="/profile"
          className={`p-4 border-b flex items-center space-x-2 w-full text-left ${
            activeTab === "/profile"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Profile settings</span>
        </Link>

        <Link
          to="/fav"
          className={`p-4 border-b flex items-center space-x-2 w-full text-left ${
            activeTab === "/fav"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <Heart className="w-5 h-5 text-red-500" />
          <span>Favourites</span>
        </Link>

        <Link
          to="/bookings"
          className={`p-4 border-b flex items-center space-x-2 w-full text-left ${
            activeTab === "/bookings"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>My bookings</span>
        </Link>

        <Link
          to="/"
          className={`p-4 flex items-center space-x-2 w-full text-left ${
            activeTab === "/"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Go to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
