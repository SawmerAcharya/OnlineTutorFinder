// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Search, LogOut } from "lucide-react";


// // import Login from "./Components/Login";
// // import HomePage from "./Components/Homepage";
// // import SignupForm from "./Components/SignupForm";
// // import EmailVerify from "./Components/EmailVerify";
// // import ResetPassword from "./Components/ResetPassword";
// // import TutorProfile from "./Components/Admin/ViewProfile";
// // import RegistrationPortal from "./Components/TutorDetails/RegistrationPortal";
// // import Dashboard from './Components/Admin/Dashboard'
// // import TutorDashboard from './Components/Tutor/TutorDashboard'
// import Userdashboard from "./Components/Userdashboard";



// function App() {
//   return (
//     <div className="main">
//     <ToastContainer/>
//     <Router>
//       {" "}
//       {/* Router component to provide navigation functionality */}
//       <div>
//         {" "}
//         {/* Main container for all routes */}
        
//         {/* <Routes>
//           <Route path="/" element={<HomePage />} />         
//           <Route path="/login" element={<Login />} />        
//           <Route path="/SignupForm" element={<SignupForm />} />       
//           <Route path="/verify-email" element={<EmailVerify />} />       
//           <Route path="/ResetPassword" element={<ResetPassword />} />       
               
//           <Route path="/form" element={<RegistrationPortal />} />       
//           <Route path="/admin" element={<Dashboard />} />       
//           <Route path="/profile/:tutorId" element={<TutorProfile />} />      
//           <Route path="/tutor" element={<TutorDashboard />} />      
//         </Routes> */}
//         <Userdashboard></Userdashboard>
//       </div>
//     </Router>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, LogOut } from "lucide-react";

import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import SignupForm from "./Components/SignupForm";
import EmailVerify from "./Components/EmailVerify";
import ResetPassword from "./Components/ResetPassword";
import TutorProfile from "./Components/Admin/ViewProfile";
import RegistrationPortal from "./Components/TutorDetails/RegistrationPortal";
import Dashboard from './Components/Admin/Dashboard'
import TutorDashboard from './Components/Tutor/TutorDashboard'
import Userdashboard from "./Components/Userdashboard";


function App() {
  return (
    <div className="main">
      <ToastContainer />
      <Router>
       
        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/form" element={<RegistrationPortal />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/profile/:tutorId" element={<TutorProfile />} />
          <Route path="/tutor" element={<TutorDashboard />} />
        <Route path="/Userdashboard" element={<Userdashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
