import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-200 sticky top-0 text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-semibold cursor-pointer">
          ExpenseManage
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a href="#" className="hover:text-gray-600">
            Dashboard
          </a>
          <a href="#" className="hover:text-gray-600">
            Expense Manage
          </a>
          <a href="#" className="hover:text-gray-600">
            Reports
          </a>
          <a href="#" className="hover:text-gray-600">
            Advices
          </a>
        </div>

        {/* Right-side Button */}
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Expense
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
