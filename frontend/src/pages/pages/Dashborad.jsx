import React from "react";
import { FaMoneyBillWave, FaChartPie, FaClipboardList, FaWallet } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import 'chart.js/auto'; // Import all chart.js components
// import "./Dashboard.css"; // Optional custom styles

const Dashboard = ({ totalIncome, totalExpense, categoryTotals }) => {
  const remainingBudget = totalIncome - totalExpense;

  // Transform categoryTotals into data for the bar chart
  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: data,
        backgroundColor: ['#56CCF2', '#2F80ED', '#53E88B', '#EE5253'], // Customize colors
        borderColor: ['#56CCF2', '#2F80ED', '#53E88B', '#EE5253'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Income', 'Expense', 'Remaining Budget'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [totalIncome, totalExpense, remainingBudget],
        fill: false,
        backgroundColor: '#FF5733',
        borderColor: '#FF5733',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Dashboard</h1>

        {/* Overview Cards */}
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card text-white shadow-sm" style={{ background: "linear-gradient(to right, #56CCF2, #2F80ED)" }}>
              <div className="card-body">
                <h5 className="card-title">Total Expenses</h5>
                <p className="card-text fs-4">${totalExpense}</p>
                <FaMoneyBillWave className="dashboard-icon" />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white shadow-sm" style={{ background: "linear-gradient(to right, #56CCF2, #2F80ED)" }}>
              <div className="card-body">
                <h5 className="card-title">Total Income</h5>
                <p className="card-text fs-4">${totalIncome}</p>
                <FaWallet className="dashboard-icon" />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white shadow-sm" style={{ background: "linear-gradient(to right, #56CCF2, #2F80ED)" }}>
              <div className="card-body">
                <h5 className="card-title">Remaining Budget</h5>
                <p className="card-text fs-4">${remainingBudget}</p>
                <FaWallet className="dashboard-icon" />
              </div>
            </div>
          </div>

          {/* Uncomment if needed */ }
          {/* <div className="col-md-3">
            <div className="card text-white shadow-sm" style={{ background: "linear-gradient(to right, #56CCF2, #2F80ED)" }}>
              <div className="card-body">
                <h5 className="card-title">Highest Category</h5>
                <p className="card-text fs-4">Food</p>
                <FaChartPie className="dashboard-icon" />
              </div>
            </div>
          </div> */}
        </div>



        {/* Charts Section */}
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Spending by Category</h5>
                <Bar data={barChartData} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Monthly Trends</h5>
                <Line data={lineChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
