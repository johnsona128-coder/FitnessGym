// src/WorkoutBuilder.jsx

import React, { useState } from 'react';

/**
 * PBI 3.1: Initial Workout Creation
 * A component for the Gym Owner to build a new workout plan for a client.
 */
function WorkoutBuilder() {
    // State for the overall workout details
    const [workout, setWorkout] = useState({
        clientName: '',
        date: new Date().toISOString().substring(0, 10), 
        exercises: [],
        clusterName: 'Main Lift'
    });

    // State for a single exercise input field
    const [newExercise, setNewExercise] = useState({
        name: '',
        sets: 0,
        reps: 0,
    });

    const handleWorkoutChange = (e) => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        });
    };
    
    const handleExerciseChange = (e) => {
        setNewExercise({
            ...newExercise,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        });
    };

    // Placeholder for the remaining handlers
    const handleAddExercise = () => {};
    const handleSaveWorkout = () => {};

    return (
        <div className="workout-builder">
            <h2>Initial Workout Creation</h2>
            {/* Form and UI will be added in subsequent commits */}
            <p>Component is ready to build the UI and logic.</p>
        </div>
    );
}

export default WorkoutBuilder;