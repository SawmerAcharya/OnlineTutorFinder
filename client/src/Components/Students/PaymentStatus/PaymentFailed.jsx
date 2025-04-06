import React from 'react';
import { XCircle, AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react';

function PaymentFailed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-rose-50 p-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-[-1px] bg-rose-200 rounded-full blur-sm animate-pulse"></div>
            <XCircle className="w-20 h-20 text-rose-600 relative" />
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Payment Failed
          </h1>
          
          <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 mb-6">
            <div className="flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-rose-800">
                  Your payment could not be processed
                </p>
                <p className="text-sm text-rose-600 mt-1">
                  Error: Insufficient funds in the account
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transaction ID</span>
              <span className="text-gray-900 font-medium">TXN_123456789</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount</span>
              <span className="text-gray-900 font-medium">$99.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-900 font-medium">March 15, 2024</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
            
            <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-gray-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;