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
import Dashboard from './Components/Admin/Dashboard'
import TutorList from "./Components/Admin/TutorList";  //Tutor registered list displayed in the admin dashboard
import StudentList from "./Components/Students/StudentList"; //student registered list displayed in the admin dashboard

import TutorDashboard from './Components/Tutor/TutorDashboard'
import ProfileTutor from "./Components/Tutor/Profile/ProfileTutor"; //Tutor profile
import TutorSettings from './Components/Tutor/Profile/TutorSettings'
import TutorStudent from "./Components/Tutor/Profile/TutorStudent"; 
import TutorMessages from "./Components/Tutor/Message/Message";

import Homepage from "./Components/Homepage";  // Main default dashboard 
import SearchTutor from "./Components/SearchTutor";
import ProfileInfo from "./Components/Students/ViewProfile/ProfileInfo" //tutor details where student can see through their dashboard
import Favorites from "./Components/Students/Favorites";
import Profile from "./Components/Students/Profile"; //Student profile
import Chat from "./Components/Chat/Chat";
import Book from "./Components/Book/Book";

import RejectionCard from "./Components/Tutor/ApplicationStatus/RejectionCard";
import PendingCard from "./Components/Tutor/ApplicationStatus/PendingCard";

import PaymentFailed from "./Components/Students/PaymentStatus/PaymentFailed";
import PaymentSuccess from "./Components/Students/PaymentStatus/PaymentSuccess";



function App() {
  return (
    <div className="main">
    <ToastContainer position="top-right" autoClose={3000}/>
    <Router>
      {" "}
      {/* Router component to provide navigation functionality */}
      <div>
        {" "}
        {/* Main container for all routes */}
        
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path="/SearchTutor" element={< SearchTutor />} />        
          <Route path="/login" element={<Login />} />        
          <Route path="/SignupForm" element={<SignupForm />} />       
          <Route path="/verify-email" element={<EmailVerify />} />       
          <Route path="/ResetPassword" element={<ResetPassword />} />

          <Route path="/students" element={<StudentList />} />       
          <Route path="/tutors" element={<TutorList />} />       
          <Route path="/Messages" element={<TutorMessages />} />       
               
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
          <Route path="/fav" element={<Favorites />} />  
          <Route path="/tutorStudent" element={<TutorStudent />} />
          <Route path="/chat" element={<Chat />} />   
          <Route path="/failed" element={<PaymentFailed />} />   
          <Route path="/success" element={<PaymentSuccess />} />   
          <Route path="/book" element={<Book />} />   


        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;