import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function AssignmentDetail() {
  const { id } = useParams(); 
  const location = useLocation(); 
  const { assignment } = location.state || {}; 
  
  const [file, setFile] = useState(null);
  const [studentFile, setStudentFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload!');
      return;
    }
    setStudentFile(file); 
    alert(`File "${file.name}" uploaded successfully for "${assignment?.title || `Assignment #${id}`}"`);
    setFile(null); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-8">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl min-h-[90vh] flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-orange-700 mb-4">
            {assignment?.title || `Assignment #${id}`}
          </h1>

          {/* Publish and Due Dates */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-8">
            <p><span className="font-semibold text-orange-600">Published:</span> {assignment?.publishDate || "Not Provided"}</p>
            <p><span className="font-semibold text-orange-600">Due Date:</span> {assignment?.dueDate || "Not Provided"}</p>
          </div>

          <p className="text-gray-700 mb-8">
            {assignment?.subtitle || "Download the assignment file given by your tutor and upload your completed work below."}
          </p>

          {/* Teacher Uploaded Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Teacher Uploaded File:</h2>
            {assignment?.fileName && assignment?.fileUrl ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-800">{assignment.fileName}</span>
                <a
                  href={assignment.fileUrl}
                  download
                  className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
                >
                  Download
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No file uploaded by tutor yet.</p>
            )}
          </div>

          {/* Student Upload Section */}
          <form onSubmit={handleUpload} className="mb-10">
            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-2">Upload Your Work:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border-2 border-orange-300 p-2 w-full rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {file && (
                <p className="mt-2 text-sm text-green-700">
                  Selected File: {file.name}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
            >
              Submit Assignment
            </button>
          </form>

          {/* Student Uploaded File View */}
          {studentFile && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-orange-600 mb-4">Your Submitted File:</h2>
              <div className="flex items-center space-x-4">
                <span className="text-gray-800">{studentFile.name}</span>
                <a
                  href={URL.createObjectURL(studentFile)}
                  download={studentFile.name}
                  className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
                >
                  Download Your Submission
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
