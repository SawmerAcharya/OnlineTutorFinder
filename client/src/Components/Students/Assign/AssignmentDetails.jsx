import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, File, Download, Upload } from "lucide-react";
import { AppContent } from "../../../Context/AppContex";
import axios from "axios";
import { DateTime } from "luxon";

export default function AssignmentDetails() {
  const { userData, backendUrl } = useContext(AppContent);
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = userData?._id;

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        console.log(
          "📡 Fetching assignment from:",
          `${backendUrl}/api/assignments/${id}`
        );
        const { data } = await axios.get(
          `${backendUrl}/api/assignments/${id}`,
          { headers: { Authorization: `Bearer ${userData.token}` } }
        );
        console.log("✅ Raw API response:", data); // ← Add this
        if (data.success) {
          setAssignment(data.assignment);
        }
      } catch (err) {
        console.error("Error fetching assignment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id, backendUrl, userData]);

  const formatDate = (iso) => DateTime.fromISO(iso).toFormat("MMMM dd, yyyy");
  const formatTime = (iso) => DateTime.fromISO(iso).toFormat("hh:mm a");

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!assignment)
    return <p className="text-center py-10">Assignment not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to={`/assigned/${userId}`}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="mr-1" size={16} />
          Back to Assigned Dashboard
        </Link>
      </div>

      {/* Assignment Card */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">{assignment.title}</h1>
          <p className="text-gray-500 mt-1">
            Assigned by: {assignment.createdBy?.name}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium mb-2 text-gray-800">Description</h3>
            <p className="text-gray-600">{assignment.description}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <h3 className="font-medium mb-2 text-gray-800">Due Time</h3>
              <p className="text-gray-600">{formatTime(assignment.dueDate)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-gray-800">Due Date</h3>
              <p className="text-gray-600">{formatDate(assignment.dueDate)}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-gray-800">Assignment Files</h3>
            <div className="space-y-2">
              {assignment.files?.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                >
                  <div className="flex items-center">
                    <File className="mr-2 text-gray-500" size={20} />
                    <span className="text-gray-700">
                      {file.name || `File ${idx + 1}`}
                    </span>
                  </div>
                  <a
                    href={file.url || file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <Download className="mr-1" size={16} />
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex justify-end">
          <Link
            to={`/assignments/${assignment._id}/submit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center hover:bg-blue-700 transition"
          >
            <Upload className="mr-2" size={16} />
            Submit Assignment
          </Link>
        </div>
      </div>
    </div>
  );
}