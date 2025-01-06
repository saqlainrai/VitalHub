import React, { useState } from "react";
import "./AddExpense.css";
import axios from "axios";

const AddExpense = ({ categories }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    expenseType: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If category is not the default (empty string), record and send it
    if (formData.category !== "") {
      // Include any additional data you need to send
      const additionalData = {
        categoryOther: formData.category, // Change 'categoryOther' to your relevant field name
      };

      axios
        .post("http://127.0.0.1:5000/data", { ...formData, ...additionalData })
        .then((result) => {
          console.log("Server Response:", result.data);
          alert("Expense added successfully!");
          setFormData({
            amount: "",
            category: "",
            description: "",
            expenseType: "",
            date: "",
          });
        })
        .catch((err) => {
          console.error("Error submitting data:", err);
          alert("Failed to add expense. Please check the input or try again.");
        });
    } else {
      // If category is the default, just send the basic form data
      axios
        .post("http://127.0.0.1:5000/data", formData)
        .then((result) => {
          console.log("Server Response:", result.data);
          alert("Expense added successfully!");
          setFormData({
            amount: "",
            category: "",
            description: "",
            expenseType: "",
            date: "",
          });
        })
        .catch((err) => {
          console.error("Error submitting data:", err);
          alert("Failed to add expense. Please check the input or try again.");
        });
    }
};


  const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 1); 
  return (
    <div className="add-expense">
      <div className="container mt-4">
        <h2>Add Expense</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Amount */}
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option value={category} key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a brief description"
                  maxLength="200"
                ></textarea>
              </div>

              {/* Expense Type */}
              <div className="mb-3">
                <label className="form-label">Expense Type</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="expenseType"
                      id="expense"
                      value="expense"
                      checked={formData.expenseType === "expense"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="expense">
                      Expense
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="expenseType"
                      id="income"
                      value="income"
                      checked={formData.expenseType === "income"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="income">
                      Income
                    </label>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                 type="date"
                 className="form-control"
                 id="date"
                 name="date"
                 value={formData.date}
                 onChange={handleChange}
                 required
                 min={minDate.toISOString().split("T")[0]} // Restrict date to within one year from today Restrict date to today or future
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Add Expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
