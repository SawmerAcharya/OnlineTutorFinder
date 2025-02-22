
import React, { useContext, useState } from "react";
import { MdOutlineEmail, MdVpnKey } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AppContent } from "../Context/AppContex";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Handle OTP Input
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
    const paste = event.clipboardData.getData("text").slice(0, otp.length).split("");
    if (paste.length === otp.length) {
      setOtp(paste);
      document.getElementById(`otp-input-${otp.length - 1}`).focus();
    }
  };

  // Handle Email Submission
  const onSubmitEmail = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset OTP.");
    }
  };

  // Handle OTP Submission
  const onSubmitOTP = async (event) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    setIsOtpSubmited(true);
  };

  // Handle New Password Submission
  // const onSubmitNewPassword = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp: otp.join(""), newPassword });
  //     if (data.success) {
  //       toast.success(data.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to reset password.");
  //   }
  // };

  const onSubmitNewPassword = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp: otp.join(""), newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
        // Navigate to login or another appropriate page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-row gap-8 flex-wrap justify-center">
        {!isEmailSent && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <MdOutlineEmail className="text-4xl text-indigo-600" />
            </div>
            <h2 className="text-center text-2xl font-semibold mb-6">Forgot Password?</h2>
            <p className="text-center text-sm mb-6">No worries! Enter your email and we'll send you reset instructions.</p>
            <form onSubmit={onSubmitEmail}>
              <div className="relative mb-4">
                <MdOutlineEmail className="absolute text-lg text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="border rounded-lg w-full pl-10 p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="bg-indigo-600 text-white w-full p-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Submit
              </button>
            </form>
          </div>
        )}

        {isEmailSent && !isOtpSubmited && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-center text-2xl font-semibold mb-4 text-indigo-600">Reset Password OTP</h2>
            <p className="text-center mb-6 text-gray-500">Enter the 6-digit code sent to your email id.</p>
            <form onSubmit={onSubmitOTP}>
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
              <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                Submit OTP →
              </button>
            </form>
          </div>
        )}

        {isOtpSubmited && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <MdVpnKey className="text-4xl text-indigo-600" />
            </div>
            <h2 className="text-center text-2xl font-semibold mb-6">New Password</h2>
            <p className="text-center text-sm mb-6">Enter the new password below</p>
            <form onSubmit={onSubmitNewPassword}>
              <div className="relative mb-4">
                <MdVpnKey className="absolute text-lg text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="border rounded-lg w-full pl-10 pr-10 p-3"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {isPasswordVisible ? (
                  <IoEyeOffOutline
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <IoEyeOutline
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
              </div>
              <button type="submit" className="bg-indigo-600 text-white w-full p-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
