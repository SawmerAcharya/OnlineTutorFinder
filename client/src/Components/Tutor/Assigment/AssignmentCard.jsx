import React from "react";
import { format } from "date-fns";
import { FileText, Users } from "lucide-react";
import { DateTime } from "luxon";

function AssignmentCard({
  id,
  title,
  dueDate,
  assignedStudents,
  status,
  onEdit,
  onViewSubmissions,
  onDelete,
}) {
  const getStatusBadgeClass = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const nepaliDateTime = DateTime.fromJSDate(new Date(dueDate)).setZone(
    "Asia/Kathmandu"
  );
  const formattedDue = nepaliDateTime.toFormat("MMM dd, yyyy 'at' hh:mm a");

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-4 hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass()}`}
          >
            {status}
          </span>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          Due: {formattedDue}
        </div>

        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Users className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          Assigned to {assignedStudents} students
        </div>

        <div className="mt-5 flex space-x-2">
          <button
            type="button"
            onClick={() => onEdit(id)}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onViewSubmissions(id)}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            View Submissions
          </button>
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentCard;