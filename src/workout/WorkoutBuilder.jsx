import React, { useState } from 'react';

/**
 * PBI 3.1: Initial Workout Creation
 * This component allows a gym owner to create an initial workout plan for a client.
 * The owner can enter client info, add exercises (with sets and reps), and save the workout.
 */
function WorkoutBuilder() {

    // STATE: Holds overall workout details
    const [workout, setWorkout] = useState({
        clientName: '',                                  // Stores the name of the client
        date: new Date().toISOString().substring(0, 10), // Defaults to today's date (YYYY-MM-DD format)
        exercises: [],                                   // List of all added exercises
        clusterName: 'Main Lift'                         // Optional category for exercises (not editable in UI yet)
    });

    // STATE: Holds input for one exercise at a time before adding to the list
    const [newExercise, setNewExercise] = useState({
        name: '', // Exercise name (e.g., Bench Press)
        sets: 0,  // Number of sets
        reps: 0,  // Number of reps
    });

    // FUNCTION: Updates workout-level fields like client name or date
    const handleWorkoutChange = (e) => {
        setWorkout({
            ...workout,                  // Keep existing fields
            [e.target.name]: e.target.value // Dynamically update the changed field
        });
    };

    // FUNCTION: Handles input changes for a single exercise
    const handleExerciseChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = value;

        if (type === 'number') {
            // Ensure numerical input is properly handled
            // If input is empty, default to 0 to prevent NaN errors
            newValue = value === '' ? 0 : parseInt(value);

            // Double-check for NaN in case of invalid input
            if (isNaN(newValue)) {
                newValue = 0;
            }
        }

        // Update the specific exercise input field
        setNewExercise({
            ...newExercise,
            [name]: newValue
        });
    };

    // FUNCTION: Adds the current exercise to the workout plan
    const handleAddExercise = () => {
        // Only add exercises that have valid name, sets, and reps
        if (newExercise.name && newExercise.sets > 0 && newExercise.reps > 0) {
            setWorkout({
                ...workout,
                exercises: [...workout.exercises, newExercise] // Append new exercise to the list
            });
            // Reset the newExercise input fields
            setNewExercise({ name: '', sets: 0, reps: 0 });
        } else {
            alert('Please enter a valid exercise name, sets, and reps (greater than 0).');
        }
    };

    // FUNCTION: Validates and saves the entire workout
    const handleSaveWorkout = (e) => {
        e.preventDefault(); // Prevents page reload on form submit

        // Validate that a client name and at least one exercise are entered
        if (workout.exercises.length === 0 || !workout.clientName) {
            alert('Please enter a client name and add at least one exercise before saving.');
            return;
        }

        // Log output for debugging or verification
        console.log('--- PBI 3.1: SAVING INITIAL WORKOUT ---');
        console.log(`Client: ${workout.clientName}, Date: ${workout.date}`);
        console.log(JSON.stringify(workout, null, 2));

        // Display confirmation message to user
        alert(`Workout saved for ${workout.clientName} with ${workout.exercises.length} exercises!`);

        // Reset the entire workout form for a new entry
        setWorkout({
            clientName: '',
            date: new Date().toISOString().substring(0, 10),
            exercises: [],
            clusterName: 'Main Lift'
        });
    };

    // RENDER: Returns the entire UI for the Workout Builder form
    return (
        <div 
            className="workout-builder" 
            style={{ 
                maxWidth: '600px', 
                margin: '0 auto', 
                padding: '20px', 
                border: '1px solid #ccc', 
                borderRadius: '8px' 
            }}
        >
            <h2>Initial Workout Creation</h2>

            {/* The form wraps all workout and exercise inputs */}
            <form onSubmit={handleSaveWorkout}>

                {/* -------- CLIENT INFO SECTION -------- */}
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

                {/* -------- ADD EXERCISE SECTION -------- */}
                <hr style={{ margin: '20px 0' }} />
                <h3>Add Exercise</h3>

                {/* Inline grid layout for adding exercise details */}
                <div 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '2fr 1fr 1fr 0.5fr', 
                        gap: '10px', 
                        alignItems: 'flex-end', 
                        marginBottom: '15px' 
                    }}
                >
                    {/* Exercise name input */}
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

                    {/* Sets input */}
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

                    {/* Reps input */}
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

                    {/* Button to add current exercise to workout */}
                    <button 
                        type="button" 
                        onClick={handleAddExercise} 
                        style={{ padding: '8px 15px', height: '35px' }}
                    >
                        + Add
                    </button>
                </div>

                {/* -------- DISPLAY CURRENT WORKOUT -------- */}
                <hr style={{ margin: '20px 0' }} />
                <h3>Current Workout Plan ({workout.exercises.length} Exercises)</h3>

                {/* Conditional rendering: show message or list */}
                {workout.exercises.length === 0 ? (
                    <p style={{ fontStyle: 'italic' }}>
                        No exercises added yet. Use the form above to build the plan.
                    </p>
                ) : (
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {workout.exercises.map((ex, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                <strong>{ex.name}</strong>: {ex.sets} sets of {ex.reps} reps
                            </li>
                        ))}
                    </ul>
                )}

                {/* -------- FINAL SAVE BUTTON -------- */}
                <button 
                    type="submit" 
                    style={{ 
                        marginTop: '30px', 
                        padding: '10px 20px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer', 
                        borderRadius: '5px' 
                    }}
                >
                    Save Final Workout
                </button>
            </form>
        </div>
    );
}

export default WorkoutBuilder;
