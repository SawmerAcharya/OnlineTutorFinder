import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProfileSidebar from "./ProflieSlider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from "../../Context/AppContex";

function Profile() {
  const { userData } = useContext(AppContent);
  const studentId = userData?._id;
  console.log("Student ID:", studentId); // Log student ID

  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    grade: "",
    address: "",
    languages: [],
    aboutMe: "",
    learningLocation: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Compute if the profile is empty
  const isProfileEmpty =
    !formData.phone &&
    !formData.gender &&
    !formData.grade &&
    !formData.address &&
    formData.languages.length === 0 &&
    !formData.aboutMe &&
    formData.learningLocation.length === 0;

  // Fetch student data on mount
  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/user/student/${studentId}`
        );
        console.log("Student data received:", response.data);
        const data = response.data.studentInfo;
        if (!data) {
          setError("Student profile not found.");
          toast.error("Student profile not found.");
          setLoading(false);
          return;
        }
        setFormData({
          phone: data.phone || "",
          gender: data.gender || "",
          grade: data.grade || "",
          address: data.address || "",
          languages: data.languages || [],
          aboutMe: data.aboutMe || "",
          learningLocation: data.learningLocation || []
        });
        setLoading(false);
        // If profile is empty, force edit mode and notify the user
        if (
          !data.phone &&
          !data.gender &&
          !data.grade &&
          !data.address &&
          (!data.languages || data.languages.length === 0) &&
          !data.aboutMe &&
          (!data.learningLocation || data.learningLocation.length === 0)
        ) {
          setEditMode(true);
          toast.info("Please fill out your profile information.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load student profile.");
        toast.error("Failed to load student profile.");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  // Handlers for input and checkbox changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      learningLocation: checked
        ? [...prevData.learningLocation, value]
        : prevData.learningLocation.filter((item) => item !== value)
    }));
  };

  const handleLanguageChange = (updatedLanguages) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: updatedLanguages
    }));
  };

  // Submit handler for saving profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        userId: studentId,
        ...formData,
        // Convert learningLocation array to string if needed by the backend
        learningLocation: formData.learningLocation
      };

      const response = await axios.post(
        "http://localhost:5001/api/user/profile",
        payload
      );
      console.log("Profile saved:", response.data);
      
      // Display appropriate toast based on whether it's a new profile or an edit
      if (isProfileEmpty) {
        toast.success("Profile saved successfully!");
      } else {
        toast.success("Edit successful!");
      }
      
      // Exit edit mode if profile already had data
      if (!isProfileEmpty) {
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <ProfileSidebar />

          {/* Main Content */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

              {/* Conditional button */}
              <div className="flex justify-end mb-4">
                {isProfileEmpty ? (
                  // If profile is empty, show "Save and Continue" button
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save and Continue"}
                  </button>
                ) : (
                  <>
                    {!editMode ? (
                      // Not in edit mode, show "Edit Profile" button
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(true);
                          toast.info("You are now editing your profile.");
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      // In edit mode, show "Save Changes" button
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    )}
                  </>
                )}
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your full address"
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade
                    </label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="Enter your grade"
                      disabled={!editMode}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </label>
                  <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["English", "Nepali", "Hindi"].map((language) => (
                        <label
                          key={language}
                          className="relative flex items-center p-4 rounded-lg cursor-pointer hover:bg-white/50 transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={formData.languages.includes(language)}
                            onChange={(e) => {
                              const updatedLanguages = e.target.checked
                                ? [...formData.languages, language]
                                : formData.languages.filter((l) => l !== language);
                              handleLanguageChange(updatedLanguages);
                            }}
                            disabled={!editMode}
                            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 font-medium text-gray-700">
                            {language}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Location Preference
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["My Place", "Tutor's home", "Online"].map((loc) => (
                      <div
                        key={loc}
                        className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          value={loc}
                          checked={formData.learningLocation.includes(loc)}
                          onChange={handleCheckboxChange}
                          disabled={!editMode}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative pt-5">
                  <div className="flex items-center space-x-2 mb-6">
                    <h3 className="block text-sm font-medium text-gray-700">
                      About Me
                    </h3>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
                    <textarea
                      name="aboutMe"
                      value={formData.aboutMe}
                      onChange={handleChange}
                      disabled={!editMode}
                      rows={6}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none bg-white/80 p-3"
                      placeholder="Write about yourself..."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
