import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./Analytics.css";

const Analytics = ({ totalIncome, totalExpense, weeklyData }) => {
  const weeks = Object.keys(weeklyData);
  const incomeData = weeks.map((week) => weeklyData[week].income);
  const expenseData = weeks.map((week) => weeklyData[week].expense);

  const chartDataBar = {
    labels: weeks,  // Weekly labels
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartDataLine = {
    labels: weeks,  // Weekly labels
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: true,  // Makes the chart an area chart
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: true,  // Makes the chart an area chart
      },
    ],
  };

  // Pie chart data
  const chartDataPie = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h3>Analytics Page</h3>

      {/* Display Total Income, Expense, and Saving in Beautiful Boxes */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Total Income</h5>
                <p className="card-text fs-3 fw-bold text-success">${totalIncome}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Total Expense</h5>
                <p className="card-text fs-3 fw-bold text-danger">${totalExpense}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Saving</h5>
                <p className="card-text fs-3 fw-bold text-primary">${totalIncome - totalExpense}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="chart">
        <h4>Weekly Income and Expenses - Bar Chart</h4>
        <Bar data={chartDataBar} />
      </div>

      {/* Area Chart */}
      <div className="chart">
        <hr />
        <h4>Weekly Income and Expenses - Area Chart</h4>
        <Line data={chartDataLine} />
      </div>

      {/* Pie Chart */}
      <div className="chart">
        <hr />
        <h4>Income vs Expense - Pie Chart</h4>
        <Pie data={chartDataPie} />
      </div>
    </div>
  );
};

export default Analytics;
