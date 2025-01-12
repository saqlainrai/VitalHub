import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import NavbarMain from "./components/NavbarMain.jsx";
import Home from "./pages/Home.jsx"; // Import the Home page
import Login from "../src/components/Login.jsx"; // Import the Login page
import FoodDashboard from "./pages/FoodDashboard.jsx"; // Import the Login page
// import App from './App.jsx'
import FitnessDashboard from './pages/FitnessDashboard.jsx'
import ExerciseDetails from "./pages/ExerciseDetails.jsx"; // Import the Exercise Details page
import Expenses from "./pages/Expenses.jsx"; // Import the Expenses page
import Welcome from "./components/WelcomeFoodFitness.jsx"; // Import the Welcome screen
import FoodForm from "./components/CaloriesRequirmentForm.jsx"; // Import the food form
import Footer from "./components/Footer.jsx"; // Import the footer
import FoodTimeTable from "./pages/FoodTimeTable.jsx";
import ExpensesDashboard from "./pages/ExpensesDashboard.jsx";
import PasswordDashboard from "./pages/PasswordDashboard.jsx"
import SignUp from "./components/signup.jsx";
import useAuth from './hooks/useAuth.jsx'
import NotFound from './components/NotFound.jsx'
import './style.css'
import "./index.css";


const App = () => {
    const { isLoggedIn, user, revalidate } = useAuth();

    return (
        <Router>
            <NavbarMain isLoggedIn={isLoggedIn} user={user} revalidate={revalidate} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={revalidate} />} /> 
                <Route path="/signup" element={<SignUp onSignUp={revalidate} />} />
                <Route path="/welcome" element={isLoggedIn ? <Welcome /> : <NotFound />} />
                <Route path="/fitness" element={isLoggedIn ? <FitnessDashboard /> : <NotFound />} />
                <Route path="/FoodForm" element={isLoggedIn ? <FoodForm /> : <NotFound />} />
                <Route path="/FoodDashBoard" element={isLoggedIn ? <FoodDashboard /> : <NotFound />} />
                <Route path="/FoodTimeTable" element={isLoggedIn ? <FoodTimeTable /> : <NotFound />} />
                <Route path="/passwords" element={isLoggedIn ? <PasswordDashboard /> : <NotFound />} />
                <Route path="/ExpensesDashboard" element={isLoggedIn ? <Expenses /> : <NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};


export default App;