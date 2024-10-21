import { useState } from "react";

const ExpensesMain = () => {
  // State for income and expenses
  const [income, setIncome] = useState(5000); // Dynamically update this based on your logic
  const [expenses, setExpenses] = useState(2000); // Dynamically update this based on your logic

  // Example transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2024-10-01",
      amount: 150,
      type: "Income",
      category: "Salary",
      reference: "INV001",
    },
    {
      id: 2,
      date: "2024-10-05",
      amount: 50,
      type: "Expense",
      category: "Groceries",
      reference: "EXP002",
    },
    {
      id: 3,
      date: "2024-10-01",
      amount: 150,
      type: "Income",
      category: "Salary",
      reference: "INV001",
    },
    {
      id: 4,
      date: "2024-10-05",
      amount: 50,
      type: "Expense",
      category: "Groceries",
      reference: "EXP002",
    },
    {
      id: 5,
      date: "2024-10-01",
      amount: 150,
      type: "Income",
      category: "Salary",
      reference: "INV001",
    },
    {
      id: 6,
      date: "2024-10-05",
      amount: 50,
      type: "Expense",
      category: "Groceries",
      reference: "EXP002",
    },
    {
      id: 7,
      date: "2024-10-01",
      amount: 150,
      type: "Income",
      category: "Salary",
      reference: "INV001",
    },
    {
      id: 8,
      date: "2024-10-05",
      amount: 50,
      type: "Expense",
      category: "Groceries",
      reference: "EXP002",
    },
  ]);

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  // Function to update a transaction (Placeholder, you can expand this)
  const updateTransaction = (id) => {
    alert(`Update transaction with ID: ${id}`);
  };

  return (
    <div className="p-5">
      {/* Labels for Income and Expenses */}
      <div className="flex justify-around mb-6">
        <div className="text-center">
          <label className="block text-xl font-bold">Income</label>
          <p className="text-2xl text-green-500 font-semibold">${income}</p>
        </div>
        <div className="text-center">
          <label className="block text-xl font-bold">Expenses</label>
          <p className="text-2xl text-red-500 font-semibold">${expenses}</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Reference</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{transaction.date}</td>
                <td className="py-3 px-6 text-left">${transaction.amount}</td>
                <td className="py-3 px-6 text-left">{transaction.type}</td>
                <td className="py-3 px-6 text-left">{transaction.category}</td>
                <td className="py-3 px-6 text-left">{transaction.reference}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => updateTransaction(transaction.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesMain;
