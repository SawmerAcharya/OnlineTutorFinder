
// import { useState, useContext, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { ChevronLeft, Upload, CheckCircle, Loader2 } from "lucide-react";
// import StudentFileUpload from "./StudentFileUpload";
// import { AppContent } from "../../../Context/AppContex";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function SubmitAssignment() {
//   const navigate = useNavigate();
//   const { id: assignmentId } = useParams();
//   const [files, setFiles] = useState([]);
//   const [feedback, setFeedback] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [assignment, setAssignment] = useState(null);
//   const [alreadySubmitted, setAlreadySubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { userData, backendUrl } = useContext(AppContent);
//   const userId = userData?._id;

//   useEffect(() => {
//     const fetchAssignment = async () => {
//       try {
//         const res = await axios.get(
//           `${backendUrl}/api/assignments/student/${assignmentId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${userData.token}`,
//             },
//           }
//         );
//         setAssignment(res.data.assignment);
//       } catch (err) {
//         toast.error("Failed to load assignment.");
//       }

//       try {
//         const res2 = await axios.get(
//           `${backendUrl}/api/assignments/student/my-submissions`,
//           {
//             headers: {
//               Authorization: `Bearer ${userData.token}`,
//             },
//           }
//         );
//         const submitted = res2.data.submissions.some(
//           (s) => s.assignmentId._id === assignmentId
//         );
//         setAlreadySubmitted(submitted);
//       } catch (err) {
//         console.error("Check submission error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignment();
//   }, [assignmentId, backendUrl, userData.token]);

//   const formatTimeOnly = (iso) => {
//     const date = new Date(iso);
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatDateOnly = (iso) => {
//     const date = new Date(iso);
//     return date.toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (files.length === 0) {
//       alert("Please upload at least one file");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       const fileUrls = files.map((file) => file.url);

//       const res = await axios.post(
//         `${backendUrl}/api/assignments/student/submit`,
//         {
//           assignmentId,
//           userId,
//           files: fileUrls,
//           feedback,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userData.token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("Assignment submitted successfully!");
//         setIsSuccess(true);
//         setTimeout(() => {
//           navigate(`/assigned/${userId}`);
//         }, 2000);
//       } else {
//         toast.error(res.data.message || "Submission failed.");
//       }
//     } catch (err) {
//       console.error("❌ Submission error:", err);
//       toast.error("Something went wrong during submission.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-gray-500">
//         Loading assignment details...
//       </div>
//     );
//   }

//   if (alreadySubmitted) {
//     return (
//       <div className="container mx-auto px-4 py-6">
//         <div className="max-w-xl mx-auto text-center border border-green-300 bg-green-50 p-6 rounded-lg">
//           <CheckCircle size={40} className="text-green-600 mx-auto mb-3" />
//           <h2 className="text-xl font-semibold text-green-800 mb-2">
//             Assignment Already Submitted
//           </h2>
//           <p className="text-gray-700">
//             You’ve already submitted this assignment. You cannot resubmit it.
//           </p>
//           <Link
//             to={`/assigned/${userId}`}
//             className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!assignment) {
//     return (
//       <div className="text-center mt-20 text-gray-500">
//         Assignment not found.
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="mb-6">
//         <Link
//           to={`/assignments/${assignmentId}`}
//           className="flex items-center text-sm text-gray-500 hover:text-gray-700"
//         >
//           <ChevronLeft size={16} className="mr-1" />
//           Back to Assignment Details
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="border rounded-lg overflow-hidden bg-white">
//           <div className="p-6 border-b">
//             <h1 className="text-2xl font-bold">Submit Assignment</h1>
//             <p className="text-gray-500">
//               {assignment.title} • Due: {formatDateOnly(assignment.dueDate)} at{" "}
//               {formatTimeOnly(assignment.dueDate)}
//             </p>
//           </div>

//           <div className="p-6 space-y-6">
//             <div>
//               <h3 className="font-medium mb-3 text-gray-800">Upload Files</h3>
//               <StudentFileUpload
//                 onChange={setFiles}
//                 assignmentId={assignmentId}
//                 studentId={userId}
//               />
//             </div>

//             <div>
//               <h3 className="font-medium mb-3 text-gray-800">
//                 Feedback for Tutor
//               </h3>
//               <textarea
//                 placeholder="Add any comments or questions about your submission..."
//                 className="w-full min-h-[120px] p-3 border rounded-md text-sm text-gray-700"
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="bg-gray-50 p-6 flex justify-between">
//             <Link
//               to={`/assignments/${assignmentId}`}
//               className="px-4 py-2 border rounded-md text-sm font-medium"
//             >
//               Cancel
//             </Link>

//             <button
//               type="submit"
//               disabled={isSubmitting || files.length === 0}
//               className={`px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center ${
//                 isSubmitting || files.length === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-blue-700 transition"
//               }`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2
//                     size={16}
//                     className="animate-spin -ml-1 mr-2 text-white"
//                   />
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <Upload size={16} className="mr-2" />
//                   Submit Assignment
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft, Upload, CheckCircle, Loader2 } from "lucide-react";
import StudentFileUpload from "./StudentFileUpload";
import { AppContent } from "../../../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";

export default function SubmitAssignment() {
  const navigate = useNavigate();
  const { id: assignmentId } = useParams();
  const [files, setFiles] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userData, backendUrl } = useContext(AppContent);
  const userId = userData?._id;

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/assignments/student/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        setAssignment(res.data.assignment);
      } catch (err) {
        toast.error("Failed to load assignment.");
      }

      try {
        const res2 = await axios.get(
          `${backendUrl}/api/assignments/student/my-submissions`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        const submitted = res2.data.submissions.some(
          (s) => s.assignmentId._id === assignmentId
        );
        setAlreadySubmitted(submitted);
      } catch (err) {
        console.error("Check submission error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId, backendUrl, userData.token]);

  const formatTimeOnly = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateOnly = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    try {
      setIsSubmitting(true);

      const fileUrls = files.map((file) => file.url);

      const res = await axios.post(
        `${backendUrl}/api/assignments/student/submit`,
        {
          assignmentId,
          userId,
          files: fileUrls,
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Assignment submitted successfully!");
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/assigned/${userId}`);
        }, 2000);
      } else {
        toast.error(res.data.message || "Submission failed.");
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      toast.error("Something went wrong during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading assignment details...
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-xl mx-auto text-center border border-green-300 bg-green-50 p-6 rounded-lg">
          <CheckCircle size={40} className="text-green-600 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Assignment Already Submitted
          </h2>
          <p className="text-gray-700">
            You’ve already submitted this assignment. You cannot resubmit it.
          </p>
          <Link
            to={`/assigned/${userId}`}
            className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Assignment not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link
          to={`/assignments/${assignmentId}`}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Assignment Details
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Submit Assignment</h1>
            <p className="text-gray-500">
              {assignment.title} • Due: {formatDateOnly(assignment.dueDate)} at{" "}
              {formatTimeOnly(assignment.dueDate)}
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium mb-3 text-gray-800">Upload Files</h3>
              <StudentFileUpload
                onChange={setFiles}
                assignmentId={assignmentId}
                studentId={userId}
              />
            </div>

            <div>
              <h3 className="font-medium mb-3 text-gray-800">
                Feedback for Tutor
              </h3>
              <textarea
                placeholder="Add any comments or questions about your submission..."
                className="w-full min-h-[120px] p-3 border rounded-md text-sm text-gray-700"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex justify-between">
            <Link
              to={`/assignments/${assignmentId}`}
              className="px-4 py-2 border rounded-md text-sm font-medium"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || files.length === 0}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center ${
                isSubmitting || files.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700 transition"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin -ml-1 mr-2 text-white"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Submit Assignment
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}