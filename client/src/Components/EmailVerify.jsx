
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../Context/AppContex"; // Import AppContent context if you have one

const EmailVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent); // Use backendUrl from AppContent context

  const email = location.state?.email; // Get email from navigation state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (event, index) => {
    const newOtp = [...otp];
    const { value } = event.target;

    // if (value === "" || (value.match(/[0-9]/) && value.length === 1)) {
    //   newOtp[index] = value;
    //   setOtp(newOtp);
    //   if (value && index < otp.length - 1) {
    //     document.getElementById(`otp-input-${index + 1}`).focus();
    //   }
    // }


    // Handle normal single-digit input
    if (value.length === 1 && value.match(/[0-9]/)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  }
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").trim();

    // Validate if pasted data is a 6-digit number
    if (pastedData.length === otp.length && /^[0-9]+$/.test(pastedData)) {
      setOtp(pastedData.split(""));

      // Move focus to the last input field
      document.getElementById(`otp-input-${otp.length - 1}`).focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const enteredOtp = otp.join(""); // Combine OTP values into a single string
  
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { email, otp: enteredOtp });
      console.log("Response from server:", data); // Debugging
  
      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error(data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-lg font-semibold text-center mb-4">Email Verification</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          We've sent a verification code to your email: {email}.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
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
