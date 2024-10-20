import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import NavbarMain from "./components/NavbarMain.jsx";
import Home from "./pages/Home.jsx"; // Import the Home page
import Login from "./pages/LoginPage.jsx"; // Import the Login page
import FoodDashboard from "./pages/FoodDashboard.jsx"; // Import the Login page


import Welcome from "./components/WelcomeFoodFitness.jsx"; // Import the Welcome screen
import FoodForm from "./components/CaloriesRequirmentForm.jsx"; // Import the food form
import "./index.css";
import Footer from "./components/Footer.jsx"; // Import the footer
import FoodTimeTable from "./pages/FoodTimeTable.jsx";
import ExpensesDashboard from "./pages/ExpensesDashboard.jsx";

// Render the application with routing
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <NavbarMain /> {/* Navbar that will persist across all pages */}
      {/* Define the Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/welcome" element={<Welcome />} />{" "}
        {/* Welcome screen route */}
        <Route path="/FoodForm" element={<FoodForm />} />
        <Route path="/FoodDashBoard" element={<FoodDashboard />} />
        <Route path="/FoodTimeTable" element={<FoodTimeTable />} />
        <Route path="/ExpensesDashboard" element={<ExpensesDashboard />}
        
        />{" "}
        {/* Food form route */}
      </Routes>
      <Footer /> {/* Footer placed outside the Routes */}
    </Router>
  </StrictMode>
);
