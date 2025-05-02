// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UploadAssignmentForm() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     course: '',
//     dueDate: '',
//     dueTime: '',
//     assignmentFiles: [],
//     courseMaterials: [],
//     publishDate: '',
//     publishTime: '',
//   });

//   const [customCourse, setCustomCourse] = useState('');
//   const [courseOptions, setCourseOptions] = useState([
//     'Math', 'Science', 'English',
//   ]);

//   // Automatically set current publish date and time when component loads
//   useEffect(() => {
//     const now = new Date();
//     const publishDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
//     const publishTime = now.toTimeString().split(' ')[0].slice(0, 5); // HH:MM

//     setFormData((prev) => ({
//       ...prev,
//       publishDate,
//       publishTime,
//     }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddCourse = () => {
//     if (customCourse.trim() && !courseOptions.includes(customCourse.trim())) {
//       const newCourse = customCourse.trim();
//       setCourseOptions([newCourse, ...courseOptions]);
//       setFormData((prev) => ({ ...prev, course: newCourse }));
//       setCustomCourse('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       title: formData.title,
//       description: formData.description,
//       course: formData.course,
//       dueDate: formData.dueDate,
//       dueTime: formData.dueTime,
//       publishDate: formData.publishDate,
//       publishTime: formData.publishTime,
//       assignmentFiles: formData.assignmentFiles.map(file => file.name),
//       courseMaterials: formData.courseMaterials.map(file => file.name),
//     };

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5001/api/assignments/upload",
//         payload,
//         { withCredentials: true }
//       );
//       console.log("Assignment uploaded successfully:", data);
//       alert("Assignment uploaded successfully!");

//       setFormData({
//         title: '',
//         description: '',
//         course: '',
//         dueDate: '',
//         dueTime: '',
//         assignmentFiles: [],
//         courseMaterials: [],
//         publishDate: '',
//         publishTime: '',
//       });

//       // Reset the publish date and time again after successful submission
//       const now = new Date();
//       const publishDate = now.toISOString().split('T')[0];
//       const publishTime = now.toTimeString().split(' ')[0].slice(0, 5);

//       setFormData((prev) => ({
//         ...prev,
//         publishDate,
//         publishTime,
//       }));

//     } catch (error) {
//       console.error("Assignment upload failed:", error.response?.data?.message || error.message);
//       alert("Failed to upload assignment!");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <form onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold text-orange-600 mb-6">
//           Upload Assignment
//         </h1>

//         {/* Assignment Title */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Assignment Title</label>
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md"
//             placeholder="Enter assignment title"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md"
//             placeholder="Enter description and instructions"
//             rows={5}
//             required
//           ></textarea>
//         </div>

//         {/* Course Selection */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Course</label>
//           <select
//             name="course"
//             value={formData.course}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md"
//             required
//           >
//             <option value="">Select course</option>
//             {courseOptions.map((course, index) => (
//               <option key={index} value={course}>
//                 {course}
//               </option>
//             ))}
//           </select>
//           <div className="flex mt-2 gap-2">
//             <input
//               type="text"
//               value={customCourse}
//               onChange={(e) => setCustomCourse(e.target.value)}
//               placeholder="Add new course"
//               className="flex-1 p-2 border rounded-md"
//             />
//             <button
//               type="button"
//               onClick={handleAddCourse}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded"
//             >
//               Add
//             </button>
//           </div>
//         </div>

//         {/* Due Date */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Due Date</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={formData.dueDate}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md"
//             required
//           />
//         </div>

//         {/* Due Time */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Due Time</label>
//           <input
//             type="time"
//             name="dueTime"
//             value={formData.dueTime}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md"
//             required
//           />
//         </div>

//         {/* Upload Assignment Files */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Upload Assignment Files</label>
//           <input
//             type="file"
//             name="assignmentFiles"
//             onChange={handleChange}
//             multiple
//             className="w-full p-6 border-dashed border-orange-400 bg-gray-50 rounded-md"
//             required
//           />
//           {formData.assignmentFiles.length > 0 && (
//             <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
//               {formData.assignmentFiles.map((file, index) => (
//                 <li key={index}>{file.name}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Upload Course Materials */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Upload Course Materials</label>
//           <input
//             type="file"
//             name="courseMaterials"
//             onChange={handleChange}
//             multiple
//             className="w-full p-6 border-dashed border-orange-400 bg-gray-50 rounded-md"
//           />
//           {formData.courseMaterials.length > 0 && (
//             <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
//               {formData.courseMaterials.map((file, index) => (
//                 <li key={index}>{file.name}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Publish Date and Time (Auto Display) */}
//         {formData.publishDate && (
//           <div className="mb-6 text-gray-700 text-sm">
//             <span className="font-medium">Current Publish Date:</span> {formData.publishDate}
//             &nbsp; | &nbsp;
//             <span className="font-medium">Current Publish Time:</span> {formData.publishTime}
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded"
//           >
//             Publish Assignment
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UploadAssignmentForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generateUploadButton } from "@uploadthing/react";

// ✅ UploadThing UploadButton setup
export const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

function UploadAssignmentForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    dueTime: '',
    assignmentFiles: [],
    courseMaterials: [],
    publishDate: '',
    publishTime: '',
  });

  const [customCourse, setCustomCourse] = useState('');
  const [courseOptions, setCourseOptions] = useState([
    'Math', 'Science', 'English',
  ]);

  useEffect(() => {
    const now = new Date();
    const publishDate = now.toISOString().split('T')[0];
    const publishTime = now.toTimeString().split(' ')[0].slice(0, 5);
    setFormData((prev) => ({ ...prev, publishDate, publishTime }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    if (customCourse.trim() && !courseOptions.includes(customCourse.trim())) {
      const newCourse = customCourse.trim();
      setCourseOptions([newCourse, ...courseOptions]);
      setFormData((prev) => ({ ...prev, course: newCourse }));
      setCustomCourse('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/assignments/upload",
        payload,
        { withCredentials: true }
      );
      alert("Assignment uploaded successfully!");

      const now = new Date();
      const publishDate = now.toISOString().split('T')[0];
      const publishTime = now.toTimeString().split(' ')[0].slice(0, 5);

      setFormData({
        title: '',
        description: '',
        course: '',
        dueDate: '',
        dueTime: '',
        assignmentFiles: [],
        courseMaterials: [],
        publishDate,
        publishTime,
      });
    } catch (error) {
      console.error("Assignment upload failed:", error.response?.data?.message || error.message);
      alert("Failed to upload assignment!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          Upload Assignment
        </h1>

        {/* Title */}
        <div className="mb-5">
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Enter assignment title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            rows={4}
            placeholder="Enter assignment instructions"
            required
          />
        </div>

        {/* Course Dropdown */}
        <div className="mb-5">
          <label className="block font-medium mb-1">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          >
            <option value="">Select course</option>
            {courseOptions.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={customCourse}
              onChange={(e) => setCustomCourse(e.target.value)}
              placeholder="Add new course"
              className="flex-1 p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={handleAddCourse}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Due Date and Time */}
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Due Time</label>
            <input
              type="time"
              name="dueTime"
              value={formData.dueTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
        </div>

        {/* ✅ Assignment File Upload */}
        <div className="mb-5">
          <label className="block font-medium mb-1">Upload Assignment Files</label>
          <UploadButton
            endpoint="assignmentUploader"
            onClientUploadComplete={(res) => {
              const urls = res.map(file => file.url);
              setFormData((prev) => ({
                ...prev,
                assignmentFiles: [...prev.assignmentFiles, ...urls],
              }));
            }}
            onUploadError={(err) => alert("Upload failed: " + err.message)}
          />
          {formData.assignmentFiles.length > 0 && (
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              {formData.assignmentFiles.map((url, idx) => (
                <li key={idx}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ Course Materials Upload */}
        <div className="mb-5">
          <label className="block font-medium mb-1">Upload Course Materials</label>
          <UploadButton
            endpoint="courseMaterialUploader"
            onClientUploadComplete={(res) => {
              const urls = res.map(file => file.url);
              setFormData((prev) => ({
                ...prev,
                courseMaterials: [...prev.courseMaterials, ...urls],
              }));
            }}
            onUploadError={(err) => alert("Upload failed: " + err.message)}
          />
          {formData.courseMaterials.length > 0 && (
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              {formData.courseMaterials.map((url, idx) => (
                <li key={idx}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
              ))}
            </ul>
          )}
        </div>

        {/* Display Publish Date/Time */}
        {formData.publishDate && (
          <div className="mb-6 text-gray-600 text-sm">
            <span className="font-medium">Publish Date:</span> {formData.publishDate} &nbsp;|&nbsp;
            <span className="font-medium">Publish Time:</span> {formData.publishTime}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded"
          >
            Publish Assignment
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadAssignmentForm;
