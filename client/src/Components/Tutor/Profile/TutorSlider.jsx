

import { useState, useEffect, useContext } from "react";
import { Camera, Settings, GraduationCap, Home, ChevronRight, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AppContent } from "../../../Context/AppContex";
import { generateUploadButton } from "@uploadthing/react";

const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

const TutorSlider = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const [image, setImage] = useState(null);
  const { userData } = useContext(AppContent);
  const [tutorId, setTutorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (userData && userData._id) {
      setTutorId(userData._id);
    } else {
      const storedTutorId = localStorage.getItem("tutorId");
      if (storedTutorId) {
        setTutorId(storedTutorId);
      }
    }

    if (userData?.profile) {
      setImage("https://utfs.io/f/" + userData.profile);
    }

    setLoading(false);
  }, [userData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="md:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-orange-200 rounded-full"></div>
            <div className="h-4 bg-orange-200 rounded w-24 mt-4"></div>
            <div className="h-8 bg-orange-200 rounded w-32 mt-4"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="h-12 bg-orange-200 rounded mb-2"></div>
          <div className="h-12 bg-orange-200 rounded mb-2"></div>
          <div className="h-12 bg-orange-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!tutorId) {
    return (
      <div className="md:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
          <div className="flex flex-col items-center">
            <div className="text-orange-500 font-medium">No tutor profile found. Please log in again.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-3 space-y-6">
      {/* Profile Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-6">
          <h2 className="text-lg font-semibold text-white">Tutor Profile</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-md">
              {image ? (
                <img
                  src={image || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-orange-500 font-medium">
                  <User className="w-12 h-12" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md cursor-pointer border-2 border-white">
                <Camera className="w-5 h-5 text-white" />
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="text-center text-sm text-gray-600 mb-4">{userData?.name || "Tutor Name"}</div>
            <UploadButton
              className="ut-button:bg-gradient-to-r ut-button:from-orange-500 ut-button:to-amber-500 ut-button:text-white ut-button:rounded-lg ut-button:font-medium ut-button:shadow-md ut-button:border-none ut-button:px-4 ut-button:py-2 ut-button:hover:from-orange-600 ut-button:hover:to-amber-600"
              endpoint="profileUploader"
              input={{ user_id: tutorId }}
              onClientUploadComplete={(res) => {
                const filekey = res[0].key;
                setImage("https://utfs.io/f/" + filekey);
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-6">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
        </div>
        <div className="divide-y divide-orange-100">
          <Link
            to={`/tutor/profile/${tutorId}`}
            className={`p-4 flex items-center space-x-3 transition-all hover:bg-orange-50 ${
              activeTab.includes("/tutor/profile")
                ? "bg-orange-100 text-orange-700 font-medium"
                : "text-gray-700"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeTab.includes("/tutor/profile") ? "bg-orange-200" : "bg-gray-100"
              }`}
            >
              <Settings
                className={`w-5 h-5 ${activeTab.includes("/tutor/profile") ? "text-orange-700" : "text-gray-600"}`}
              />
            </div>
            <span>Profile settings</span>
            <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
          </Link>

          

          <Link
            to="/tutor"
            className={`p-4 flex items-center space-x-3 transition-all hover:bg-orange-50 ${
              activeTab === "/tutor" ? "bg-orange-100 text-orange-700 font-medium" : "text-gray-700"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeTab === "/tutor" ? "bg-orange-200" : "bg-gray-100"
              }`}
            >
              <Home className={`w-5 h-5 ${activeTab === "/tutor" ? "text-orange-700" : "text-gray-600"}`} />
            </div>
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
          </Link>

          {/* Logout Button inside Navigation Menu */}
          <button
            className="p-4 flex items-center space-x-3 transition-all hover:bg-red-50 text-red-600 w-full text-left"
            onClick={() => {
              // Handle logout logic here
              localStorage.removeItem("tutorId");
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorSlider;
