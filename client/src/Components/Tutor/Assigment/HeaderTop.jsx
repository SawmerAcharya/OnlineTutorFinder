
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardEdit, FileText } from "lucide-react";
import { AppContent } from "../../../Context/AppContex";

function HeaderTop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);
  const storedTutorId = localStorage.getItem("tutorId");
  const tutorId = userData?._id || storedTutorId || null;

  const goToAssignPage = () => {
    if (tutorId) {
      navigate(`/assign/${tutorId}`);
    } else {
      console.error("Tutor ID not found.");
      alert("Error: Tutor ID is missing. Please log in again.");
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-900">
              Tutor Finder
            </h1>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/tutor")}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === "/tutor"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </button>

            <button
              onClick={goToAssignPage}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                tutorId && location.pathname.startsWith(`/assign/${tutorId}`)
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ClipboardEdit className="mr-2 h-5 w-5" />
              Assign Assignment
            </button>

            <button
              onClick={() => navigate("/submissions")}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname.startsWith("/submissions")
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FileText className="mr-2 h-5 w-5" />
              Submissions
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTop;