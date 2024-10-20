import React, { useState } from "react";
import ExpensesNav from "../components/Expenses/ExpensesNav";
import ExpenseFormModal from "../components/Expenses/ExpensesForm";
import ExpensesMain from "../components/Expenses/ExpensesMain"; // Import ExpensesMain
import Reports from "../components/Expenses/Reports";
import Advices from "../components/Expenses/Advices"; 
import ExpensesManage from "../components/Expenses/ExpenseManage";

const ExpensesDashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState("ExpensesMain"); // Track which component to show

  const handleCloseForm = () => {
    setIsFormVisible(false); // Hide the form
  };

  const handleFormSubmit = (expenseData) => {
    console.log("Expense Submitted:", expenseData);
    setIsFormVisible(false); // Hide the form on submit
  };

  // Function to switch components based on navbar clicks
  const renderComponent = () => {
    switch (activeComponent) {
      case "ExpensesMain":
        return (
          <ExpensesMain onAddExpenseClick={() => setIsFormVisible(true)} />
        );
      case "Reports":
        return <Reports />; // Placeholder for the Reports component

      case "ExpenseManage":
        return <ExpensesManage />;
      case "Advices":
        return <Advices />; // Placeholder for the Advices component
      default:
        return (
          <ExpensesMain onAddExpenseClick={() => setIsFormVisible(true)} />
        ); // Default component
    }
  };

  return (
    <div>
      <ExpensesNav setActiveComponent={setActiveComponent} />
      <div className="container mx-auto p-4">
        {renderComponent()}{" "}
        {/* Dynamically render the component below the navbar */}
      </div>
      <ExpenseFormModal
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ExpensesDashboard;
