import React from "react";
import StudentCard from "./Studentcard";

function StudentSelector({ students, selectedStudents, setSelectedStudents }) {
  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id));
    }
  };

  const handleStudentSelection = (id, selected) => {
    if (selected) {
      setSelectedStudents([...selectedStudents, id]);
    } else {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Select Students
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Choose which students to assign this to
      </p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          {selectedStudents.length} students selected
        </span>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {selectedStudents.length === students.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      <div className="overflow-y-auto max-h-96 border-t border-gray-200">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            email={student.email}
            avatarUrl={student.avatarUrl}
            selected={selectedStudents.includes(student.id)}
            onSelect={handleStudentSelection}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentSelector;