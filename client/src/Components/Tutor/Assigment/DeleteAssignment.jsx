import React from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const DeleteAssignment = ({ assignment, setDeleteAssignment, onDeleted }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/assignments/delete/${assignment._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Deleted assignment: ${assignment.title}`);
        setDeleteAssignment(null);

        if (typeof onDeleted === "function") {
          onDeleted(assignment._id);
        }
      } else {
        toast.error(`Failed to delete: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Error deleting assignment");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-semibold">Delete Assignment</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete <b>{assignment.title}</b>? This action
          cannot be undone.
        </p>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            onClick={() => setDeleteAssignment(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center"
            onClick={handleDelete}
          >
            <BsTrash className="mr-2" /> Delete Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAssignment;