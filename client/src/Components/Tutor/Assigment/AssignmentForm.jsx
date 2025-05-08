import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tabs from "./Tabs";
import StudentCard from "./StudentCard";
import FileUpload from "./FileUpload";
import HeaderTop from "./HeaderTop";
import { AppContent } from "../../../Context/AppContex";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";

// Mock student d

function AssignmentForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [files, setFiles] = useState([]); // [{ name, url }]
  const [students, setStudents] = useState([]);
  const { userData } = useContext(AppContent);
  const storedTutorId = localStorage.getItem("tutorId");
  const tutorId = userData?._id || storedTutorId || null;

  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const tabs = [
    { name: "Create Assignment", href: `/assign/${tutorId}`, current: true },
    { name: "Manage Assignments", href: "/manage", current: false },
  ];

  const handleStudentSelection = (id, selected) => {
    setFormData((prev) => ({
      ...prev,
      assignedStudents: selected
        ? [...prev.assignedStudents, id]
        : prev.assignedStudents.filter((sid) => sid !== id),
    }));
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    assignmentFiles: [],
    assignedStudents: [],
  });

  const handleSelectAll = () => {
    const allSelected = formData.assignedStudents.length === students.length;

    setFormData((prev) => ({
      ...prev,
      assignedStudents: allSelected ? [] : students.map((s) => s._id),
    }));
  };

  useEffect(() => {
    if (tutorId) {
      axios
        .get(`http://localhost:5001/api/bookings/students/${tutorId}`)
        .then((res) => {
          if (res.data.success) {
            setStudents(res.data.data);
          } else {
            toast.error("Failed to fetch students");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error fetching students");
        });
    }
  }, [tutorId]);

  useEffect(() => {
    if (!editId) return;

    const fetchAssignment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/assignments/${editId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const a = res.data.assignment;

          const assignedIds = (a.assignedStudents || []).map((s) =>
            typeof s === "string" ? s : s._id
          );

          const localDateTime = DateTime.fromJSDate(
            new Date(a.dueDate)
          ).setZone("Asia/Kathmandu");
          const formattedDate = localDateTime.toFormat("yyyy-MM-dd");
          const formattedTime = localDateTime.toFormat("HH:mm");

          setFormData({
            title: a.title || "",
            description: a.description || "",
            dueDate: formattedDate,
            dueTime: formattedTime,
            assignmentFiles: a.files || [],
            assignedStudents: assignedIds,
          });

          setSelectedStudents(assignedIds);
          setFiles(
            (a.files || []).map((url, i) => ({
              name: `file-${i + 1}`,
              url,
            }))
          );
        } else {
          toast.error("Failed to load assignment data.");
        }
      } catch (err) {
        console.error("Fetch assignment failed:", err);
        toast.error("Error loading assignment.");
      }
    };

    fetchAssignment();
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!tutorId) {
      toast.error("Tutor ID is missing. Cannot submit assignment.");
      return;
    }

    const payload = {
      ...formData,
      dueDate: `${formData.dueDate}T${formData.dueTime}`,
      files: files.map((f) => f.url),
      userId: tutorId,
    };

    try {
      let response;

      if (editId) {
        // UPDATE assignment
        response = await axios.put(
          `http://localhost:5001/api/assignments/update/${editId}`,
          payload,
          { withCredentials: true }
        );
      } else {
        // CREATE assignment
        response = await axios.post(
          "http://localhost:5001/api/assignments/createAssignment",
          payload,
          { withCredentials: true }
        );
      }

      const { data } = response;

      if (data.success) {
        toast.success(
          `Assignment ${editId ? "updated" : "created"} successfully!`
        );

        setFormData({
          title: "",
          description: "",
          dueDate: "",
          assignmentFiles: [],
          assignedStudents: [],
        });
        setFiles([]);

        setTimeout(() => {
          navigate("/manage");
        }, 1500);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Assignment submission error:", error);
      toast.error("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Tutor Assignment Center
        </h1>

        <Tabs tabs={tabs} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Assign New Assignment
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Create a new assignment and assign it to specific students.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter assignment title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assignment Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter detailed instructions for the assignment"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* <div className="mb-6">
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                    required
                  />
                </div> */}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date & Time
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      required
                    />
                    <input
                      type="time"
                      id="dueTime"
                      name="dueTime"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.dueTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dueTime: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment Files
                  </label>
                  <FileUpload onChange={(uploaded) => setFiles(uploaded)} />
                </div>

                <div className="flex justify-end space-x-3">
                  {editId && (
                    <button
                      type="button"
                      onClick={() => navigate("/manage")}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    disabled={formData.assignedStudents.length === 0}
                  >
                    {editId
                      ? "Update Assignment"
                      : "Assign to Selected Students"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Students
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Choose which students to assign this to
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  {formData.assignedStudents.length} students selected
                </span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {formData.assignedStudents.length === students.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              <div className="overflow-y-auto max-h-96 border-t border-gray-200">
                {students.map((student) => (
                  <StudentCard
                    key={student._id}
                    id={student._id}
                    name={student.name}
                    email={student.email}
                    profile={student.profile}
                    selected={formData.assignedStudents.includes(student._id)}
                    onSelect={handleStudentSelection}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentForm;