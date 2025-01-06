import React, { useState } from "react";
// import styles from "./Expenses.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Dashboard from "./pages/Dashborad";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const App = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [weeklyData, setWeeklyData] = useState({});
    const [expenses, setExpenses] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({});
    const [categories, setCategories] = useState([
        "salary",
        "education",
        "project",
        "food",
        "bills",
        "medical",
        "fee",
        "tax",
        "other",
    ]);

    const [activeComponent, setActiveComponent] = useState("Dashboard"); // Track active component

    const renderComponent = () => {
        switch (activeComponent) {
            case "Dashboard":
                return (
                    <Dashboard
                        totalIncome={totalIncome}
                        totalExpense={totalExpense}
                        categoryTotals={categoryTotals}
                    />
                );
            case "Add Expense":
                return <AddExpense categories={categories} />;
            case "Expense List":
                return (
                    <ExpenseList
                        setTotalIncome={setTotalIncome}
                        setTotalExpense={setTotalExpense}
                        setWeeklyData={setWeeklyData}
                        setCategoryTotals={setCategoryTotals}
                    />
                );
            case "Analytics":
                return (
                    <Analytics
                        totalIncome={totalIncome}
                        totalExpense={totalExpense}
                        weeklyData={weeklyData}
                    />
                );
            case "Settings":
                return (
                    <Settings
                        categories={categories}
                        setCategories={setCategories}
                        categoryTotals={categoryTotals}
                    />
                );
            default:
                return (
                    <Dashboard
                        totalIncome={totalIncome}
                        totalExpense={totalExpense}
                        categoryTotals={categoryTotals}
                    />
                );
        }
    };

    return (
        <div>
            <Navbar setActiveComponent={setActiveComponent} />
            <div className="container mt-4">{renderComponent()}</div>
        </div>
    );
};

export default App;
