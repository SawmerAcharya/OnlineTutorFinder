import { useState } from "react";

export default function ApplicationForm() {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Application Form</h2>
      <p className="text-center text-gray-600">Join our learning community</p>

      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            activeTab === "student" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("student")}
        >
          Student
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            activeTab === "tutor" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("tutor")}
        >
          Tutor
        </button>
      </div>

      {activeTab === "student" ? <StudentForm /> : <TutorForm />}
    </div>
  );
}

function StudentForm() {
  return (
    <form className="space-y-4">
      <Input label="Full Name" placeholder="Enter your full name" />
      <Input label="Email Address" placeholder="Enter your email" />
      <Dropdown label="Grade Level" options={["9th Grade", "10th Grade", "11th Grade", "12th Grade"]} />
      <CheckboxGroup label="Subjects Needed" options={["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"]} />
      <Input label="Parent/Guardian Name" placeholder="Enter parent/guardian name" />
      <Input label="Contact Number" placeholder="Enter contact number" />
      <SubmitButton />
    </form>
  );
}

function TutorForm() {
  return (
    <form className="space-y-4">
      <Input label="Full Name" placeholder="Enter your full name" />
      <Input label="Email Address" placeholder="Enter your email" />
      <Input label="Subject" placeholder="What subject do you teach?" />
      <Textarea label="Experience" placeholder="Describe your teaching experience" />
      <FileUpload label="Upload Certificate" />
      <SubmitButton />
    </form>
  );
}

function Input({ label, placeholder }) {
  return (
    <div>
      <label className="block font-medium text-gray-700">{label}</label>
      <input className="w-full p-2 border rounded-lg" type="text" placeholder={placeholder} />
    </div>
  );
}

function Textarea({ label, placeholder }) {
  return (
    <div>
      <label className="block font-medium text-gray-700">{label}</label>
      <textarea className="w-full p-2 border rounded-lg" placeholder={placeholder}></textarea>
    </div>
  );
}

function Dropdown({ label, options }) {
  return (
    <div>
      <label className="block font-medium text-gray-700">{label}</label>
      <select className="w-full p-2 border rounded-lg">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function CheckboxGroup({ label, options }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FileUpload({ label }) {
  return (
    <div className="p-4 border-dashed border-2 rounded-lg text-center">
      <p>{label}</p>
      <input type="file" className="mt-2" />
    </div>
  );
}

function SubmitButton() {
  return (
    <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
      Submit Application
    </button>
  );
}
