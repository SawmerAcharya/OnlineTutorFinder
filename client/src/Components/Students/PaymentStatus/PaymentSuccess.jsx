import React from 'react';
import { CheckCircle, Download, Home } from 'lucide-react';

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Thank you .
        </p>

        {/* Payment Details */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Amount Paid</span>
            <span className="text-lg font-semibold text-gray-900">Rs120</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Transaction ID</span>
            <span className="text-sm font-mono text-gray-900">TXN_123456789</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Tax</span>
            <span className="text-sm font-mono text-gray-900">Rs 10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Date</span>
            <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
          </div>
          
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
            Download Receipt
            <Download className="w-4 h-4 ml-2" />
          </button>

          <button className="w-full bg-white text-gray-600 py-3 px-4 rounded-lg font-medium hover:text-gray-900 transition-colors flex items-center justify-center">
            Return to Home
            <Home className="w-4 h-4 ml-2" />
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default PaymentSuccess;
