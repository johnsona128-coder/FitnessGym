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

    const handleAddExercise = () => {
        if (newExercise.name && newExercise.sets > 0 && newExercise.reps > 0) {
            setWorkout({
                ...workout,
                exercises: [...workout.exercises, newExercise]
            });
            setNewExercise({ name: '', sets: 0, reps: 0 });
        } else {
            alert('Please enter a valid exercise name, sets, and reps (greater than 0).');
        }
    };

    // Placeholder for the remaining handler
    const handleSaveWorkout = (e) => { 
        e.preventDefault(); 
        alert('Save function not fully implemented yet.');
    };

    return (
        <div className="workout-builder" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Initial Workout Creation 🏋️‍♀️</h2>
            <form onSubmit={handleSaveWorkout}>
                
                {/* Workout Metadata Section */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Client Name:</label>
                    <input
                        type="text"
                        name="clientName"
                        value={workout.clientName}
                        onChange={handleWorkoutChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Workout Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={workout.date}
                        onChange={handleWorkoutChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Add Exercise Section */}
                <hr style={{ margin: '20px 0' }} />
                <h3>Add Exercise </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '10px', alignItems: 'flex-end', marginBottom: '15px' }}>
                    
                    <div>
                        <label style={{ display: 'block' }}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newExercise.name}
                            onChange={handleExerciseChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block' }}>Sets:</label>
                        <input
                            type="number"
                            name="sets"
                            value={newExercise.sets}
                            onChange={handleExerciseChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block' }}>Reps:</label>
                        <input
                            type="number"
                            name="reps"
                            value={newExercise.reps}
                            onChange={handleExerciseChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    
                    <button type="button" onClick={handleAddExercise} style={{ padding: '8px 15px', height: '35px' }}>
                        + Add
                    </button>
                </div>

                {/* Workout Plan Display Section */}
                <hr style={{ margin: '20px 0' }} />
                <h3>Current Workout Plan ({workout.exercises.length} Exercises)</h3>
                {workout.exercises.length === 0 ? (
                    <p style={{ fontStyle: 'italic' }}>No exercises added yet. Use the form above to build the plan.</p>
                ) : (
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {workout.exercises.map((ex, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                <strong>{ex.name}</strong>: {ex.sets} sets of {ex.reps} reps
                            </li>
                        ))}
                    </ul>
                )}
                
                {/* Final Save Button */}
                <button 
                    type="submit" 
                    style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
                >
                    Save Final Workout
                </button>
            </form>
        </div>
    );
}

export default WorkoutBuilder;