// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import BMI from './components/BMI'
import './style.css'

const App = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ display: 'flex' }}>
                {/* <Sidebar /> */}
                {/* <main style={{ flexGrow: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/reports" element={<Reports />} />
                    </Routes>
                </main> */}
                <div className='parent'>
                    <div className="left">
                        <div className="calories"></div>
                        <div className="exercise"></div>
                    </div>
                    <div className="right"><BMI /></div>
                </div>
            </div>
        </Router>
    );
};

export default App;
