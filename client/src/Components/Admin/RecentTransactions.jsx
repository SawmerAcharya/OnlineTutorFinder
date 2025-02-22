import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const transactions = [
  { id: "#TR123", date: "2024-03-15", description: "Session Payment", status: "Completed", amount: 120 },
  { id: "#TR122", date: "2024-03-15", description: "Session Payment", status: "Pending", amount: 85 },
  { id: "#TR121", date: "2024-03-14", description: "Session Payment", status: "Completed", amount: 150 }
];

function RecentTransactions() {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <FiChevronDown className="text-gray-400" />
      </div>
      <div>
        {transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div>
              <p className="text-sm font-semibold">{transaction.id}</p>
              <p className="text-xs text-gray-500">{transaction.date} · {transaction.description}</p>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${transaction.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                {transaction.status}
              </span>
              <span className="ml-4 font-semibold">${transaction.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
