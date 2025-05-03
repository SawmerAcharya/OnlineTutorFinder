import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./Components/Login";
import SignupForm from "./Components/SignupForm";
import EmailVerify from "./Components/EmailVerify";
import ResetPassword from "./Components/ResetPassword";
import RegistrationPortal from "./Components/Form/RegistrationPortal";

import TutorProfile from "./Components/Admin/ViewProfile";
import Dashboard from './Components/Admin/Dashboard';
import TutorList from "./Components/Admin/TutorList";  
import StudentList from "./Components/Students/StudentList"; 

import TutorDashboard from './Components/Tutor/TutorDashboard';
import ProfileTutor from "./Components/Tutor/Profile/ProfileTutor"; 
import TutorSettings from './Components/Tutor/Profile/TutorSettings';
import TutorStudent from "./Components/Tutor/Profile/TutorStudent"; 
import TutorMessages from "./Components/Tutor/Message/Message";
import UploadAssignmentForm from "./Components/Tutor/Assigment/UploadAssignmentForm";
import BookingViewDetails from "./Components/Tutor/BookingViewDetails";
import Homepage from "./Components/Homepage";  
import SearchTutor from "./Components/SearchTutor";
import ProfileInfo from "./Components/Students/ViewProfile/ProfileInfo";
import Assignmentdata from "./Components/Students/Assignmentdata";
import Assignmentdetail from "./Components/Students/Assignmentdetail";
import Profile from "./Components/Students/Profile"; 
import Chat from "./Components/Chat/Chat";
import TutorStd from "./Components/Tutor/TutorsStd";
import RejectionCard from "./Components/Tutor/ApplicationStatus/RejectionCard";
import PendingCard from "./Components/Tutor/ApplicationStatus/PendingCard";
import Bookinglist from "./Components/Tutor/Bookinglist";
import PaymentFailed from "./Components/Students/PaymentStatus/PaymentFailed";
import PaymentSuccess from "./Components/Students/PaymentStatus/PaymentSuccess";
import TutorBook from "./Components/Book/TutorBook";
import WithdrawPage from "./Components/Tutor/WithdrawPage";
import Withdrawalsrequest from "./Components/Admin/WithrequestPage";
import BookingHistory from "./Components/Students/BookingHistory";
import BookingDetails from "./Components/Students/bookingDetails.jsx";
import PaymentSetupForm from "./Components/Tutor/Accountpaymentsetup/PaymentSetupForm.jsx";
function App() {
  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/SearchTutor" element={<SearchTutor />} />        
            <Route path="/login" element={<Login />} />        
            <Route path="/SignupForm" element={<SignupForm />} />       
            <Route path="/verify-email" element={<EmailVerify />} />       
            <Route path="/ResetPassword" element={<ResetPassword />} />

            <Route path="/students" element={<StudentList />} />       
            <Route path="/tutors" element={<TutorList />} />       
            <Route path="/Messages" element={<TutorMessages />} />       
            <Route path="/mybooking" element={<BookingHistory />} />       
            <Route path="/details/:bookingId" element={<BookingDetails />} />       
                
            <Route path="/form" element={<RegistrationPortal />} />       
            <Route path="/admin" element={<Dashboard />} />       
            <Route path="/profile/:tutorId" element={<TutorProfile />} />      
            <Route path="/tutor" element={<TutorDashboard />} /> 
            <Route path="/tutor/profile/:tutorId" element={<ProfileTutor />} />
            <Route path="/tutor/Setting/:tutorId" element={<TutorSettings />} />
        
            <Route path="/Rejected" element={<RejectionCard />} />          
            <Route path="/Pending" element={<PendingCard />} />           
            <Route path="/tutor/:id" element={<ProfileInfo />} /> 
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/assignment/:id" element={<Assignmentdetail />} />
            <Route path="/tutorStudent" element={<TutorStudent />} />
            <Route path="/Assignmentdata" element={<Assignmentdata />} />
            <Route path="/Assignmentdetail/:id" element={<Assignmentdetail />} />
            <Route path="/std" element={<TutorStd />} />
            <Route path="/chat" element={<Chat />} />   
            <Route path="/failed" element={<PaymentFailed />} />   
            <Route path="/success" element={<PaymentSuccess />} />   
            <Route path="/TutorBook/:tutorId" element={<TutorBook />} />   
            <Route path="/UploadAssignmentForm" element={<UploadAssignmentForm />} />
            <Route path="/Bookinglist" element={<Bookinglist />} />
            <Route path="/BookingViewDetails/:bookingId" element={<BookingViewDetails />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
            <Route path="/withdrawalsreq" element={<Withdrawalsrequest />} />
            <Route
              path="/tutor/PaymentSetup/:tutorId"
              element={<PaymentSetupForm />}
            />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
