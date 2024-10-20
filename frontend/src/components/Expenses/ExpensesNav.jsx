import React from "react";

const ExpensesNav = ({ setActiveComponent }) => {
  const handleNavigation = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <nav className="bg-slate-50 text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">ExpenseManage</div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a
            onClick={() => handleNavigation("ExpensesMain")}
            className="cursor-pointer hover:text-gray-400"
          >
            Dashboard
          </a>
          <a
            onClick={() => handleNavigation("ExpenseManage")}
            className="cursor-pointer hover:text-gray-400"
          >
            Expense Manage
          </a>
          <a
            onClick={() => handleNavigation("Reports")}
            className="cursor-pointer hover:text-gray-400"
          >
            Reports
          </a>
          <a
            onClick={() => handleNavigation("Advices")}
            className="cursor-pointer hover:text-gray-400"
          >
            Advices
          </a>
        </div>

        {/* Right-side Button */}
        <div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setActiveComponent("ExpenseForm")}
          >
            Add Expense
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ExpensesNav;
