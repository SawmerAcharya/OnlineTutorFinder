// import React, { useContext } from "react";
// import { BsTrash } from "react-icons/bs";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AppContent } from "../../Context/AppContex";

// const DeleteModal = ({ student, setDeleteStudent, refreshStudents }) => {
//   const { backendUrl } = useContext(AppContent);

//   const handleDelete = async () => {
//     try {
//       console.log(`Attempting to delete student ID: ${student.id}`); // ✅ Log correct ID

//       const response = await fetch(`${backendUrl}/api/user/students/${student.id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Check if token exists
//         },
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (data.success) {
//         toast.success(`Deleted student: ${student.name}`);
//         setDeleteStudent(null);
        
//         // Check if refreshStudents is a function before calling it
//         if (refreshStudents && typeof refreshStudents === 'function') {
//           refreshStudents(); // Refresh list dynamically
//         } else {
//           console.error("refreshStudents is not a valid function");
//         }
//       } else {
//         toast.error(`Failed to delete: ${data.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       toast.error("Error deleting student. Check the console.");
//       console.error("Error deleting student:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-96">
//         <h2 className="text-xl font-semibold">Delete Student</h2>
//         <p className="mt-2 text-gray-600">
//           Are you sure you want to delete <b>{student.name}</b>? This action cannot be undone.
//         </p>

//         <div className="mt-4 flex justify-end space-x-3">
//           <button
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
//             onClick={() => setDeleteStudent(null)}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center"
//             onClick={handleDelete}
//           >
//             <BsTrash className="mr-2" /> Delete Student
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;



import React, { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from "../../Context/AppContex";

const DeleteModal = ({ student, setDeleteStudent, refreshStudents }) => {
  const { backendUrl } = useContext(AppContent);

  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete student ID: ${student.id}`);

      const response = await fetch(`${backendUrl}/api/user/students/${student.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        toast.success(`Deleted student: ${student.name}`);
        setDeleteStudent(null);

        if (refreshStudents && typeof refreshStudents === "function") {
          refreshStudents();
        } else {
          console.error("refreshStudents is not a valid function");
        }
      } else {
        toast.error(`Failed to delete: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Error deleting student. Check the console.");
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-semibold">Delete Student</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete <b>{student.name}</b>? This action cannot be undone.
        </p>

        <div className="mt-4 flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg" onClick={() => setDeleteStudent(null)}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center" onClick={handleDelete}>
            <BsTrash className="mr-2" /> Delete Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
