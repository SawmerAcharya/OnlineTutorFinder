// import React, { useState, useEffect } from "react";
// import { CalendarDays, Search, Wallet } from "lucide-react";
// import Sidebar from "./Slidebar"; // Import the Sidebar component
// import NavBar from "./NavBar/NavBar"; // Import the NavBar component
// import axios from "axios";

// export default function Withdrawalsrequest() {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("pending");

//   // Fetch all withdrawals
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5001/api/withdrawals/all",
//           { withCredentials: true }
//         );
//         if (res.data.success) setRequests(res.data.withdrawals);
//       } catch (err) {
//         console.error("Error fetching withdrawals:", err);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleRequestClick = (request) => {
//     console.log("Selected Request:", request);
//     console.log("Admin Fee:", request.adminFee);
//     console.log("Payout Amount:", request.payoutAmount);
//     setSelectedRequest(request);
//     setIsDialogOpen(true);
//   };

//   // const handleSetCompleted = () => {
//   //   const updatedRequests = requests.map((req) =>
//   //     req.id === selectedRequest.id ? { ...req, status: "completed" } : req
//   //   );
//   //   setRequests(updatedRequests);
//   //   setIsDialogOpen(false);
//   //   alert(`Withdrawal request completed for ${selectedRequest.tutorName}`);
//   // };

//   const handleSetCompleted = async () => {
//     try {
//       await axios.post(
//         `http://localhost:5001/api/withdrawals/process/${selectedRequest._id}`,
//         {},
//         { withCredentials: true }
//       );
//       setRequests((prev) =>
//         prev.map((request) =>
//           request._id === selectedRequest._id
//             ? { ...request, status: "completed" }
//             : request
//         )
//       );
//       setIsDialogOpen(false);
//     } catch (err) {
//       console.error("Error processing withdrawal:", err);
//     }
//   };

//   // Filter requests by active tab and search query
//   const filteredRequests = requests.filter(
//     (request) =>
//       (activeTab === "all" || request.status === activeTab) &&
//       (request.tutorId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         request._id.includes(searchQuery))
//   );

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Calculate total pending amount
//   const totalPendingAmount =
//     activeTab === "pending"
//       ? filteredRequests.reduce((sum, request) => sum + request.amount, 0)
//       : 0;

//   const totalAdminFees = requests.reduce(
//     (sum, r) => sum + (r.adminFee || 0),
//     0
//   );
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-grow">
//         {/* Navigation Bar */}
//         <NavBar setSearchTerm={setSearchQuery} />

//         {/* Page Content */}
//         <div className="container mx-auto py-6 px-4 md:px-6 flex-grow overflow-y-auto">
//           {/* Stats Section */}
//           <div className="grid gap-6 md:grid-cols-3 mb-8">
//             {/* Pending Requests Card */}
//             <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-lg overflow-hidden">
//               <div className="p-5 pb-2">
//                 <h2 className="text-lg font-medium text-rose-700">
//                   Pending Requests
//                 </h2>
//               </div>
//               <div className="p-5">
//                 <div className="text-3xl font-bold text-rose-800">
//                   {
//                     requests.filter((request) => request.status === "pending")
//                       .length
//                   }
//                 </div>
//                 <p className="text-rose-600 text-sm">Awaiting processing</p>
//               </div>
//             </div>

//             {/* Total Pending Amount Card */}
//             <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg overflow-hidden">
//               <div className="p-5 pb-2">
//                 <h2 className="text-lg font-medium text-emerald-700">
//                   Total Pending Amount
//                 </h2>
//               </div>
//               <div className="p-5">
//                 <div className="text-3xl font-bold text-emerald-800">
//                   Rs {totalPendingAmount.toFixed(2)}
//                 </div>
//                 <p className="text-emerald-600 text-sm">To be processed</p>
//               </div>
//             </div>

//             {/* Total Admin Revenue */}
//             <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//               <div className="p-5 pb-2">
//                 <h2 className="text-lg font-medium text-gray-900">
//                   Admin Revenue
//                 </h2>
//               </div>
//               <div className="p-5">
//                 <div className="text-3xl font-bold text-gray-900">
//                   Rs {totalAdminFees.toFixed(2)}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Earned from withdrawal fees
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="mb-6">
//             <div className="flex border-b border-gray-200">
//               {[
//                 { key: "pending", label: "Pending" },
//                 { key: "completed", label: "Completed" },
//                 { key: "all", label: "All Requests" },
//               ].map(({ key, label }) => (
//                 <button
//                   key={key}
//                   className={`py-2 px-4 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300 focus:outline-none ${
//                     activeTab === key ? "border-gray-800 text-gray-900" : ""
//                   }`}
//                   onClick={() => setActiveTab(key)}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Pending Requests Table */}
//           <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
//             <div className="relative w-full md:w-auto">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//               <input
//                 type="search"
//                 placeholder="Search by tutor or ID..."
//                 className="pl-8 w-full md:w-[300px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Request ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Tutor
//                   </th>
//                   <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Request Date
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredRequests.length > 0 ? (
//                   filteredRequests.map((request) => (
//                     <tr
//                       key={request._id}
//                       onClick={() => handleRequestClick(request)}
//                       className="cursor-pointer hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                         {request._id}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         {request.tutorId.name}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {formatDate(request.createdAt)}
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium text-right">
//                         Rs {request.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <span
//                           className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                             request.status === "completed"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-rose-100 text-rose-800"
//                           }`}
//                         >
//                           {request.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-6 py-10 text-center text-gray-500"
//                     >
//                       <div className="flex flex-col items-center">
//                         <Wallet className="h-10 w-10 text-gray-400 mb-2" />
//                         <p>No {activeTab} requests found</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Dialog for Request Details */}
//           {selectedRequest && (
//             <div
//               className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
//                 isDialogOpen ? "block" : "hidden"
//               }`}
//             >
//               <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     Withdrawal Request Details
//                   </h2>
//                   <button
//                     className="text-gray-500 hover:text-gray-700"
//                     onClick={() => setIsDialogOpen(false)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
//                     <div>
//                       <p className="text-sm text-gray-500">Request ID</p>
//                       <p className="font-medium">{selectedRequest._id}</p>
//                     </div>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
//                       Pending
//                     </span>
//                   </div>
//                   {/* <div className="grid grid-cols-2 gap-6">
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-500">Tutor</p>
//                       <p className="font-medium">
//                         {selectedRequest.tutorId.name}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         ID: {selectedRequest.tutorId._id}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-500">Amount</p>
//                       <p className="text-xl font-bold text-emerald-600">
//                         Rs {selectedRequest.amount.toFixed(2)}
//                       </p>
//                     </div>
//                   </div> */}

//                   <div className="grid grid-cols-2 gap-6">
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-500">Tutor</p>
//                       <p className="font-medium">
//                         {selectedRequest.tutorId.name}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         ID: {selectedRequest.tutorId._id}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-500">Requested Amount</p>
//                       <p className="font-medium text-gray-900">
//                         Rs {selectedRequest.amount.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-500">Admin Fee (10%)</p>
//                       <p className="font-medium text-red-600">
//                         Rs{" "}
//                         {selectedRequest.adminFee > 0
//                           ? selectedRequest.adminFee.toFixed(2)
//                           : (selectedRequest.amount * 0.1).toFixed(2)}
//                       </p>
//                     </div>
//                     {/* Final Payout now in a separate column */}
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-500">Final Payout</p>
//                       <p className="font-bold text-emerald-700">
//                         Rs{" "}
//                         {selectedRequest.payoutAmount > 0
//                           ? selectedRequest.payoutAmount.toFixed(2)
//                           : (selectedRequest.amount * 0.9).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
//                     <CalendarDays className="h-4 w-4" />
//                     <span>
//                       Requested on {formatDate(selectedRequest.createdAt)}
//                     </span>
//                   </div>
//                   <div className="border rounded-lg overflow-hidden">
//                     <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-3">
//                       <h4 className="font-medium text-white">
//                         Payment Information
//                       </h4>
//                     </div>
//                     <div className="p-4 space-y-4 bg-gradient-to-b from-rose-50 to-white">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-1">
//                           <p className="text-sm text-gray-500">Bank Name</p>
//                           <p className="font-medium">
//                             {selectedRequest.paymentInfo.bankName}
//                           </p>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-sm text-gray-500">Account Name</p>
//                           <p className="font-medium">
//                             {selectedRequest.paymentInfo.bankName}
//                           </p>
//                         </div>
//                         <div className="space-y-1 col-span-2">
//                           <p className="text-sm text-gray-500">
//                             Account Number
//                           </p>
//                           <p className="font-medium">
//                             {selectedRequest.paymentInfo.accountNumber}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-2 mt-6">
//                   <button
//                     className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
//                     onClick={() => setIsDialogOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:from-emerald-600 hover:to-green-600"
//                     onClick={handleSetCompleted}
//                   >
//                     Mark as Completed
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { CalendarDays, Search, Wallet } from "lucide-react";
import Sidebar from "./Slidebar"; // Import the Sidebar component
import NavBar from "./NavBar/NavBar"; // Import the NavBar component
import axios from "axios";

export default function Withdrawalsrequest() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch all withdrawals
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/withdrawals/all",
          { withCredentials: true }
        );
        if (res.data.success) setRequests(res.data.withdrawals);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
      }
    };
    fetchRequests();
  }, []);

  const handleRequestClick = (request) => {
    console.log("Selected Request:", request);
    console.log("Admin Fee:", request.adminFee);
    console.log("Payout Amount:", request.payoutAmount);
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  // const handleSetCompleted = () => {
  //   const updatedRequests = requests.map((req) =>
  //     req.id === selectedRequest.id ? { ...req, status: "completed" } : req
  //   );
  //   setRequests(updatedRequests);
  //   setIsDialogOpen(false);
  //   alert(`Withdrawal request completed for ${selectedRequest.tutorName}`);
  // };

  const handleSetCompleted = async () => {
    try {
      await axios.post(
        `http://localhost:5001/api/withdrawals/process/${selectedRequest._id}`,
        {},
        { withCredentials: true }
      );
      setRequests((prev) =>
        prev.map((request) =>
          request._id === selectedRequest._id
            ? { ...request, status: "completed" }
            : request
        )
      );
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error processing withdrawal:", err);
    }
  };

  // Filter requests by active tab and search query
  const filteredRequests = requests.filter(
    (request) =>
      (activeTab === "all" || request.status === activeTab) &&
      (request.tutorId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request._id.includes(searchQuery))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate total pending amount
  const totalPendingAmount =
    activeTab === "pending"
      ? filteredRequests.reduce((sum, request) => sum + request.amount, 0)
      : 0;

  const totalAdminFees = requests.reduce(
    (sum, r) => sum + (r.adminFee || 0),
    0
  );
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Navigation Bar */}
        <NavBar setSearchTerm={setSearchQuery} />

        {/* Page Content */}
        <div className="container mx-auto py-6 px-4 md:px-6 flex-grow overflow-y-auto">
          {/* Stats Section */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {/* Pending Requests Card */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-lg overflow-hidden">
              <div className="p-5 pb-2">
                <h2 className="text-lg font-medium text-rose-700">
                  Pending Requests
                </h2>
              </div>
              <div className="p-5">
                <div className="text-3xl font-bold text-rose-800">
                  {
                    requests.filter((request) => request.status === "pending")
                      .length
                  }
                </div>
                <p className="text-rose-600 text-sm">Awaiting processing</p>
              </div>
            </div>

            {/* Total Pending Amount Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg overflow-hidden">
              <div className="p-5 pb-2">
                <h2 className="text-lg font-medium text-emerald-700">
                  Total Pending Amount
                </h2>
              </div>
              <div className="p-5">
                <div className="text-3xl font-bold text-emerald-800">
                  Rs {totalPendingAmount.toFixed(2)}
                </div>
                <p className="text-emerald-600 text-sm">To be processed</p>
              </div>
            </div>

            {/* Total Admin Revenue */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5 pb-2">
                <h2 className="text-lg font-medium text-gray-900">
                  Admin Revenue
                </h2>
              </div>
              <div className="p-5">
                <div className="text-3xl font-bold text-gray-900">
                  Rs {totalAdminFees.toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">
                  Earned from withdrawal fees
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              {[
                { key: "pending", label: "Pending" },
                { key: "completed", label: "Completed" },
                { key: "all", label: "All Requests" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`py-2 px-4 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300 focus:outline-none ${
                    activeTab === key ? "border-gray-800 text-gray-900" : ""
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Pending Requests Table */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search by tutor or ID..."
                className="pl-8 w-full md:w-[300px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutor
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr
                      key={request._id}
                      onClick={() => handleRequestClick(request)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {request._id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {request.tutorId.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right">
                        Rs {request.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            request.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Wallet className="h-10 w-10 text-gray-400 mb-2" />
                        <p>No {activeTab} requests found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dialog for Request Details */}
          {selectedRequest && (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
                isDialogOpen ? "block" : "hidden"
              }`}
            >
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Withdrawal Request Details
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Request ID</p>
                      <p className="font-medium">{selectedRequest._id}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                      Pending
                    </span>
                  </div>
                  {/* <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Tutor</p>
                      <p className="font-medium">
                        {selectedRequest.tutorId.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {selectedRequest.tutorId._id}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-xl font-bold text-emerald-600">
                        Rs {selectedRequest.amount.toFixed(2)}
                      </p>
                    </div>
                  </div> */}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Tutor</p>
                      <p className="font-medium">
                        {selectedRequest.tutorId.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {selectedRequest.tutorId._id}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Requested Amount</p>
                      <p className="font-medium text-gray-900">
                        Rs {selectedRequest.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Admin Fee (10%)</p>
                      <p className="font-medium text-red-600">
                        Rs{" "}
                        {selectedRequest.adminFee > 0
                          ? selectedRequest.adminFee.toFixed(2)
                          : (selectedRequest.amount * 0.1).toFixed(2)}
                      </p>
                    </div>
                    {/* Final Payout now in a separate column */}
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Final Payout</p>
                      <p className="font-bold text-emerald-700">
                        Rs{" "}
                        {selectedRequest.payoutAmount > 0
                          ? selectedRequest.payoutAmount.toFixed(2)
                          : (selectedRequest.amount * 0.9).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      Requested on {formatDate(selectedRequest.createdAt)}
                    </span>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-3">
                      <h4 className="font-medium text-white">
                        Payment Information
                      </h4>
                    </div>
                    <div className="p-4 space-y-4 bg-gradient-to-b from-rose-50 to-white">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Bank Name</p>
                          <p className="font-medium">
                            {selectedRequest.paymentInfo.bankName}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Account Name</p>
                          <p className="font-medium">
                            {selectedRequest.paymentInfo.bankName}
                          </p>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <p className="text-sm text-gray-500">
                            Account Number
                          </p>
                          <p className="font-medium">
                            {selectedRequest.paymentInfo.accountNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:from-emerald-600 hover:to-green-600"
                    onClick={handleSetCompleted}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}