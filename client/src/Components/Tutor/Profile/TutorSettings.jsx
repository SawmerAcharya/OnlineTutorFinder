import React, { useState, useEffect } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TutorSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState(''); // Fetch this from auth system
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Simulate fetching user ID from auth context or localStorage
    const storedUserId = "67d5a72aa4056fd70d1eb15f"; // Replace this with actual user data
    setUserId(storedUserId);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!userId) {
      toast.error('User ID is missing. Please log in again.');
      return;
    }
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('All fields are required');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5001/api/auth/update-password',
        {
          userId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // Include if API uses cookies for authentication
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Password updated successfully!');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update password. Please try again.';
      toast.error(message);
      console.error("Error during update password:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-gray-600">Change your password below</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center mb-6">
            <KeyRound className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg py-2.5 px-3 pr-10 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg py-2.5 px-3 pr-10 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg py-2.5 px-3 pr-10 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TutorSettings;
