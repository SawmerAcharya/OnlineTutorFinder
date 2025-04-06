import React, { useState } from "react";
import { toast } from "react-toastify";
import { AppContent } from "../../Context/AppContex";
import { useContext } from "react";
import axios from "axios";
import { generateUploadButton } from "@uploadthing/react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, X, Plus } from "lucide-react";
import Availability from "./Availability";
import Language from "./Language";

export const UploadButton = generateUploadButton({
  url: "http://localhost:5001/api/uploadthing",
});

function TutorForm() {
  const [aboutMe, setAboutMe] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [availability, setAvailability] = useState({});
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customSubject, setCustomSubject] = useState("");

  const handleLanguageChange = (languages) => {
    setFormData((prev) => ({ ...prev, languages }));
  };

  // const handleAvailabilityChange = (schedule) => {
  //   setFormData((prev) => ({ ...prev, availability: schedule }));
  // };

  const handleAvailabilityChange = (schedule) => {
    setAvailability(schedule); // Update local state
  };

  // Ensure formData only updates when availability changes
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, availability }));
  }, [availability]);

  const navigate = useNavigate(); // Initialize useNavigate

  const { userData, backendUrl } = useContext(AppContent);

  const [formData, setFormData] = useState({
    PhoneNumber: "",
    Qualifications: "",
    Experience: "",
    HourlyRate: "",
    City: "",
    TeachingMode: "",
    Subjects: ["Mathematics", "Science", "English"],
    CurrentSubject: "",
    SelectedSubjects: [],
    NewSubject: "",
    TeachingLevels: [],
    Documents: [],
    languages: [],
    aboutMe: "",
    availability: [],
  });

  const teachingLevels = [
    "Primary (Class 1-5)",
    "L Secondary (Class 6-8)",
    "Secondary (Class 9-10)",
    "H Secondary (Class 11-12)",
    "Bachelor Level",
    "Masters Level",
  ];
  const toggleTeachingLevel = (level) => {
    setFormData((prev) => {
      const isSelected = prev.TeachingLevels.includes(level);
      return {
        ...prev,
        TeachingLevels: isSelected
          ? prev.TeachingLevels.filter((l) => l !== level)
          : [...prev.TeachingLevels, level],
      };
    });
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const experienceRegex = /^[0-9]+$/;
    const hourlyRateRegex = /^\d+$/;
    const cityRegex = /^[A-Za-z\s]+$/;

    if (!formData.PhoneNumber) {
      toast.error("Phone Number is missing.");
      return false;
    }
    if (!formData.Qualifications) {
      toast.error("Qualifications are missing.");
      return false;
    }
    if (!formData.Experience) {
      toast.error("Experience is missing.");
      return false;
    }
    if (!formData.HourlyRate) {
      toast.error("Hourly Rate is missing.");
      return false;
    }
    if (!formData.City) {
      toast.error("City is missing.");
      return false;
    }
    if (!formData.TeachingMode) {
      toast.error("Teaching Mode is missing.");
      return false;
    }
    if (formData.Documents.length === 0) {
      toast.error("Please upload at least one document.");
      return false;
    }

    if (!phoneRegex.test(formData.PhoneNumber)) {
      toast.error("Invalid phone number. It should be 10 digits.");
      return false;
    }
    if (!experienceRegex.test(formData.Experience)) {
      toast.error("Experience should be a valid number.");
      return false;
    }
    if (!hourlyRateRegex.test(formData.HourlyRate)) {
      toast.error("Hourly rate should be a valid whole number.");
      return false;
    }
    if (!cityRegex.test(formData.City)) {
      toast.error("City should only contain letters and spaces.");
      return false;
    }
    return true;
  };

  async function registerAsTutor() {
    const toastId = toast.loading("Registering as Tutor");

    try {
      axios.defaults.withCredentials = true;

      // Ensure that if CurrentSubject is empty, we set it to a default subject
      // if (!formData.CurrentSubject) {
      //   formData.CurrentSubject = formData.Subjects[0];
      // }

      if (formData.SelectedSubjects.length === 0) {
        setFormData((prev) => ({
          ...prev,
          SelectedSubjects: [prev.Subjects[0]],
        }));
      }

      // Send a POST request to update the role to 'tutor'
      const resp = await axios.post(`${backendUrl}/api/user/setRole`, {
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

        navigate("/Pending");
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

  // const handleAddSubject = (e) => {
  //   e.preventDefault();
  //   if (
  //     !formData.Subjects.includes(formData.NewSubject) &&
  //     formData.NewSubject
  //   ) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       Subjects: [...prev.Subjects, formData.NewSubject],
  //       CurrentSubject: formData.NewSubject,
  //       NewSubject: "",
  //     }));
  //   }
  // };

  // const handleAddSubject = (e) => {
  //   e.preventDefault();
  //   const newSub = formData.NewSubject.trim();
  //   if (newSub && !formData.SelectedSubjects.includes(newSub)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       // Add to selected subjects array
  //       SelectedSubjects: [...prev.SelectedSubjects, newSub],
  //       // Also add to available subjects if it's not already there
  //       Subjects: prev.Subjects.includes(newSub)
  //         ? prev.Subjects
  //         : [...prev.Subjects, newSub],
  //       NewSubject: "",
  //     }));
  //   }
  // };

  const handleAddSubject = (e) => {
    e.preventDefault();
    const newSub = formData.NewSubject.trim();
    if (newSub && !formData.SelectedSubjects.includes(newSub)) {
      setFormData((prev) => ({
        ...prev,
        SelectedSubjects: [...prev.SelectedSubjects, newSub],
        CurrentSubject: newSub, // NEW: Set the added subject as CurrentSubject
        Subjects: prev.Subjects.includes(newSub)
          ? prev.Subjects
          : [...prev.Subjects, newSub],
        NewSubject: "",
      }));
    }
  };

  const addCustomSubject = (e) => {
    e.preventDefault();
    if (customSubject && !formData.SelectedSubjects.includes(customSubject)) {
      setFormData((prev) => ({
        ...prev,
        SelectedSubjects: [...prev.SelectedSubjects, customSubject],
        CurrentSubject: customSubject, // Store the custom subject in CurrentSubject
        Subjects: prev.Subjects.includes(customSubject)
          ? prev.Subjects
          : [...prev.Subjects, customSubject],
      }));
      setCustomSubject("");
      setIsAddingCustom(false);
    }
  };

  const removeSubject = (subjectToRemove) => {
    setFormData((prev) => ({
      ...prev,
      SelectedSubjects: prev.SelectedSubjects.filter(
        (subject) => subject !== subjectToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    if (!validateForm()) return;
    await registerAsTutor();
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
              Hourly Rate (Rs):
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
            {!isAddingCustom ? (
              <div className="flex gap-2">
                <select
                  value={formData.NewSubject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      NewSubject: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Subject</option>
                  {formData.Subjects.filter(
                    (subject) => !formData.SelectedSubjects.includes(subject)
                  ).map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddSubject}
                  disabled={!formData.NewSubject}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAddingCustom(true);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-1"
                >
                  <Plus size={18} />
                  New
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Enter custom subject"
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={addCustomSubject}
                  disabled={!customSubject}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAddingCustom(false);
                    setCustomSubject("");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
            {/* Display Selected Subjects */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {formData.SelectedSubjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {subject}
                    <button
                      onClick={() => removeSubject(subject)}
                      className="hover:text-blue-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Select Teaching Levels
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {teachingLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => toggleTeachingLevel(level)}
              className={`p-3 border rounded-lg text-center ${
                formData.TeachingLevels.includes(level)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div>
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
        </div>

        <Language
          selectedLanguages={formData.languages}
          onLanguageChange={handleLanguageChange}
        />

        <Availability
          availability={formData.availability}
          onAvailabilityChange={handleAvailabilityChange}
        />

        {/* About Me */}
        <div className="relative">
          <div className="flex items-center space-x-2 mb-6">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">About Me</h3>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              rows={6}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none bg-white/80 p-3"
              placeholder="Share your teaching philosophy, experience, and what makes you unique as a tutor. Help students understand why they should choose you as their mentor..."
            />
          </div>
        </div>

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
