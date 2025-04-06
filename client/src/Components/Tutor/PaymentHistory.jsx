import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock payment data
    const mockPayments = [
      { id: "1", student: "Alice Brown", type: "Session Payment", amount: "$75.00", date: "Mar 15, 2024", status: "Completed" },
      { id: "2", student: "James Wilson", type: "Monthly Package", amount: "$120.00", date: "Mar 14, 2024", status: "Completed" },
      { id: "3", student: "Emma Davis", type: "Session Payment", amount: "$60.00", date: "Mar 13, 2024", status: "Pending" }
    ];
    
    setTimeout(() => {
      setPayments(mockPayments);
      setLoading(false);
     
    }, 1000); // Simulating a delay for fetching data
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Payment History</h3>
        <button className="text-blue-500 hover:text-blue-600">View All Transactions</button>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading payments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Student</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="bg-white border-b">
                  <td className="py-4 px-6 font-medium text-gray-900">{payment.student}</td>
                  <td className="py-4 px-6">{payment.type}</td>
                  <td className="py-4 px-6">{payment.amount}</td>
                  <td className="py-4 px-6">{payment.date}</td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${payment.status === "Completed" ? "text-green-600" : "text-yellow-500"}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
