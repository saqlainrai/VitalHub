import { useState } from "react";

const ExpensesManage = () => {
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
      date: "2024-10-10",
      amount: 200,
      type: "Expense",
      category: "Bills",
      reference: "EXP003",
    },
    // Add more transactions as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  // Filtered transactions based on search term and category
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.reference
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? transaction.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-5">
      {/* Search Box and Filters */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between">
        <input
          type="text"
          placeholder="Search by reference"
          className="border border-gray-300 rounded p-2 mb-2 md:mb-0 md:mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Groceries">Groceries</option>
          <option value="Bills">Bills</option>
          {/* Add more categories as needed */}
        </select>
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
            {filteredTransactions.map((transaction) => (
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

export default ExpensesManage;
