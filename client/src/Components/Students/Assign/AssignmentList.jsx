
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Calendar, File, Upload, Check, Info } from "lucide-react";
import axios from "axios";
import { AppContent } from "../../../Context/AppContex";
import { DateTime } from "luxon";

export default function AssignmentList({ type }) {
  const { userData, backendUrl } = useContext(AppContent);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/assignments/student/assigned`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
          }
        );
        if (data.success) {
          setAssignments(data.assignments);
        }
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?._id) {
      fetchAssignments();
    }
  }, [userData]);

  const filteredAssignments = assignments.filter((assignment) => {
    const due = DateTime.fromISO(assignment.dueDate);
    const now = DateTime.now();
    const isPast = due < now;

    if (type === "submitted") return assignment.submitted === true;
    if (type === "upcoming") return !assignment.submitted && !isPast;
    if (type === "past") return !assignment.submitted && isPast;

    return false;
  });

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (filteredAssignments.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No {type} assignments found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {filteredAssignments.map((assignment) => {
        const dueDate = DateTime.fromISO(assignment.dueDate).toFormat(
          "MMM dd, yyyy"
        );

        return (
          <div
            key={assignment._id}
            className="border rounded-lg bg-white overflow-hidden"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{assignment.title}</h2>
                  <p className="text-sm text-gray-500 mt-4">
                    Assigned by: {assignment.createdBy?.name || "Unknown"}
                  </p>
                </div>
                <StatusBadge status={type} />
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                {assignment.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Due: {dueDate}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 flex justify-between flex-wrap gap-2">
              <Link
                to={`/assignments/${assignment._id}`}
                className="px-4 py-2 border rounded-md text-sm font-medium flex items-center"
              >
                <File size={16} className="mr-2" />
                View Details
              </Link>

              {type === "upcoming" && (
                <Link
                  to={`/assignments/${assignment._id}/submit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center"
                >
                  <Upload size={16} className="mr-2" />
                  Submit
                </Link>
              )}

              {type === "submitted" && (
                <Link
                  to={`/assignments/${assignment._id}/view-submission`}
                  className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium flex items-center"
                >
                  <Check size={16} className="mr-2" />
                  View Submission
                </Link>
              )}

              {/* {type === "past" && (
                <button
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium flex items-center"
                  disabled
                >
                  <Info size={16} className="mr-2" />
                  Past Due
                </button>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "past") {
    return (
      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
        Past Due
      </span>
    );
  }

  if (status === "submitted") {
    return (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        Submitted
      </span>
    );
  }

  return (
    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
      Upcoming
    </span>
  );
}