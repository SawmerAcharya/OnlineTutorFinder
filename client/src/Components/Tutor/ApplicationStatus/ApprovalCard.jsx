// import React from "react";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { FaArrowRight } from "react-icons/fa6";

// const ApprovalCard = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white w-[730px] p-10 rounded-3xl shadow-2xl text-center">
//         {/* Icon */}
//         <div className="flex justify-center">
//           <div className="bg-green-100 p-4 rounded-full">
//             <AiOutlineCheckCircle size={50} className="text-green-600" />
//           </div>
//         </div>

//         {/* Heading */}
//         <h2 className="text-3xl font-bold mt-4">Welcome to TutorFinder!</h2>
//         <p className="text-xl text-gray-600 mt-3">
//           Your application has been approved
//         </p>

//         {/* Next Steps & Ready to Start in same row */}
//         <div className="flex flex-col md:flex-row gap-6 mt-8">
//           {/* Next Steps */}
//           <div className="bg-green-50 p-6 rounded-2xl flex-1 text-left">
//             <h3 className="font-bold text-xl text-gray-700 mb-4">
//               Next Steps
//             </h3>
//             <ul className="text-green-700 space-y-3 text-lg">
//               <li className="flex items-center">
//                 <AiOutlineCheckCircle className="mr-3" size={22} /> Complete
//                 your tutor profile
//               </li>
//               <li className="flex items-center">
//                 <AiOutlineCheckCircle className="mr-3" size={22} /> Set your
//                 availability
//               </li>
//               <li className="flex items-center">
//                 <AiOutlineCheckCircle className="mr-3" size={22} /> Start
//                 accepting students
//               </li>
//             </ul>
//           </div>

//           {/* Ready to Start */}
//           <div className="bg-green-600 text-white p-6 rounded-2xl flex-1 flex flex-col justify-center">
//             <h3 className="font-bold text-xl">Ready to Start?</h3>
//             <p className="text-lg opacity-90 mt-2">
//               Access your dashboard to begin your tutoring journey.
//             </p>
//             <button className="mt-4 bg-white text-green-600 font-bold px-6 py-3 rounded-lg text-lg shadow-md hover:bg-gray-200 flex items-center space-x-2">
//               <span>Go to Dashboard</span>
//               <FaArrowRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApprovalCard;



import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const ApprovalCard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to /tutor
  const goToDashboard = () => {
    navigate("/tutor");  // Redirects to the /tutor route
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[730px] p-10 rounded-3xl shadow-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <AiOutlineCheckCircle size={50} className="text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mt-4">Welcome to TutorFinder!</h2>
        <p className="text-xl text-gray-600 mt-3">
          Your application has been approved
        </p>

        {/* Next Steps & Ready to Start in same row */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Next Steps */}
          <div className="bg-green-50 p-6 rounded-2xl flex-1 text-left">
            <h3 className="font-bold text-xl text-gray-700 mb-4">
              Next Steps
            </h3>
            <ul className="text-green-700 space-y-3 text-lg">
              <li className="flex items-center">
                <AiOutlineCheckCircle className="mr-3" size={22} /> Complete
                your tutor profile
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle className="mr-3" size={22} /> Set your
                availability
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle className="mr-3" size={22} /> Start
                accepting students
              </li>
            </ul>
          </div>

          {/* Ready to Start */}
          <div className="bg-green-600 text-white p-6 rounded-2xl flex-1 flex flex-col justify-center">
            <h3 className="font-bold text-xl">Ready to Start?</h3>
            <p className="text-lg opacity-90 mt-2">
              Access your dashboard to begin your tutoring journey.
            </p>
            <button
              onClick={goToDashboard}  // Use the function to navigate
              className="mt-4 bg-white text-green-600 font-bold px-6 py-3 rounded-lg text-lg shadow-md hover:bg-gray-200 flex items-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
