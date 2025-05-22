import { format } from "date-fns";
import { Calendar, Clock, Download, Eye, FileText, Search } from "lucide-react";
import HeaderTop from "./HeaderTop";
import { useEffect, useState } from "react";
import axios from "axios";

// Mock data (same as before)


export default function SubmissionsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/assignments/submissions/tutor",
          {
            withCredentials: true,
          }
        );
        setSubmissions(res.data.submissions);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const assignments = Array.from(
    new Map(
      submissions.map((sub) => [
        sub.assignmentId._id,
        {
          id: sub.assignmentId._id,
          title: sub.assignmentId.title,
          dueDate: new Date(sub.assignmentId.dueDate),
          totalStudents: sub.assignmentId.assignedStudents.length,
          submittedCount: submissions.filter(
            (s) => s.assignmentId._id === sub.assignmentId._id
          ).length,
        },
      ])
    ).values()
  );

  const students = Array.from(
    new Map(
      submissions.map((sub) => [
        sub.studentId._id,
        {
          id: sub.studentId._id,
          name: sub.studentId.name,
          email: sub.studentId.email,
          profile: sub.studentId.profile || "/placeholder.svg",
        },
      ])
    ).values()
  );

  const normalizedSubmissions = submissions.map((sub) => ({
    id: sub._id,
    assignmentId: sub.assignmentId._id,
    studentId: sub.studentId._id,
    submissionDate: new Date(sub.submittedAt),
    files: sub.files,
    feedback: sub.feedback,
    grade: sub.grade,
    status:
      new Date(sub.submittedAt) <= new Date(sub.assignmentId.dueDate)
        ? "on-time"
        : "late",
  }));

  const filteredSubmissions = normalizedSubmissions
    .filter((submission) =>
      selectedAssignment ? submission.assignmentId === selectedAssignment : true
    )
    .filter((submission) => {
      const student = students.find((s) => s.id === submission.studentId);
      if (!student) return false;
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      if (statusFilter === "all") return matchesSearch;
      return matchesSearch && submission.status === statusFilter;
    });

  const getStudent = (id) => students.find((student) => student.id === id);
  const getAssignment = (id) =>
    assignments.find((assignment) => assignment.id === id);

  

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderTop />
      <div className="container mx-auto py-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Student Submissions</h1>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignments List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Assignments
                </h2>
                <p className="text-sm text-gray-500">
                  Select an assignment to view submissions
                </p>
              </div>
              <div className="p-0">
                <button
                  className={`w-full text-left px-4 py-2 transition-colors ${
                    selectedAssignment === null
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedAssignment(null)}
                >
                  All Assignments
                </button>
                {assignments.map((assignment) => (
                  <button
                    key={assignment.id}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                      selectedAssignment === assignment.id
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedAssignment(assignment.id)}
                  >
                    <div className="font-medium truncate">
                      {assignment.title}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>
                        Due: {format(assignment.dueDate, "MMM d, yyyy")}
                      </span>
                      <span>
                        {assignment.submittedCount}/{assignment.totalStudents}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Submission Stats
                </h2>
              </div>
              <div className="p-6">
                {selectedAssignment ? (
                  (() => {
                    const assignment = getAssignment(selectedAssignment);
                    if (!assignment) return null;
                    const submissionCount = normalizedSubmissions.filter(
                      (s) => s.assignmentId === selectedAssignment
                    ).length;

                    const percentage = Math.round(
                      (submissionCount / assignment.totalStudents) * 100
                    );
                    return (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-gray-500">
                            Due: {format(assignment.dueDate, "PPP")}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Submission Rate</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="rounded-md bg-gray-100 p-2">
                            <div className="text-2xl font-bold">
                              {submissionCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              Submitted
                            </div>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2">
                            <div className="text-2xl font-bold">
                              {assignment.totalStudents - submissionCount}
                            </div>
                            <div className="text-xs text-gray-500">Pending</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    Select an assignment to view stats
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedAssignment
                  ? `Submissions for ${
                      getAssignment(selectedAssignment)?.title
                    }`
                  : "All Submissions"}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredSubmissions.length} submission
                {filteredSubmissions.length !== 1 ? "s" : ""}
              </p>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-2.5">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    placeholder="Search by student name or email"
                    className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-[180px] border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="on-time">On Time</option>
                  <option value="late">Late</option>
                </select>
              </div>
            </div>

            {/* Submissions List */}
            <div className="p-6">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No submissions found
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredSubmissions.map((submission) => {
                    const student = getStudent(submission.studentId);
                    const assignment = getAssignment(submission.assignmentId);
                    if (!student || !assignment) return null;

                    return (
                      <div
                        key={submission.id}
                        className="bg-white shadow rounded-lg overflow-hidden"
                      >
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                              {student?.profile ? (
                                <img
                                  src={`https://utfs.io/f/${student.profile}`}
                                  alt={student?.name}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <span>
                                  {student?.name
                                    ? student.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                    : "N/A"}
                                </span>
                              )}
                            </div>

                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <p className="text-xs text-gray-500">
                                {student.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 ml-auto">
                            <span
                              className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                                submission.status === "late"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {submission.status === "on-time"
                                ? "On Time"
                                : "Late"}
                            </span>
                           
                          </div>
                        </div>

                        <div className="px-4 pb-2 grid gap-2 sm:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span>
                              {submission.files.length} file
                              {submission.files.length !== 1 ? "s" : ""}{" "}
                              submitted
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>
                              Submitted on{" "}
                              {format(
                                submission.submissionDate,
                                "MMM d, yyyy 'at' h:mm a"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="px-4 pb-4 grid gap-2 sm:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Assignment: {assignment.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>
                              Due:{" "}
                              {format(
                                assignment.dueDate,
                                "MMM d, yyyy 'at' h:mm a"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-3 flex justify-end gap-2">
                          <button
                            onClick={() => setViewingSubmission(submission)}
                            className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                          
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View Submission Dialog */}
        {viewingSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Submission Details</h2>
                    <p className="text-sm text-gray-500">
                      {(() => {
                        const student = getStudent(viewingSubmission.studentId);
                        const assignment = getAssignment(
                          viewingSubmission.assignmentId
                        );
                        return `${student?.name} - ${assignment?.title}`;
                      })()}
                    </p>
                  </div>
                  <button
                    onClick={() => setViewingSubmission(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={
                            getStudent(viewingSubmission.studentId)?.avatar ||
                            "/placeholder.svg"
                          }
                          alt={
                            getStudent(viewingSubmission.studentId)?.name ||
                            "Student"
                          }
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {getStudent(viewingSubmission.studentId)?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {getStudent(viewingSubmission.studentId)?.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                        viewingSubmission.status === "late"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {viewingSubmission.status === "on-time"
                        ? "On Time"
                        : "Late"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Submitted on{" "}
                        {format(
                          viewingSubmission.submissionDate,
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Due:{" "}
                        {format(
                          getAssignment(viewingSubmission.assignmentId)
                            ?.dueDate,
                          "MMMM d, yyyy"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Submitted Files</h3>
                    <div className="space-y-2">
                      {viewingSubmission.files.map((fileUrl, idx) => {
                        // const filename = fileUrl.split("/").pop().split("?")[0];
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                          >
                            <div className="flex items-center">
                              <FileText
                                className="mr-2 text-gray-500"
                                size={20}
                              />
                              <span className="text-gray-700">
                                {`File ${idx + 1}`}
                              </span>
                            </div>
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              download
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

                  {viewingSubmission.comments && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Student Comments</h3>
                      <div className="p-3 bg-gray-50 rounded-md text-sm">
                        {viewingSubmission.comments}
                      </div>
                    </div>
                  )}

                  
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setViewingSubmission(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        )}

        
        
      </div>
    </div>
  );
}