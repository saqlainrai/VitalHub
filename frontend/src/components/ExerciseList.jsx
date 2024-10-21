import React from 'react';
import ProgressBar from './ProgressBar'; // Make sure to import your ProgressBar component

const ExerciseList = () => {
    // Define an array of exercises
    const exercises = [
        { name: 'Push-ups', progressValue: 25, totalValue: 50, color: '#76c7c0' },
        { name: 'Sprints', progressValue: 50, totalValue: 70, color: '#768423' },
        { name: 'Squats', progressValue: 15, totalValue: 40, color: '#ff5733' },
        // Add more exercises as needed
    ];

    return (
        <div className="calories">
            {exercises.map((exercise, index) => (
                <div className="row" key={index}>
                    <p>{exercise.name}</p>
                    <ProgressBar props = {exercise} />
                </div>
            ))}
        </div>
    );
};

export default ExerciseList;
