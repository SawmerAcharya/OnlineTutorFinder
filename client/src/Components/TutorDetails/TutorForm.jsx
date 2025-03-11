import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContent } from "../../Context/AppContex";
import axios from "axios";
import { generateUploadButton } from "@uploadthing/react";
import { useNavigate } from "react-router-dom"; 

export const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

function TutorForm() {
  const navigate = useNavigate(); // Initialize useNavigate

  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const [formData, setFormData] = useState({
    PhoneNumber: "",
    Qualifications: "",
    Experience: "",
    HourlyRate: "",
    City: "",
    TeachingMode: "",
    Subjects: ["Mathematics", "Science", "English"],
    CurrentSubject: "",
    NewSubject: "",
    Documents: [],
    profilePicture: "",
  });

  async function registerAsTutor() {
    const toastId = toast.loading("Registering as Tutor");

    try {
      axios.defaults.withCredentials = true;

      // Ensure that if CurrentSubject is empty, we set it to a default subject
      if (!formData.CurrentSubject) {
        formData.CurrentSubject = formData.Subjects[0]; 
      }

      // Send a POST request to update the role to 'tutor'
      const resp = await axios.post("http://localhost:5001/api/user/setRole", {
        role: "tutor", // Role field to set the role as 'tutor'
        userId: userData.userId, // Replace with the actual user ID
        tutorFields: formData, // Fields related to the tutor registration
      });

      // Update toast on success or failure
      if (resp.status === 200) {
        toast.update(toastId, {
          render: "Successfully Registered as Tutor",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        navigate("/tutor");
      } else {
        toast.update(toastId, {
          render: "Unable to Register as Tutor",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        render: "Fetch Error: Unable to Register as Tutor",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (
      !formData.Subjects.includes(formData.NewSubject) &&
      formData.NewSubject
    ) {
      setFormData((prev) => ({
        ...prev,
        Subjects: [...prev.Subjects, formData.NewSubject],
        CurrentSubject: formData.NewSubject,
        NewSubject: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    await registerAsTutor();
    // Here you would typically handle the form submission to a backend or another service
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Tutor Profile</h2>
      
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center my-6">
        {formData.profilePicture ? (
          <img src={formData.profilePicture} alt="Profile" className="w-40 h-40 rounded-full" />
        ) : (
          <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
            Upload
          </div>
        )}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const fileUrl = res[0].url;
            setFormData((prev) => ({ ...prev, profilePicture: fileUrl }));
          }}
        />
      </div>

      <div className="container mx-auto p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Professional Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                name="PhoneNumber"
                id="phoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications:
              </label>
              <input
                type="text"
                name="Qualifications"
                id="qualifications"
                value={formData.Qualifications}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="e.g., Master's in Mathematics"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Teaching Experience (years):
              </label>
              <input
                type="text"
                name="Experience"
                id="experience"
                value={formData.Experience}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Enter experience"
              />
            </div>
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rate ($):
              </label>
              <input
                type="text"
                name="HourlyRate"
                id="hourlyRate"
                value={formData.HourlyRate}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Enter rate"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City:
              </label>
              <input
                type="text"
                name="City"
                id="city"
                value={formData.City}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Enter your city"
              />
            </div>
          </div>

          {/* Subject Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
            <div className="flex items-center">
              <select
                name="CurrentSubject"
                value={formData.CurrentSubject}
                onChange={handleChange}
                className="block w-full border bg-white border-gray-200 text-gray-700 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 mr-2"
              >
                {formData.Subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="NewSubject"
                value={formData.NewSubject}
                onChange={handleChange}
                placeholder="New Subject"
                className="border bg-white border-gray-200 text-gray-700 rounded-md shadow-sm py-3 px-4 mr-2"
              />
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
              >
                Add
              </button>
            </div>
          </div>

          {/* Teaching Mode */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Teaching Mode</h2>
          <select
            name="TeachingMode"
            id="teachingMode"
            value={formData.TeachingMode}
            onChange={handleChange}
            className="block w-full border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Document Upload */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Verification</h2>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const fileKey = res[0].key;
              setFormData((prevData) => ({
                ...prevData,
                Documents: [...prevData.Documents, fileKey],
              }));
            }}
          />

          {/* Textarea */}
          <textarea placeholder="Describe yourself as a tutor" className="border p-3 rounded-lg w-full mb-6"></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default TutorForm;


{/* // import React, { useState } from "react";
// import { UploadButton } from "@uploadthing/react";

// function TutorProfile() { */}
//   const [formData, setFormData] = useState({
//     profilePicture: "",
//     phoneNumber: "",
//     email: "",
//     city: "",
//     experience: "",
//     qualifications: "",
//     hourlyRate: "",
//     documents: [],
//     subjects: [],
//     newSubject: "",
//     languages: [],
//     newLanguage: "",
//     proficiency: "Beginner",
//     tutorLevel: "Beginner",
//     aboutMe: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddSubject = () => {
//     if (formData.newSubject && !formData.subjects.includes(formData.newSubject)) {
//       setFormData((prev) => ({
//         ...prev,
//         subjects: [...prev.subjects, formData.newSubject],
//         newSubject: "",
//       }));
//     }
//   };

//   const handleAddLanguage = () => {
//     if (formData.newLanguage && !formData.languages.includes(formData.newLanguage)) {
//       setFormData((prev) => ({
//         ...prev,
//         languages: [...prev.languages, { name: formData.newLanguage, level: formData.proficiency }],
//         newLanguage: "",
//       }));
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center">Tutor Profile</h2>
//       {/* Profile Picture Upload */}
//       <div className="flex flex-col items-center my-4">
//         {formData.profilePicture ? (
//           <img src={formData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full" />
//         ) : (
//           <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
//             Upload
//           </div>
//         )}
//         <UploadButton
//           endpoint="imageUploader"
//           onClientUploadComplete={(res) => {
//             const fileUrl = res[0].url;
//             setFormData((prev) => ({ ...prev, profilePicture: fileUrl }));
//           }}
//         />
//       </div>
      
//       {/* Input Fields */}
//       <div className="grid grid-cols-2 gap-4">
//         <input type="text" name="phoneNumber" placeholder="Phone Number" className="border p-2 rounded" value={formData.phoneNumber} onChange={handleChange} />
//         <input type="text" name="email" placeholder="Email Address" className="border p-2 rounded" value={formData.email} onChange={handleChange} />
//         <input type="text" name="city" placeholder="City" className="border p-2 rounded" value={formData.city} onChange={handleChange} />
//         <input type="text" name="experience" placeholder="Years of Experience" className="border p-2 rounded" value={formData.experience} onChange={handleChange} />
//         <input type="text" name="qualifications" placeholder="Qualifications" className="border p-2 rounded" value={formData.qualifications} onChange={handleChange} />
//         <input type="text" name="hourlyRate" placeholder="Hourly Rate (USD)" className="border p-2 rounded" value={formData.hourlyRate} onChange={handleChange} />
//       </div>
      
//       {/* Document Upload */}
//       <div className="mt-4 border p-4 rounded-lg text-center bg-gray-100">Click to upload or drag and drop (PDF, PNG, DOC, MAX: 10MB)</div>
      
//       {/* Subjects */}
//       <div className="flex mt-4">
//         <select name="newSubject" className="border p-2 rounded w-full" value={formData.newSubject} onChange={handleChange}>
//           <option value="">Select Subject</option>
//           <option value="Math">Math</option>
//           <option value="Science">Science</option>
//         </select>
//         <button onClick={handleAddSubject} className="ml-2 bg-green-500 text-white p-2 rounded">Add</button>
//       </div>
      
//       {/* Languages */}
//       <div className="flex mt-4">
//         <input type="text" name="newLanguage" placeholder="Select Language" className="border p-2 rounded w-2/3" value={formData.newLanguage} onChange={handleChange} />
//         <select name="proficiency" className="border p-2 rounded w-1/3 ml-2" value={formData.proficiency} onChange={handleChange}>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Advanced">Advanced</option>
//         </select>
//         <button onClick={handleAddLanguage} className="ml-2 bg-green-500 text-white p-2 rounded">Add</button>
//       </div>
      
//       {/* Tutor Level */}
//       <div className="mt-4 flex justify-between">
//         {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
//           <button key={level} onClick={() => setFormData((prev) => ({ ...prev, tutorLevel: level }))} className={`p-2 rounded ${formData.tutorLevel === level ? "bg-blue-500 text-white" : "border"}`}>{level}</button>
//         ))}
//       </div>
      
//       {/* About Me */}
//       <textarea name="aboutMe" placeholder="Tell us about yourself..." className="border p-2 rounded w-full mt-4" value={formData.aboutMe} onChange={handleChange}></textarea>
      
//       {/* Save Profile */}
//       <button className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 mt-4">Save Profile</button>
//     </div>
//   );
// }

// export default TutorProfile;
