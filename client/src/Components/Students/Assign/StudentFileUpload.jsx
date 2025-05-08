// import React, { useState } from "react";
// import { Upload, X } from "lucide-react";
// import { toast } from "react-toastify";
// import { generateUploadButton } from "@uploadthing/react";

// const CustomUploadButton = generateUploadButton({
//   url: "http://localhost:5001/api/uploadthing",
// });

// function StudentFileUpload({ onChange, assignmentId, studentId }) {
//   const [files, setFiles] = useState([]);

//   const handleUploadComplete = (res) => {
//     const uploads = res.map((f) => ({ name: f.name, url: f.url }));
//     const updated = [...files, ...uploads];
//     setFiles(updated);
//     onChange(updated); // send file objects to parent
//     toast.success("Upload complete");
//   };

//   const removeFile = (index) => {
//     const newFiles = [...files];
//     newFiles.splice(index, 1);
//     setFiles(newFiles);
//     onChange(newFiles);
//   };

//   return (
//     <div>
//       <div className="mt-1 p-6 border-2 border-dashed rounded-md text-center border-gray-300">
//         <div className="flex justify-center mb-2">
//           <Upload className="mx-auto h-12 w-12 text-gray-400" />
//         </div>
//         <div className="mt-2">
//           <p className="text-sm text-gray-600">Click to browse</p>
//           <p className="mt-1 text-xs text-gray-500">
//             Upload your assignment submission files (PDF, DOCX, images, etc.)
//           </p>
//         </div>

//         <div className="mt-4">
//           <CustomUploadButton
//             endpoint="FileUploader"
//             input={{
//               assignmentId,
//               studentId,
//               uploadedBy: "student",
//             }}
//             onClientUploadComplete={handleUploadComplete}
//             onUploadError={(err) => {
//               console.error("Upload error:", err);
//               toast.error("Upload failed");
//             }}
//           />
//         </div>
//       </div>

//       {files.length > 0 && (
//         <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md">
//           {files.map((file, index) => (
//             <li
//               key={index}
//               className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
//             >
//               <div className="flex items-center overflow-hidden">
//                 <svg
//                   className="h-5 w-5 flex-shrink-0 text-gray-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span className="ml-2 flex-1 truncate">{file.name}</span>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => removeFile(index)}
//                 className="text-indigo-600 hover:text-indigo-900"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default StudentFileUpload;

import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import { generateUploadButton } from "@uploadthing/react";

const CustomUploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

function StudentFileUpload({ onChange, assignmentId, studentId }) {
  const [files, setFiles] = useState([]);

  const handleUploadComplete = (res) => {
    const uploads = res.map((f) => ({ name: f.name, url: f.url }));
    const updated = [...files, ...uploads];
    setFiles(updated);
    onChange(updated); // Notify parent with updated file list
    toast.success("Upload complete");
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    onChange(updated);
  };

  return (
    <div>
      <div className="mt-1 p-6 border-2 border-dashed rounded-md text-center border-gray-300">
        <div className="flex justify-center mb-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Click to browse</p>
          <p className="mt-1 text-xs text-gray-500">
            Upload your assignment submission files (PDF, DOCX, images, etc.)
          </p>
        </div>

        <div className="mt-4">
          <CustomUploadButton
            endpoint="fileUploader"
            input={{
              assignmentId,
              studentId,
              uploadedBy: "student",
            }}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(err) => {
              console.error("Upload error:", err);
              toast.error("Upload failed");
            }}
          />
        </div>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            >
              <div className="flex items-center overflow-hidden">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 flex-1 truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <X className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentFileUpload;
