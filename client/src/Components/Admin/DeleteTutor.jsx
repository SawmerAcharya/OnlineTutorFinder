import React, { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from "../../Context/AppContex";

const DeleteTutor = ({ tutor, setDeleteTutor, refreshTutors }) => {
  const { backendUrl } = useContext(AppContent);

  const handleDelete = async () => {

    try {
      console.log(`Attempting to delete tutor ID: ${tutor._id}`);

      // Make DELETE request to backend
      const response = await fetch(
        `${backendUrl}/api/user/tutors/${tutor._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        toast.success(`Deleted tutor: ${tutor.name}`);
        setDeleteTutor(null); // Close the modal after successful deletion

        if (refreshTutors && typeof refreshTutors === "function") {
          refreshTutors(); // Refresh the tutor list after deletion
        } else {
          console.error("refreshTutors is not a valid function");
        }
      } else {
        toast.error(
          `Failed to delete tutor: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("Error deleting tutor. Please check the console.");
      console.error("Error deleting tutor:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-semibold">Delete Tutor</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete <b>{tutor.name}</b>? This action cannot be undone.
        </p>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            onClick={() => setDeleteTutor(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center"
            onClick={handleDelete}
          >
            <BsTrash className="mr-2" /> Delete Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTutor;
