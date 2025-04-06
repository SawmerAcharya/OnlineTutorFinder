import React from "react";
import {
  BookOpen,
  Award,
  Briefcase,
  Star,
  MapPin,
  GraduationCap,
  Home,
} from "lucide-react";

function TabContent({ activeTab, tutor }) {
  return (
    <div className="bg-white rounded-b-xl shadow-md p-6 mb-6">
      {activeTab === "about" && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
            <BookOpen size={20} className="mr-2 text-indigo-500" />
            About me
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {tutor.tutorData?.aboutMe
              ? tutor.tutorData.aboutMe
              : "No information available."}
          </p>
        </div>
      )}

      {activeTab === "education" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Education Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
              <Award size={20} className="mr-2 text-indigo-500" />
              Education
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} className="text-indigo-600" />
                </div>
                <div className="flex-1 mt-2">
                  <h3 className="font-semibold text-gray-800">
                    {tutor.tutorData?.Qualifications
                      ? tutor.tutorData.Qualifications
                      : "No qualification available."}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Levels Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
              <Home size={20} className="mr-2 text-indigo-500" />
              Teaching Levels
            </h2>

            <ul className="space-y-2 text-gray-800">
              {tutor.tutorData?.TeachingLevels?.length > 0 ? (
                tutor.tutorData.TeachingLevels.map((level, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span> {level}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No teaching levels available.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "subjects" && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
            <Briefcase size={20} className="mr-2 text-indigo-500" />
            Subjects I Teach
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tutor.tutorData.SelectedSubjects &&
            tutor.tutorData.SelectedSubjects.length > 0 ? (
              tutor.tutorData.SelectedSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <BookOpen size={20} className="text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{subject}</h3>
                  <p className="text-xs text-gray-500 mt-1">Academic Subject</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No subjects selected.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
            <Star size={20} className="mr-2 text-indigo-500" />
            Reviews (0)
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-500 mb-4">
              No reviews yet. Be the first to leave a review!
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Write a Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TabContent;
