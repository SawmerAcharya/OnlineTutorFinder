

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Login from "./Components/Login";
// import SignupForm from "./Components/SignupForm";
// import EmailVerify from "./Components/EmailVerify";
// import ResetPassword from "./Components/ResetPassword";
// import RegistrationPortal from "./Components/Form/RegistrationPortal";

// import TutorProfile from "./Components/Admin/ViewProfile";
// import Dashboard from './Components/Admin/Dashboard';
// import TutorList from "./Components/Admin/TutorList";
// import StudentList from "./Components/Students/StudentList";

// import TutorDashboard from './Components/Tutor/TutorDashboard';
// import ProfileTutor from "./Components/Tutor/Profile/ProfileTutor";
// import TutorSettings from './Components/Tutor/Profile/TutorSettings';
// // import TutorStudent from "./Components/Tutor/Profile/TutorStudent";
// import TutorMessages from "./Components/Tutor/Message/Message";

// import AssignmentDashboard from "./Components/Tutor/Assigment/AssignmentDashboard.jsx";
// import ManageAssignments from "./Components/Tutor/Assigment/ManageAssignments.jsx";
// import AssignmentForm from "./Components/Tutor/Assigment/AssignmentForm.jsx";
// import SubmissionsPage from "./Components/Tutor/Assigment/SubmissionsPage.jsx";
// import StudentDashboard from "./Components/Students/Assign/StudentDashboard.jsx";
// import AssignmentDetails from "./Components/Students/Assign/AssignmentDetails.jsx";
// import SubmitAssignment from "./Components/Students/Assign/SubmitAssignment.jsx";
// import ViewSubmission from "./Components/Students/Assign/ViewSubmitted.jsx";

// import BookingViewDetails from "./Components/Tutor/BookingViewDetails.jsx";

// import Homepage from "./Components/Homepage";
// import SearchTutor from "./Components/SearchTutor";
// import ProfileInfo from "./Components/Students/ViewProfile/ProfileInfo";
// import Profile from "./Components/Students/Profile";
// import Chat from "./Components/Chat/Chat";
// import TutorStd from "./Components/Tutor/TutorsStd";
// import RejectionCard from "./Components/Tutor/ApplicationStatus/RejectionCard";
// import PendingCard from "./Components/Tutor/ApplicationStatus/PendingCard";

// import Bookinglist from "./Components/Tutor/Bookinglist";
// import { ProtectedRoute } from "./Components/ProtectedRoute.jsx";
// import PaymentFailed from "./Components/Students/PaymentStatus/PaymentFailed";
// import PaymentSuccess from "./Components/Students/PaymentStatus/PaymentSuccess";
// import TutorBook from "./Components/Book/TutorBook";
// import WithdrawPage from "./Components/Tutor/WithdrawPage";
// import Withdrawalsrequest from "./Components/Admin/WithrequestPage";
// import BookingHistory from "./Components/Students/BookingHistory";
// import BookingDetails from "./Components/Students/bookingDetails.jsx";
// import PaymentSetupForm from "./Components/Tutor/Accountpaymentsetup/PaymentSetupForm.jsx";
// import AdminPaymentHistory from "./Components/Admin/AdminPaymentHistory.jsx";

// function App() {
//   return (
//     <div className="main">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Router>
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/SearchTutor" element={<SearchTutor />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/SignupForm" element={<SignupForm />} />
//           <Route path="/verify-email" element={<EmailVerify />} />
//           <Route path="/ResetPassword" element={<ResetPassword />} />

//           <Route path="/form" element={<RegistrationPortal />} />

//           <Route path="/students" element={<ProtectedRoute protectionType="admin"><StudentList /></ProtectedRoute>} />
//           <Route path="/tutors" element={<ProtectedRoute protectionType="admin"><TutorList /></ProtectedRoute>} />
//           <Route path="/withdrawalsreq" element={<ProtectedRoute protectionType="admin"><Withdrawalsrequest /></ProtectedRoute>} />
//           <Route path="/admin" element={<ProtectedRoute protectionType="admin"><Dashboard /></ProtectedRoute>} />
//           <Route
//   path="/admin/payment-history"
//   element={
//     <ProtectedRoute protectionType={"admin"}>
//       <AdminPaymentHistory />
//     </ProtectedRoute>
//   }
// />

//           <Route path="/profile/:tutorId" element={<ProtectedRoute protectionType="admin"><TutorProfile /></ProtectedRoute>} />

//           <Route path="/tutor" element={<ProtectedRoute protectionType="tutor"><TutorDashboard /></ProtectedRoute>} />
//           <Route path="/tutor/profile/:tutorId" element={<ProtectedRoute protectionType="tutor"><ProfileTutor /></ProtectedRoute>} />
//           <Route path="/tutor/Setting/:tutorId" element={<ProtectedRoute protectionType="tutor"><TutorSettings /></ProtectedRoute>} />
//           {/* <Route path="/tutorStudent" element={<ProtectedRoute protectionType="tutor"><TutorStudent /></ProtectedRoute>} /> */}
//           <Route path="/dash" element={<ProtectedRoute protectionType="tutor"><AssignmentDashboard /></ProtectedRoute>} />
//           <Route path="/AssignmentDashboard" element={<ProtectedRoute protectionType="tutor"><AssignmentDashboard /></ProtectedRoute>} />
//           <Route path="/manage" element={<ProtectedRoute protectionType="tutor"><ManageAssignments /></ProtectedRoute>} />
//           <Route path="/assign/:tutorId" element={<ProtectedRoute protectionType="tutor"><AssignmentForm /></ProtectedRoute>} />
//           <Route path="/submissions" element={<ProtectedRoute protectionType="tutor"><SubmissionsPage /></ProtectedRoute>} />
//           <Route path="/submissions/:id" element={<ProtectedRoute protectionType="tutor"><SubmissionsPage /></ProtectedRoute>} />
//           <Route path="/BookingsList" element={<ProtectedRoute protectionType="tutor"><Bookinglist /></ProtectedRoute>} />
//           <Route path="/Bookingsdetails/:bookingId" element={<ProtectedRoute protectionType="tutor"><BookingViewDetails /></ProtectedRoute>} />
//           <Route path="/withdraw" element={<ProtectedRoute protectionType="tutor"><WithdrawPage /></ProtectedRoute>} />
//           <Route path="/tutor/PaymentSetup/:tutorId" element={<ProtectedRoute protectionType="tutor"><PaymentSetupForm /></ProtectedRoute>} />

//           <Route path="/tutor/:id" element={<ProtectedRoute><ProfileInfo /></ProtectedRoute>} />
//           <Route path="/Rejected" element={<ProtectedRoute><RejectionCard /></ProtectedRoute>} />
//           <Route path="/Pending" element={<ProtectedRoute><PendingCard /></ProtectedRoute>} />

//           <Route path="/mybooking" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
//           <Route path="/details/:bookingId" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />

//           <Route path="/assignments/:id" element={<ProtectedRoute><AssignmentDetails /></ProtectedRoute>} />
//           <Route path="/assigned/:id" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
//           <Route path="/assignments/:id/submit" element={<ProtectedRoute><SubmitAssignment /></ProtectedRoute>} />
//           <Route path="/assignments/:id/view-submission" element={<ProtectedRoute><ViewSubmission /></ProtectedRoute>} />

//           <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//           <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
//           <Route path="/std" element={<ProtectedRoute><TutorStd /></ProtectedRoute>} />
//           <Route path="/Messages" element={<ProtectedRoute><TutorMessages /></ProtectedRoute>} />
//           <Route path="/TutorBook/:tutorId" element={<ProtectedRoute><TutorBook /></ProtectedRoute>} />
//           <Route path="/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
//           <Route path="/failed" element={<ProtectedRoute><PaymentFailed /></ProtectedRoute>} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public components
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import SignupForm from "./Components/SignupForm";
import EmailVerify from "./Components/EmailVerify";
import ResetPassword from "./Components/ResetPassword";
import RegistrationPortal from "./Components/Form/RegistrationPortal";
import SearchTutor from "./Components/SearchTutor";

// Admin components
import Dashboard from './Components/Admin/Dashboard';
import TutorList from "./Components/Admin/TutorList";
import StudentList from "./Components/Students/StudentList";
import Withdrawalsrequest from "./Components/Admin/WithrequestPage";
import AdminPaymentHistory from "./Components/Admin/AdminPaymentHistory.jsx";
import TutorProfile from "./Components/Admin/ViewProfile";

// Tutor components
import TutorDashboard from './Components/Tutor/TutorDashboard';
import ProfileTutor from "./Components/Tutor/Profile/ProfileTutor";
import TutorSettings from './Components/Tutor/Profile/TutorSettings';
import AssignmentDashboard from "./Components/Tutor/Assigment/AssignmentDashboard.jsx";
import ManageAssignments from "./Components/Tutor/Assigment/ManageAssignments.jsx";
import AssignmentForm from "./Components/Tutor/Assigment/AssignmentForm.jsx";
import SubmissionsPage from "./Components/Tutor/Assigment/SubmissionsPage.jsx";
import Bookinglist from "./Components/Tutor/Bookinglist";
import BookingViewDetails from "./Components/Tutor/BookingViewDetails.jsx";
import WithdrawPage from "./Components/Tutor/WithdrawPage";
import PaymentSetupForm from "./Components/Tutor/Accountpaymentsetup/PaymentSetupForm.jsx";
import TutorStd from "./Components/Tutor/TutorsStd";
import RejectionCard from "./Components/Tutor/ApplicationStatus/RejectionCard";
import PendingCard from "./Components/Tutor/ApplicationStatus/PendingCard";
import TutorMessages from "./Components/Tutor/Message/Message";

// Student components
import ProfileInfo from "./Components/Students/ViewProfile/ProfileInfo";
import Profile from "./Components/Students/Profile";
import Chat from "./Components/Chat/Chat";
import BookingHistory from "./Components/Students/BookingHistory";
import BookingDetails from "./Components/Students/bookingDetails.jsx";
import StudentDashboard from "./Components/Students/Assign/StudentDashboard.jsx";
import AssignmentDetails from "./Components/Students/Assign/AssignmentDetails.jsx";
import SubmitAssignment from "./Components/Students/Assign/SubmitAssignment.jsx";
import ViewSubmission from "./Components/Students/Assign/ViewSubmitted.jsx";
import TutorBook from "./Components/Book/TutorBook";
import PaymentSuccess from "./Components/Students/PaymentStatus/PaymentSuccess";
import PaymentFailed from "./Components/Students/PaymentStatus/PaymentFailed";

import { ProtectedRoute } from "./Components/ProtectedRoute.jsx";

function App() {
  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/SearchTutor" element={<SearchTutor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/form" element={<RegistrationPortal />} />

          {/* Admin Protected Routes */}
          <Route path="/students" element={<ProtectedRoute protectionType="admin"><StudentList /></ProtectedRoute>} />
          <Route path="/tutors" element={<ProtectedRoute protectionType="admin"><TutorList /></ProtectedRoute>} />
          <Route path="/withdrawalsreq" element={<ProtectedRoute protectionType="admin"><Withdrawalsrequest /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute protectionType="admin"><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/payment-history" element={<ProtectedRoute protectionType="admin"><AdminPaymentHistory /></ProtectedRoute>} />
          <Route path="/profile/:tutorId" element={<ProtectedRoute protectionType="admin"><TutorProfile /></ProtectedRoute>} />

          {/* Tutor Protected Routes */}
          <Route path="/tutor" element={<ProtectedRoute protectionType="tutor"><TutorDashboard /></ProtectedRoute>} />
          <Route path="/tutor/profile/:tutorId" element={<ProtectedRoute protectionType="tutor"><ProfileTutor /></ProtectedRoute>} />
          <Route path="/tutor/Setting/:tutorId" element={<ProtectedRoute protectionType="tutor"><TutorSettings /></ProtectedRoute>} />
          <Route path="/dash" element={<ProtectedRoute protectionType="tutor"><AssignmentDashboard /></ProtectedRoute>} />
          <Route path="/AssignmentDashboard" element={<ProtectedRoute protectionType="tutor"><AssignmentDashboard /></ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute protectionType="tutor"><ManageAssignments /></ProtectedRoute>} />
          <Route path="/assign/:tutorId" element={<ProtectedRoute protectionType="tutor"><AssignmentForm /></ProtectedRoute>} />
          <Route path="/submissions" element={<ProtectedRoute protectionType="tutor"><SubmissionsPage /></ProtectedRoute>} />
          <Route path="/submissions/:id" element={<ProtectedRoute protectionType="tutor"><SubmissionsPage /></ProtectedRoute>} />
          <Route path="/BookingsList" element={<ProtectedRoute protectionType="tutor"><Bookinglist /></ProtectedRoute>} />
          <Route path="/Bookingsdetails/:bookingId" element={<ProtectedRoute protectionType="tutor"><BookingViewDetails /></ProtectedRoute>} />
          <Route path="/withdraw" element={<ProtectedRoute protectionType="tutor"><WithdrawPage /></ProtectedRoute>} />
          <Route path="/tutor/PaymentSetup/:tutorId" element={<ProtectedRoute protectionType="tutor"><PaymentSetupForm /></ProtectedRoute>} />

          {/* Student & General Protected Routes */}
          <Route path="/tutor/:id" element={<ProtectedRoute><ProfileInfo /></ProtectedRoute>} />
          <Route path="/Rejected" element={<ProtectedRoute><RejectionCard /></ProtectedRoute>} />
          <Route path="/Pending" element={<ProtectedRoute><PendingCard /></ProtectedRoute>} />
          <Route path="/mybooking" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/details/:bookingId" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
          <Route path="/assignments/:id" element={<ProtectedRoute><AssignmentDetails /></ProtectedRoute>} />
          <Route path="/assigned/:id" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/assignments/:id/submit" element={<ProtectedRoute><SubmitAssignment /></ProtectedRoute>} />
          <Route path="/assignments/:id/view-submission" element={<ProtectedRoute><ViewSubmission /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/std" element={<ProtectedRoute><TutorStd /></ProtectedRoute>} />
          <Route path="/Messages" element={<ProtectedRoute><TutorMessages /></ProtectedRoute>} />
          <Route path="/TutorBook/:tutorId" element={<ProtectedRoute><TutorBook /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/failed" element={<ProtectedRoute><PaymentFailed /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;