import React, { useState } from "react";
import { toast } from "react-toastify";
import { AppContent } from "../../Context/AppContex";
import { useContext } from "react";
import axios from "axios";
import { generateUploadButton } from "@uploadthing/react";
import { useNavigate } from "react-router-dom"; 

export const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

function TutorForm() {

  const navigate = useNavigate(); // Initialize useNavigate

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);
  
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
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Professional Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number:
            </label>
            <input
              type="text"
              name="PhoneNumber"
              id="phoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label
              htmlFor="qualifications"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Qualifications:
            </label>
            <input
              type="text"
              name="Qualifications"
              id="qualifications"
              value={formData.Qualifications}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="e.g., Master's in Mathematics"
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teaching Experience (years):
            </label>
            <input
              type="text"
              name="Experience"
              id="experience"
              value={formData.Experience}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter experience"
            />
          </div>
          <div>
            <label
              htmlFor="hourlyRate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Monthly Rate ($):
            </label>
            <input
              type="text"
              name="HourlyRate"
              id="hourlyRate"
              value={formData.HourlyRate}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter rate"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City:
            </label>
            <input
              type="text"
              name="City"
              id="city"
              value={formData.City}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your city"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects
            </label>
            <div className="flex items-center">
              <select
                name="CurrentSubject"
                value={formData.CurrentSubject}
                onChange={handleChange}
                className="block w-full border bg-white border-gray-200 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 mr-2"
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
                className="border bg-white border-gray-200 text-gray-700 rounded-md shadow-sm py-2 px-3 mr-2"
              />
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Select Teaching Mode
        </h2>
        <select
          name="TeachingMode"
          id="teachingMode"
          value={formData.TeachingMode}
          onChange={handleChange}
          className="block w-full border bg-white border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Document Verification
        </h2>
        <UploadButton
          endpoint="imageUploader"
          onUploadBegin={console.log}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            const filekey = res[0].key;

            setFormData((prevData) => ({
              ...prevData,
              Documents: [...prevData.Documents, filekey],
            }));
          }}
          onNewFileDropped={(file) => {
            console.log("new file added by user", file);
          }}
          onClientStartedUpload={(file) => {
            console.log("new file added by user", file);
          }}
          onClientFinishedUpload={console.log}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default TutorForm;
