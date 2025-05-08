import { useParams, Link } from "react-router-dom";
import { ChevronLeft, File, Download } from "lucide-react";
import { DateTime } from "luxon";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../../Context/AppContex";

export default function ViewSubmission() {
  const { id } = useParams(); // assignmentId
  const { userData } = useContext(AppContent);
  const userId = userData?._id;
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/assignments/student/submission/${id}`
        );
        setSubmission(res.data.submission);
      } catch (err) {
        console.error("Failed to fetch submission:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const formatDate = (iso) => DateTime.fromISO(iso).toFormat("MMMM dd, yyyy");
  const formatTime = (iso) => DateTime.fromISO(iso).toFormat("hh:mm a");

  if (loading)
    return <p className="text-center py-10">Loading submission...</p>;

  if (!submission)
    return (
      <p className="text-center py-10 text-red-500">
        No submission found for this assignment.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link
          to={`/assigned/${userId}`}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="mr-1" size={16} />
          Back to Assigned Dashboard
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">
            {submission.assignmentId.title}
          </h1>
          <p className="text-gray-500 mt-1">
            Due on: {formatDate(submission.assignmentId.dueDate)}
          </p>
          <p className="text-gray-500 mt-1">
            Submitted on: {formatDate(submission.submittedAt)} at{" "}
            {formatTime(submission.submittedAt)}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium mb-2 text-gray-800">Submitted Files</h3>
            <div className="space-y-2">
              {submission.files.map((fileUrl, idx) => {
                const filename = fileUrl.split("/").pop().split("?")[0];
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                  >
                    <div className="flex items-center">
                      <File className="mr-2 text-gray-500" size={20} />
                      <span className="text-gray-700">
                        {filename || `File ${idx + 1}`}
                      </span>
                    </div>
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <Download className="mr-1" size={16} />
                      Download
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-gray-800">Feedback</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md border">
              {submission.feedback || "No feedback given yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}