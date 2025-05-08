

import React, { useState, useEffect } from "react";
import {
  ArrowUp,
  Clock,
  Calendar,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Nav from "./Nav";
import SlideBars from "./SlideBars";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WithdrawPage() {
  // State for withdrawal form
  const [amount, setAmount] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [formErrors, setFormErrors] = useState({
    amount: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
  });

  // State for modals
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/payments/balance",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setAvailableBalance(res.data.balance);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/total-earnings",
          { withCredentials: true }
        );
        if (res.data.success) {
          setTotalEarnings(res.data.totalEarnings);
        }
      } catch (err) {
        console.error("Error fetching total earnings:", err);
      }
    };

    fetchTotalEarnings();
  }, []);

  const pendingAmount = withdrawalHistory
    .filter((w) => w.status === "pending")
    .reduce((sum, w) => sum + w.amount, 0);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/data", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          const payment = res.data.userData?.paymentInfo;
          if (payment) {
            setAccountHolderName(payment.accountHolderName || "");
            setBankName(payment.bankName || "");
            setAccountNumber(payment.accountNumber || "");
          } else {
            console.warn("No paymentInfo found on userData");
          }
        }
      })
      .catch((err) => console.error("Error fetching payment info:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/withdrawals/history", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          const formatted = res.data.history.map((item) => ({
            id: item._id,
            date: item.createdAt,
            amount: item.amount,
            status: item.status,
            paymentInfo: item.paymentInfo,
            adminFee: item.adminFee,
            payoutAmount: item.payoutAmount,
          }));
          setWithdrawalHistory(formatted);
        }
      })
      .catch((err) => console.error("Error fetching withdrawal history:", err));
  }, []);

  // Form validation
  const validateForm = () => {
    let valid = true;
    const errors = {
      amount: "",
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
    };
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errors.amount = "Please enter a valid amount greater than 0";
      valid = false;
    }
    if (!accountHolderName || accountHolderName.length < 3) {
      errors.accountHolderName = "Account holder name is required";
      valid = false;
    }
    if (!bankName || bankName.length < 2) {
      errors.bankName = "Bank name is required";
      valid = false;
    }
    if (!accountNumber || accountNumber.length < 8) {
      errors.accountNumber = "Valid account number is required";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      // 1) send the withdrawal request
      const payload = {
        amount: Number(amount),
        paymentInfo: { accountHolderName, bankName, accountNumber },
      };
      const res = await axios.post(
        "http://localhost:5001/api/withdrawals/request",
        payload,
        { withCredentials: true }
      );

      toast.success(
        res.data.message || "Withdrawal request submitted successfully."
      );

      resetForm();
      setIsWithdrawModalOpen(false);

      const histRes = await axios.get(
        "http://localhost:5001/api/withdrawals/history",
        { withCredentials: true }
      );
      if (histRes.data.success) {
        setWithdrawalHistory(
          histRes.data.history.map((item) => ({
            id: item._id,
            date: item.createdAt,
            amount: item.amount,
            status: item.status,
            paymentInfo: item.paymentInfo,
          }))
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        toast.error(
          error.response.data.message || "Error submitting withdrawal."
        );
      } else {
        console.error("Unknown error:", error);
        toast.error("Unexpected error occurred.");
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setAmount("");
    setAccountHolderName("");
    setBankName("");
    setAccountNumber("");
    setFormErrors({
      amount: "",
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
    });
  };

  // Open details modal
  const openDetailsModal = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsDetailsModalOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SlideBars />

      <div className="flex flex-col flex-grow">
        <Nav />

        {/* Page Content */}
        <div className="container mx-auto py-10 px-4 max-w-6xl flex-grow overflow-y-auto">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Withdrawal Dashboard
          </h1>
          <p className="text-gray-500 mb-8">
            Manage your earnings and withdrawals
          </p>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Available Balance Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg overflow-hidden">
              <div className="p-5 pb-2">
                <h2 className="text-lg font-medium text-green-800">
                  Available Balance
                </h2>
                <p className="text-green-700 text-sm">Ready to withdraw</p>
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-green-800">
                    Rs {availableBalance.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-green-100">
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
                  onClick={() => setIsWithdrawModalOpen(true)}
                >
                  Request Withdrawal
                </button>
              </div>
            </div>

            {/* Total Earnings Card */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5 pb-2">
                <h2 className="text-lg font-medium text-gray-900">
                  Total Earnings
                </h2>
                <p className="text-gray-500 text-sm">Lifetime earnings</p>
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <ArrowUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      Rs {totalEarnings.toFixed(2)}
                    </span>
                    {/* <p className="text-xs text-gray-500">
                      +Rs 250.00 this month
                    </p> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Amount Card */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5 pb-2">
                <h2 className="text-lg font-medium text-gray-900">Pending</h2>
                <p className="text-gray-500 text-sm">Processing withdrawals</p>
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-100 p-2">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      Rs {pendingAmount.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500">1 pending request</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal History Section */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-8">
            <div className="p-5 pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Withdrawal History
                  </h2>
                  <p className="text-gray-500 text-sm">
                    View all your past withdrawal requests
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <Calendar className="mr-2 h-4 w-4" />
                    Filter by date
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {withdrawalHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-6 text-center text-sm text-gray-500"
                          >
                            No withdrawal history found
                          </td>
                        </tr>
                      ) : (
                        withdrawalHistory.map((withdrawal) => (
                          <tr key={withdrawal.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {withdrawal.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(withdrawal.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Rs {withdrawal.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  withdrawal.status === "completed"
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-amber-100 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {withdrawal.status.charAt(0).toUpperCase() +
                                  withdrawal.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded"
                                onClick={() => openDetailsModal(withdrawal)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-200 flex justify-between items-center">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              <div className="text-sm text-gray-500">Page 1 of 1</div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Withdrawal Modal */}
          {isWithdrawModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 relative">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Request Withdrawal
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter your withdrawal amount and banking information.
                  </p>
                  <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-500"
                    onClick={() => setIsWithdrawModalOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-sm">Rs</span>
                        </div>

                        <input
                          id="amount"
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      {formErrors.amount && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.amount}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Maximum withdrawal: Rs{availableBalance.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-4">
                        Banking Information
                      </h3>
                      <div className="mb-4">
                        <label
                          htmlFor="accountHolderName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Account Holder Name
                        </label>
                        <input
                          id="accountHolderName"
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Enter account holder name"
                          value={accountHolderName}
                          onChange={(e) => setAccountHolderName(e.target.value)}
                        />
                        {formErrors.accountHolderName && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.accountHolderName}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="bankName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Bank Name
                        </label>
                        <input
                          id="bankName"
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Enter the bank name"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                        {formErrors.bankName && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.bankName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="accountNumber"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Account Number
                        </label>
                        <input
                          id="accountNumber"
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="XXXXXXXXXXXX"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        {formErrors.accountNumber && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.accountNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
                      >
                        Confirm Withdrawal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Details Modal */}
          {isDetailsModalOpen && selectedWithdrawal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 relative">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Withdrawal Details
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Details for withdrawal {selectedWithdrawal.id}
                  </p>
                  <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-500"
                    onClick={() => setIsDetailsModalOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">ID</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedWithdrawal.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(selectedWithdrawal.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Amount
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Rs{selectedWithdrawal.amount.toFixed(2)}
                      </p>
                    </div>

                    {selectedWithdrawal.adminFee !== undefined && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Admin Fee (10%)
                        </p>
                        <p className="text-sm font-medium text-red-600">
                          Rs {selectedWithdrawal.adminFee.toFixed(2)}
                        </p>
                      </div>
                    )}

                    {/* 🔼 NEW: Final Payout */}
                    {selectedWithdrawal.payoutAmount !== undefined && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Final Payout
                        </p>
                        <p className="text-sm font-bold text-emerald-700">
                          Rs {selectedWithdrawal.payoutAmount.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedWithdrawal.status === "completed"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {selectedWithdrawal.status.charAt(0).toUpperCase() +
                          selectedWithdrawal.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-gray-200 my-6"></div>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Banking Information
                    </p>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-gray-500">Account Holder:</span>{" "}
                        {selectedWithdrawal.paymentInfo.accountHolderName}
                      </p>
                      <p>
                        <span className="text-gray-500">Bank Name:</span>{" "}
                        {selectedWithdrawal.paymentInfo.bankName}
                      </p>
                      <p>
                        <span className="text-gray-500">Account Number:</span>{" "}
                        {selectedWithdrawal.paymentInfo.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-200 my-6"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Actions
                    </p>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-start px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </button>
                      {selectedWithdrawal.status === "pending" && (
                        <button className="w-full flex items-center justify-start px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                          Cancel Withdrawal
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

