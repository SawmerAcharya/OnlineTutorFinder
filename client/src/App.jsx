import React from "react";
// import Login from "./Components/Login";
// import SearchTutor from "./Components/HomePage";
// import SignupForm from "./Components/SignupForm";
// import EmailVerify from "./Components/EmailVerify";
// import ResetPassword from "./Components/ResetPassword";
import ApplicationForm from "./Components/ApplicationForm";
import AdminDashboard from "./Components/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing necessary components from react-router-dom

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      {" "}
      {/* Router component to provide navigation functionality */}
      <div>
        {" "}
        {/* Main container for all routes */}
        {/* <ToastContainer/>
        <Routes>
          <Route path="/" element={<SearchTutor />} />         
          <Route path="/login" element={<Login />} />        
          <Route path="/SignupForm" element={<SignupForm />} />       
          <Route path="/verify-email" element={<EmailVerify />} />       
          <Route path="/ResetPassword" element={<ResetPassword />} />        */}
         <ApplicationForm></ApplicationForm>
         <AdminDashboard></AdminDashboard>
        {/* </Routes> */}
      </div>
    </Router>
  );
}

export default App;


