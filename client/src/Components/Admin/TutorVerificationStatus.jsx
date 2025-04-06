import React from 'react';

function TutorVerificationStatus() {
  return (
    <div className="bg-white p-4 shadow rounded-lg w-full max-w-md">
      <h3 className="text-lg font-semibold">Tutor Verification Status</h3>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Verified Tutors</span>
          <span className="text-sm font-semibold text-green-600">233 (95%)</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-green-500 h-3 rounded-full" style={{ width: '95%' }}></div>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Pending Verification</span>
          <span className="text-sm font-semibold text-orange-500">12 (5%)</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3">
          <div className="bg-orange-500 h-3 rounded-full" style={{ width: '5%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default TutorVerificationStatus;
