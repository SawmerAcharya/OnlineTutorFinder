import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../Context/AppContex";
import {
  Heart,
  Home,
  Star,
  MapPin,
  GraduationCap,
  Clock3,
  Languages,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProflieSlider";

function Favorites() {
  const navigate = useNavigate(); // Initialize navigate hook
  const { backendUrl, userData } = useContext(AppContent);
  const [favoriteTutors, setFavoriteTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData || !userData._id) return;

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/favorites/GetFavorites`,
          {
            params: { userId: userData._id },
            withCredentials: true,
          }
        );

        console.log("Favorites API Response:", response.data);

        if (response.data.success && response.data.favorites.length > 0) {
          // Use the returned data directly
          setFavoriteTutors(response.data.favorites);
        } else {
          setFavoriteTutors([]);
        }
      } catch (error) {
        console.error(
          "Error fetching favorites:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [backendUrl, userData]);

  // Handler for removing a tutor from favorites with toast messages
  const handleRemoveFavorite = async (tutorId, tutorName) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/favorites/RemoveFavorites/${tutorId}`,
        {
          data: { userId: userData._id },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setFavoriteTutors((prev) =>
          prev.filter((tutor) => tutor._id !== tutorId)
        );
        toast.success(`${tutorName} removed from favorites!`);
      } else {
        toast.error("Failed to remove tutor from favorites.");
      }
    } catch (error) {
      console.error(
        "Error removing favorite:",
        error.response?.data || error.message
      );
      toast.error("Error removing favorite.");
    }
  };
  const handleViewProfile = (tutorId) => {
    navigate(`/tutor/${tutorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* <ToastContainer /> */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}

          <ProfileSidebar />

          {/* Main Content */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Favourite Tutors
                </h1>
                <div className="text-sm text-gray-500">
                  {favoriteTutors.length} tutors saved
                </div>
              </div>

              {loading ? (
                <p className="text-center text-gray-500">
                  Loading favorite tutors...
                </p>
              ) : favoriteTutors.length === 0 ? (
                <p className="text-center text-gray-500">
                  No favorite tutors found.
                </p>
              ) : (
                <div className="space-y-6">
                  {favoriteTutors.map((tutor, index) => {
                    console.log("Tutor Data:", tutor); 
                    // Use tutor.name or fallback to tutor.tutorData?.name if needed
                    const tutorName =
                      tutor.name || tutor.tutorData?.name || "Tutor";
                    return (
                      <div
                        key={tutor._id || index}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={
                              tutor?.profile
                                ? `https://utfs.io/f/${tutor.profile}`
                                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
                            }
                            alt={tutor.tutorData?.name || "Tutor"}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {tutorName}
                                </h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>
                                    {tutor.tutorData?.City || "Unknown City"}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveFavorite(tutor._id, tutorName)
                                }
                                className="text-blue-500 hover:text-pink-600"
                              >
                                <Heart className="w-6 h-6 fill-current" />
                              </button>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2 text-sm">
                                <GraduationCap className="w-4 h-4 text-gray-400" />
                                <span>
                                  {tutor.tutorData?.Qualifications || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Clock3 className="w-4 h-4 text-gray-400" />
                                <span>
                                  {tutor.tutorData?.Experience || "N/A"} years
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Languages className="w-4 h-4 text-gray-400" />
                                <span>
                                  {tutor.tutorData?.languages?.join(", ") ||
                                    "Not Provided"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Languages className="w-4 h-4 text-gray-400" />
                                <span>
                                  {tutor.tutorData?.CurrentSubject || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>
                                  {tutor.tutorData?.HourlyRate
                                    ? `Rs. ${tutor.tutorData.HourlyRate}/hr`
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                            {/* Single Subject Section */}
                            {/* <div className="mt-4">
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                {tutor.tutorData?.Subjects &&
                                tutor.tutorData.Subjects.length > 0
                                  ? tutor.tutorData.Subjects[0]
                                  : "N/A"}
                              </span>
                            </div> */}
                            {/* Buttons: Book Now and View Profile */}
                            <div className="mt-4 flex space-x-3">
                              <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors">
                                Book Now
                              </button>
                              <button
                                onClick={() => handleViewProfile(tutor._id)}
                                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-50 transition-colors"
                              >
                                View Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
