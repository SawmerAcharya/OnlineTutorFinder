import { Avatar } from "@mui/material";
import { FaMapMarkerAlt, FaStar, FaClock } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { MdBook } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function TutorCard({ tutor, onMessageClick, onViewProfile }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(tutor._id);
    } else {
      navigate(`/tutor/${tutor._id}`);
    }
  };

  // const handleMessageClick = () => {
  //   if (onMessageClick) {
  //     onMessageClick(tutor._id);
  //   } else {
  //     navigate("/chat");
  //   }
  // };

  const handleMessageClick = () => {
    navigate("/chat", {
      state: {
        tutorId: tutor._id,
        tutorObj: tutor, // pass the entire tutor object
      },
    });
  };

  const handleBookClick = () => {
    navigate("/book");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden m-3">
      <div className="relative bg-[rgb(79,70,229)] h-20">
        <div className="absolute left-4 bottom-[-30px]">
          <Avatar
            src={
              tutor?.profile
                ? `https://utfs.io/f/${tutor.profile}`
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742236044~exp=1742239644~hmac=11114304d889bcec136a0b39da274795f9fb032e6c4ce92b5e7f2bc5032a4564&w=826"
            }
            alt={tutor.name}
            sx={{ width: 70, height: 70, border: "3px solid white" }}
            className="shadow-lg rounded-full"
          />
          <BsCheck2Circle className="absolute bottom-0 right-0 text-green-600 bg-white rounded-full text-2xl border-2 border-white shadow-md" />
        </div>
      </div>
      <div className="p-4 pt-10">
        <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <FaMapMarkerAlt className="mr-1" />
          {tutor.tutorData?.City || "Unknown Location"}
        </div>
        <div className="flex items-center text-gray-600 mt-2 text-sm">
          <FaStar className="text-yellow-500 text-base" />
          <span className="ml-1 font-medium">{tutor.rating || "4"}</span>
          <span className="text-gray-500 ml-1">
            ({tutor.reviews || "10"} reviews)
          </span>
        </div>
        {/* <div className="mt-3 text-xs">
          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">
            {tutor.tutorData?.CurrentSubject || "Not Provided"}
          </span>
        </div> */}

        <div className="mt-3 text-xs flex flex-wrap gap-2">
          {tutor.tutorData?.SelectedSubjects &&
          tutor.tutorData.SelectedSubjects.length > 0 ? (
            tutor.tutorData.SelectedSubjects.map((subject, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium"
              >
                {subject}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Subjects not provided</span>
          )}
        </div>

        <div className="text-lg font-bold mt-3">
          <span className="text-green-600 mr-1">Rs</span>
          <span className="text-black">
            {tutor.tutorData?.HourlyRate || "N/A"}
          </span>
          <span className="text-gray-700">/hr</span>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1">
            <IoMdSchool className="text-gray-700 text-sm" />
            <h4 className="font-semibold text-gray-700 text-sm">
              Qualifications
            </h4>
          </div>
          <ul className="text-gray-600 text-xs list-disc list-inside mt-1">
            {(tutor.tutorData?.Qualifications || "Not Provided")
              .split(",")
              .map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
          </ul>
        </div>
        <div className="mt-3 text-gray-600 text-xs border-t border-gray-200 pt-2 flex justify-between">
          <div>
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span className="font-semibold">Experience:</span>
            </div>
            <div className="ml-4">
              {tutor.tutorData?.Experience || "N/A"} years
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold">Teaching Mode:</span>
            </div>
            <div className="ml-4">{tutor.tutorData?.TeachingMode || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 px-4 pb-3 text-xs mb-2">
        <button
          onClick={handleMessageClick}
          className="bg-[rgb(79,70,229)] text-white py-2 px-3 rounded-md flex-1 flex items-center justify-center gap-1 hover:bg-blue-700 font-semibold"
        >
          <FiMessageSquare className="text-sm" /> Message
        </button>
        <button
          onClick={handleViewProfile}
          className="border border-blue-600 text-blue-600 py-2 px-3 rounded-md flex-1 flex items-center justify-center gap-1 hover:bg-blue-50 font-semibold"
        >
          <IoEye className="text-sm" /> View Profile
        </button>
        <button
          onClick={handleBookClick}
          className="bg-green-600 text-white py-2 px-3 rounded-md flex-1 flex items-center justify-center gap-1 hover:bg-green-700 font-semibold"
        >
          <MdBook className="text-sm" /> Book
        </button>
      </div>
    </div>
  );
}

export default TutorCard;
