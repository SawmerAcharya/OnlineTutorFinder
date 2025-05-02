

// import React, { useState, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';

// export default function AssignmentDetail() {
//   const { id } = useParams();
//   const location = useLocation();
//   const [assignment, setAssignment] = useState(location.state?.assignment || null);
//   const [loading, setLoading] = useState(!assignment);
//   const [file, setFile] = useState(null);
//   const [studentFile, setStudentFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   // Fetch assignment if not passed via location.state
//   useEffect(() => {
//     if (!assignment) {
//       fetch(`http://localhost:5001/api/assignments/${id}`, {
//         credentials: 'include',
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success && data.data) {
//             setAssignment(data.data);
//           } else {
//             console.error('Assignment not found');
//           }
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error('Error fetching assignment:', err);
//           setLoading(false);
//         });
//     }
//   }, [assignment, id]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please select a file to upload!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setUploading(true);
//       const res = await fetch(`http://localhost:5001/api/assignments/${id}/submit`, {
//         method: 'POST',
//         body: formData,
//         credentials: 'include',
//       });

//       const result = await res.json();
//       if (result.success) {
//         setStudentFile(file);
//         alert(`File "${file.name}" uploaded successfully for "${assignment?.title || `Assignment #${id}`}"`);
//         setFile(null);
//       } else {
//         alert('Upload failed: ' + result.message);
//       }
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       alert('Error uploading file. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-10 text-center text-gray-600">Loading assignment...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-8">
//       <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl min-h-[90vh] flex flex-col justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-orange-700 mb-4">
//             {assignment?.title || `Assignment #${id}`}
//           </h1>

//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-8">
//             <p><span className="font-semibold text-orange-600">Published:</span> {assignment?.publishDate || "Not Provided"}</p>
//             <p><span className="font-semibold text-orange-600">Due Date:</span> {assignment?.dueDate || "Not Provided"}</p>
//           </div>

//           <p className="text-gray-700 mb-8">
//             {assignment?.subtitle || "Download the assignment file given by your tutor and upload your completed work below."}
//           </p>

//           {/* Teacher Uploaded File Section */}
//           <div className="mb-10">
//             <h2 className="text-2xl font-semibold text-orange-600 mb-4">Teacher Uploaded File:</h2>
//             {assignment?.fileName && assignment?.fileUrl ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-800">{assignment.fileName}</span>
//                 <a
//                   href={assignment.fileUrl}
//                   download
//                   className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
//                 >
//                   Download
//                 </a>
//               </div>
//             ) : (
//               <p className="text-gray-500">No file uploaded by tutor yet.</p>
//             )}
//           </div>

//           {/* Student Upload Section */}
//           <form onSubmit={handleUpload} className="mb-10">
//             <div className="mb-4">
//               <label className="block text-gray-800 font-medium mb-2">Upload Your Work:</label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="border-2 border-orange-300 p-2 w-full rounded-md focus:ring-2 focus:ring-orange-400"
//               />
//               {file && (
//                 <p className="mt-2 text-sm text-green-700">
//                   Selected File: {file.name}
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition disabled:opacity-50"
//               disabled={uploading}
//             >
//               {uploading ? 'Uploading...' : 'Submit Assignment'}
//             </button>
//           </form>

//           {/* Student Uploaded File View */}
//           {studentFile && (
//             <div className="mt-10">
//               <h2 className="text-2xl font-semibold text-orange-600 mb-4">Your Submitted File:</h2>
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-800">{studentFile.name}</span>
//                 <a
//                   href={URL.createObjectURL(studentFile)}
//                   download={studentFile.name}
//                   className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
//                 >
//                   Download Your Submission
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { generateUploadButton } from "@uploadthing/react";

const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

export default function AssignmentDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [assignment, setAssignment] = useState(location.state?.assignment || null);
  const [loading, setLoading] = useState(!assignment);
  const [submissions, setSubmissions] = useState([]);

  // Fetch assignment data
  useEffect(() => {
    if (!assignment) {
      fetch(`http://localhost:5001/api/assignments/${id}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) setAssignment(data.data);
          else console.error('Assignment not found');
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching assignment:', err);
          setLoading(false);
        });
    }
  }, [assignment, id]);

  // Fetch all submissions for this assignment
  useEffect(() => {
    fetch(`http://localhost:5001/api/assignments/${id}/submissions`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) setSubmissions(data.submissions);
      });
  }, [id]);

  const handleUploadComplete = async (res) => {
    const file = res[0];
    const payload = {
      fileUrl: file.url,
      fileName: file.name,
    };

    try {
      const response = await fetch(`http://localhost:5001/api/assignments/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert("File uploaded successfully!");
        setSubmissions(prev => [...prev, { ...payload, _id: Date.now() }]);
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (error) {
      alert("Upload error. Try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading assignment...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-8">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl min-h-[90vh] flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-orange-700 mb-4">
            {assignment?.title || `Assignment #${id}`}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-8">
            <p><span className="font-semibold text-orange-600">Published:</span> {assignment?.publishDate || "Not Provided"}</p>
            <p><span className="font-semibold text-orange-600">Due Date:</span> {assignment?.dueDate || "Not Provided"}</p>
          </div>

          <p className="text-gray-700 mb-8">
            {assignment?.description || "Download the assignment file given by your tutor and upload your completed work below."}
          </p>

          {/* Upload Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Submit Your Work:</h2>
            <UploadButton
              endpoint="assignmentUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={(err) => alert("UploadThing Error: " + err.message)}
            />
          </div>

          {/* All Submissions */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">All Submitted Files</h2>
            {submissions.length === 0 ? (
              <p className="text-gray-500">No submissions yet.</p>
            ) : (
              <ul className="space-y-2">
                {submissions.map((sub, idx) => (
                  <li key={sub._id || idx} className="flex justify-between items-center border p-3 rounded">
                    <span>{sub.fileName}</span>
                    <a
                      href={sub.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
