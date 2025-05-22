import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import Sidebar from "./Slidebar";
import NavBar from "./NavBar/NavBar";
import { Wallet } from "lucide-react";

export default function AdminPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/user/admin/all",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setPayments(res.data.history);
        }
      } catch (err) {
        console.error("Error fetching admin payment history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const studentName = payment.senderId?.name?.toLowerCase() || "";
    const tutorName = payment.receipientId?.name?.toLowerCase() || "";
    return (
      studentName.includes(searchTerm.toLowerCase()) ||
      tutorName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar setSearchTerm={setSearchTerm} />
        <div className="p-6 bg-gray-100 flex-grow overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Admin Payment History</h2>

          {loading ? (
            <p className="text-gray-500">Loading payment history...</p>
          ) : filteredPayments.length === 0 ? (
            <div className="flex flex-col items-center mt-10 text-gray-500">
              <Wallet className="w-10 h-10 mb-2" />
              <p>No payment history found</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-100">
                  <tr>
                    <th className="py-3 px-6">Student</th>
                    <th className="py-3 px-6">Tutor</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Booking Status</th>
                    <th className="py-3 px-6">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment._id} className="border-b bg-white">
                      <td className="py-4 px-6">
                        {payment.senderId?.name || "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        {payment.receipientId?.name || "N/A"}
                      </td>
                      <td className="py-4 px-6">Rs. {payment.amount}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full
      ${
        payment.bookingId?.status ===
        "payment-received-awaiting-tutor-confirmation"
          ? "bg-yellow-50 text-yellow-800 border border-yellow-300"
          : payment.bookingId?.status === "payment-received-and-tutor-confirmed"
          ? "bg-green-50 text-green-800 border border-green-300"
          : payment.bookingId?.status ===
            "booking-completed-and-awaiting-student-confirmation"
          ? "bg-blue-50 text-blue-800 border border-blue-300"
          : payment.bookingId?.status === "refunded-and-cancelled"
          ? "bg-red-50 text-red-800 border border-red-300"
          : "bg-gray-50 text-gray-800 border border-gray-300"
      }`}
                        >
                          {payment.bookingId?.status?.replace(/-/g, " ") ||
                            "N/A"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        {payment.createdAt
                          ? DateTime.fromISO(payment.createdAt).toLocaleString(
                              DateTime.DATE_MED
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}