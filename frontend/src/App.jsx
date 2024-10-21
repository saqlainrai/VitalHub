// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import BMI from './components/BMI'
import ApexChartArea from './components/ApexChartArea';
import ApexChartBar from './components/ApexChartBar';
import './style.css'

const App = () => {
    return (
        <>
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
                        <div className="calories"><ApexChartArea/></div>
                        <div className="exercise"><ApexChartBar/></div>
                    </div>
                    <div className="right"><BMI /></div>
                </div>
            </div>
        </>
    );
};

export default App;
