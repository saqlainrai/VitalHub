import React, { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UpdateForm.css";
import "./ExpenseList.css";
import axios from "axios";

const ExpenseList = ({ setTotalIncome, setTotalExpense, setWeeklyData, setCategoryTotals }) => {
  const [expenses, setExpenses] = useState([]);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    expenseType: "",
    date: "",
  });
  const [categoryLimits, setCategoryLimits] = useState({});

  useEffect(() => {
    // Fetch expenses from the backend
    axios.get("/api/expenses/expenses")
      .then((response) => {
        const fetchedExpenses = response.data;
        setExpenses(fetchedExpenses);
        setSortedExpenses(fetchedExpenses);
        calculateTotal(fetchedExpenses);
        calculateWeeklyData(fetchedExpenses);
        setCategoryTotals(calculateCategoryTotals(fetchedExpenses));
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });

    // Fetch category limits from the backend
    axios.get("/api/expenses/budget")
      .then((response) => {
        setCategoryLimits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category limits:", error);
      });
  }, [setCategoryTotals]);

  const calculateTotal = (expenses) => {
    let income = 0;
    let expense = 0;

    expenses.forEach((item) => {
      if (item.expenseType === "income") {
        income += item.amount;
      } else if (item.expenseType === "expense") {
        expense += item.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  };

  const calculateWeeklyData = (data) => {
    const weeklyData = {};

    data.forEach((expense) => {
      const week = getWeek(new Date(expense.date));
      if (!weeklyData[week]) {
        weeklyData[week] = { income: 0, expense: 0 };
      }

      if (expense.expenseType === "income") {
        weeklyData[week].income += expense.amount;
      } else {
        weeklyData[week].expense += expense.amount;
      }
    });

    setWeeklyData(weeklyData);
  };

  const getWeek = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
  };

  const calculateCategoryTotals = (expensesList) => {
    const categoryTotals = {};
    expensesList.forEach((expense) => {
      if (expense.expenseType === "expense") {
        if (!categoryTotals[expense.category]) {
          categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
      }
    });
    return categoryTotals;
  };

  const sortByAmount = () => {
    const sorted = [...sortedExpenses].sort((a, b) => a.amount - b.amount);
    setSortedExpenses(sorted);
  };

  const sortByExpenseType = () => {
    const sorted = [...sortedExpenses].sort((a, b) =>
      a.expenseType.localeCompare(b.expenseType)
    );
    setSortedExpenses(sorted);
  };

  const handleSearch = () => {
    if (searchDate) {
      const formattedSearchDate = new Date(searchDate).toISOString().split("T")[0];
      const filtered = expenses.filter((expense) => {
        const formattedExpenseDate = new Date(expense.date).toISOString().split("T")[0];
        return formattedExpenseDate === formattedSearchDate;
      });
      setSortedExpenses(filtered);
    } else {
      setSortedExpenses(expenses);
    }
  };

  const handleRefresh = () => {
    setSearchDate("");
    setSortedExpenses(expenses);
    alert("All expenses refreshed.");
  };

  const handleDelete = (id) => {
    axios.delete(`/api/expenses/expenses/${id}`)
      .then(() => {
        const updatedExpenses = expenses.filter((expense) => expense._id !== id);
        setExpenses(updatedExpenses);
        setSortedExpenses(updatedExpenses);
        calculateTotal(updatedExpenses);
        alert("Expense deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense.");
      });
  };

  const handleUpdate = (id) => {
    const expenseToUpdate = expenses.find((expense) => expense._id === id);
    if (expenseToUpdate) {
      setEditingExpense(expenseToUpdate);
      setFormData({
        amount: expenseToUpdate.amount,
        category: expenseToUpdate.category,
        description: expenseToUpdate.description,
        expenseType: expenseToUpdate.expenseType,
        date: new Date(expenseToUpdate.date).toISOString().split("T")[0],
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      axios.put(`/api/expenses/expenses/${editingExpense._id}`, formData)
        .then((response) => {
          const updatedExpenses = expenses.map((expense) =>
            expense._id === editingExpense._id ? response.data : expense
          );
          setExpenses(updatedExpenses);
          setSortedExpenses(updatedExpenses);
          calculateTotal(updatedExpenses);
          setEditingExpense(null);
          setFormData({
            amount: "",
            category: "",
            description: "",
            expenseType: "",
            date: "",
          });
          alert("Expense updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating expense:", error);
          alert("Failed to update expense.");
        });
    }
  };

  return (
    <div className="expense-list">
    <div className="container mt-4">
      <h1 className="text-center mb-4">Expense List</h1>
      <div className="d-flex justify-content-between mb-3 flex-wrap">
        <div>
          <button className="btn btn-primary me-2 mb-2 mb-md-0" onClick={sortByAmount}>
            Sort by Amount
          </button>
          <button className="btn btn-secondary mb-2 mb-md-0" onClick={sortByExpenseType}>
            Sort by Expense Type
          </button>
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="searchDate" className="form-label me-2">Date:</label>
          <input
            type="date"
            id="searchDate"
            className="form-control me-2 mb-2 mb-md-0"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button className="btn btn-info mb-2 mb-md-0" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-warning ms-2 mb-2 mb-md-0" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Expense Type</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense, index) => (
              <tr key={expense._id || index}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.expenseType}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <FaEdit onClick={() => handleUpdate(expense._id)} />
                </td>
                <td>
                  <FaTrash onClick={() => handleDelete(expense._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingExpense && (
        <div className="edit-form mt-4">
          <h2>Edit Expense</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expenseType" className="form-label">Expense Type</label>
              <input
                type="text"
                id="expenseType"
                name="expenseType"
                className="form-control"
                value={formData.expenseType}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingExpense(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  </div>
// </div>
  );
};  
export default ExpenseList;
