import React from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="text-center mb-6">
          {/* <img src={logo} alt="Logo" className="mx-auto h-12 w-auto" />  */}
          <h2 className="text-4xl font-bold mt-2">Join Our Platform</h2>
        </div>
        <p className="text-center mb-4">Choose how you want to sign up</p>
        <div className="space-y-4">
          <Link to="/TutorSignup">
            <button className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition duration-300">
              Sign up as a Tutor
            </button>
          </Link>
          <Link to="/StudentSignup">
            <button className="w-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded transition duration-300 mt-4">
              Sign up as a Student
            </button>
          </Link>
        </div>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
