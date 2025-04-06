import { FaTimesCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";

const RejectionCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <FaTimesCircle size={24} />
          </div>
          <h2 className="text-2xl font-bold">Application Status</h2>
          <p className="text-gray-500 text-sm pt-1">
            Your tutor application review results
          </p>
        </div>

        <div className="space-y-8 relative mt-4">
          {/* Application Submitted */}
          <div className="relative flex items-center">
            <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <IoDocumentTextOutline size={24} />
            </div>
            <span className="text-base ml-4 font-semibold text-purple-700">
              Application Submitted
            </span>
            <div className="absolute left-6 top-12 w-1 bg-purple-500 h-12"></div>
          </div>

          {/* Review Complete */}
          <div className="relative flex items-center">
            <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <AiOutlineClockCircle size={24} />
            </div>
            <span className="text-base ml-4 font-semibold text-purple-700">
              Review Complete
            </span>
            <div className="absolute left-6 top-12 w-1 bg-red-500 h-12"></div>
          </div>

          {/* Application Rejected */}
          <div className="relative flex items-center">
            <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center">
              <FaTimesCircle size={24} />
            </div>
            <span className="text-base ml-4 font-semibold text-red-600">
              Application Rejected
            </span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-300">
          <h3 className="text-red-600 font-semibold">Application Not Approved</h3>
          <p className="text-gray-700 text-sm mt-1">
            Unfortunately, we cannot approve your application at this time. Our
            review team has identified some areas that need improvement:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
            <li>Insufficient teaching experience in the specified subjects</li>
            <li>Missing required certification documentation</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-gray-800 font-semibold">What can you do?</h3>
          <p className="text-gray-600 text-sm mt-1">
            You can submit a new application after 30 days, ensuring you meet
            all requirements. Please review our tutor guidelines and prepare all
            necessary documentation before reapplying.
          </p>
          <a
            href="#"
            className="text-blue-600 text-sm font-medium mt-2 inline-block"
          >
            View Tutor Guidelines →
          </a>
        </div>
      </div>
    </div>
  );
};

export default RejectionCard;
