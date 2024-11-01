// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import BMI from './components/BMI'
import ApexChartArea from './components/ApexChartArea';
import ApexChartBar from './components/ApexChartBar';
import ProgressBar from './components/ProgressBar';
import ExerciseList from './components/ExerciseList';
import './style.css'

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let d = [
        {
            name: "Push-ups",
            progressValue: 0,
            totalValue: 50
        },
        {
            name: "Sit-ups",
            progressValue: 0,
            totalValue: 50
        },
        {
            name: "Squats",
            progressValue: 0,
            totalValue: 50
        },
        {
            name: "Pull-ups",
            progressValue: 0,
            totalValue: 50
        },
        {
            name: "Sprints",
            progressValue: 0,
            totalValue: 50
        }
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/user/stats?id=1`);
                if (!response.ok) {
                    // throw new Error('Network response was not ok');
                    setData(d);
                }
                else {
                    const jsonData = await response.json();
                    setData(jsonData);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        <div className="exercise"><ApexChartArea /></div>
                        <div className="calories">
                            <ExerciseList data={data} />
                        </div>
                    </div>
                    <div className="right"><BMI /></div>
                </div>
            </div>
        </>
    );
};

export default App;
