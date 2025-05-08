import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockPayments = [
      { id: "1", student: "Alice Brown", type: "Session Payment", amount: "$75.00", date: "Mar 15, 2024", status: "Completed" },
      { id: "2", student: "James Wilson", type: "Monthly Package", amount: "$120.00", date: "Mar 14, 2024", status: "Completed" },
      { id: "3", student: "Emma Davis", type: "Session Payment", amount: "$60.00", date: "Mar 13, 2024", status: "Pending" }
    ];

    setTimeout(() => {
      setPayments(mockPayments);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Payments</h2>
        <button className="text-sm text-blue-600 hover:underline font-medium">
          View All Transactions
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading payment data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="text-left px-5 py-3">Student</th>
                <th className="text-left px-5 py-3">Type</th>
                <th className="text-left px-5 py-3">Amount</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-5 py-4 font-medium text-gray-900">{payment.student}</td>
                  <td className="px-5 py-4 text-gray-700">{payment.type}</td>
                  <td className="px-5 py-4 text-gray-700">{payment.amount}</td>
                  <td className="px-5 py-4 text-gray-700">{payment.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
