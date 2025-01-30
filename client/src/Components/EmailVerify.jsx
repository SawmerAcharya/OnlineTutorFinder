// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { AppContent } from "../Context/AppContex";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const EmailVerify = () => {
//   const { backendUrl, userData, setUserData, getUserData } = useContext(AppContent);
//   const navigate = useNavigate();

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//   useEffect(() => {
//     // Redirect if the user is already verified
//     if (userData && userData.isAccountVerified) {
//       navigate('/'); // Redirect to the dashboard if already verified
//     }
//   }, [userData, navigate]);

//   const handleChange = (event, index) => {
//     const newOtp = [...otp];
//     const { value } = event.target;

//     if (value === "" || (value.match(/[0-9]/) && value.length === 1)) {
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-input-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleBackspace = (event, index) => {
//     if (event.key === "Backspace" && otp[index] === "" && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = "";
//       setOtp(newOtp);
//       document.getElementById(`otp-input-${index - 1}`).focus();
//     }
//   };

//   const handlePaste = (event) => {
//     event.preventDefault();
//     const paste = event.clipboardData.getData('text').slice(0, otp.length).split('');
//     if (paste.length === otp.length) {
//       setOtp(paste);
//       document.getElementById(`otp-input-${otp.length - 1}`).focus();
//     }
//   };

//   const handleVerify = async () => {
//     const enteredOtp = otp.join("");
//     console.log("OTP Entered:", enteredOtp); // Check what OTP is sent
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: enteredOtp });
//       console.log("API Response:", data); // Check the API response
//       if (data.success) {
//         toast.success("Email verified successfully!");
//         await getUserData(); // Ensure this function is awaited if asynchronous
//         console.log("Redirecting to home page");
//         navigate('/'); // Check if navigate is called
//       } else {
//         toast.error(data.message || "Failed to verify OTP");
//       }
//     } catch (error) {
//       console.error("Error during OTP verification:", error);
//       toast.error(error.response?.data?.message || "An error occurred while verifying OTP");
//     }
//   };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-lg font-semibold text-center mb-4">Email Verification</h2>
//         <p className="text-sm text-center text-gray-600 mb-6">
//           We've sent a verification code to your email.
//         </p>
//         <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               id={`otp-input-${index}`}
//               type="text"
//               maxLength={1}
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleBackspace(e, index)}
//               className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
//               autoComplete="off"
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleVerify}
//           className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
//         >
//           Verify Now →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmailVerify;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContent } from "../Context/AppContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const { backendUrl, userData, setUserData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    // Redirect if the user is already verified
    if (userData && userData.isAccountVerified) {
      navigate('/'); // Redirect to the home page if already verified
    }
  }, [userData, navigate]);

  const handleChange = (event, index) => {
    const newOtp = [...otp];
    const { value } = event.target;

    if (value === "" || (value.match(/[0-9]/) && value.length === 1)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text').slice(0, otp.length).split('');
    if (paste.length === otp.length) {
      setOtp(paste);
      document.getElementById(`otp-input-${otp.length - 1}`).focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const enteredOtp = otp.join(""); // Combine OTP values
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: enteredOtp });
      if (data.success) {
        toast.success("Email verified successfully!");
        await getUserData(); // Refresh user data
        navigate('/'); // Navigate to the home page
      } else {
        toast.error(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error(error.response?.data?.message || "An error occurred while verifying OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-lg font-semibold text-center mb-4">Email Verification</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          We've sent a verification code to your email.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                autoComplete="off"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Verify Now →
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
