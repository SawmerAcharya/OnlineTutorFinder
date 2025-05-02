// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Dashboard() {
//   const [assignments, setAssignments] = useState([]);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ Fetch assignments from correct GET API
//     fetch('http://localhost:5001/api/assignments', {
//       method: 'GET',
//       credentials: 'include',
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success && data.assignments) {
//           setAssignments(data.assignments);
//         } else {
//           console.error('Failed to load assignments');
//         }
//       })
//       .catch(err => console.error('Error fetching assignments:', err));
//   }, []);

//   const filteredAssignments = assignments.filter(a =>
//     a.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleViewAssignment = (assignmentId) => {
//     navigate(`/assignment/${assignmentId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
//         <p className="text-gray-700 mb-6">View and manage your course assignments</p>

//         {/* Search Bar */}
//         <div className="mb-4 flex gap-4">
//           <input
//             type="text"
//             placeholder="Search assignments..."
//             className="px-4 py-2 rounded border w-full"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select className="px-4 py-2 rounded border" disabled>
//             <option>All Status</option>
//             <option>Pending</option>
//             <option>Completed</option>
//             <option>Overdue</option>
//           </select>
//         </div>

//         {/* Assignment Cards */}
//         <div className="space-y-4">
//           {filteredAssignments.map((assignment) => (
//             <div key={assignment._id} className="bg-white p-4 shadow rounded-lg">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//                 <div>
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
//                       {assignment.course}
//                     </span>
//                     <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
//                       Due {assignment.dueDate} {assignment.dueTime}
//                     </span>
//                     <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
//                       Published {assignment.publishDate} {assignment.publishTime}
//                     </span>
//                   </div>
//                   <h2 className="font-semibold text-lg">{assignment.title}</h2>
//                   <p className="text-sm text-gray-600">{assignment.description}</p>
//                 </div>
//                 <div className="mt-4 md:mt-0 flex gap-2">
//                   <button
//                     onClick={() => handleViewAssignment(assignment._id)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     View Assignment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {filteredAssignments.length === 0 && (
//             <p className="text-gray-500 text-center">No assignments found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/assignments', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) { // ✅ updated key
          setAssignments(data.data);
        } else {
          console.error('Failed to load assignments');
        }
      })
      .catch(err => console.error('Error fetching assignments:', err));
  }, []);

  const filteredAssignments = assignments.filter(a =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewAssignment = (assignmentId) => {
    navigate(`/assignment/${assignmentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
        <p className="text-gray-700 mb-6">View and manage your course assignments</p>

        {/* Search Bar */}
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search assignments..."
            className="px-4 py-2 rounded border w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="px-4 py-2 rounded border" disabled>
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>

        {/* Assignment Cards */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div key={assignment._id} className="bg-white p-4 shadow rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                      {assignment.course}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
                      Due {assignment.dueDate} {assignment.dueTime}
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                      Published {assignment.publishDate} {assignment.publishTime}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg">{assignment.title}</h2>
                  <p className="text-sm text-gray-600">{assignment.description}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <button
                    onClick={() => handleViewAssignment(assignment._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Assignment
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredAssignments.length === 0 && (
            <p className="text-gray-500 text-center">No assignments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
