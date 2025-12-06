import React, { useState } from 'react';

/**
 * PBI 2.1: Assessment Data Entry
 * This component allows a gym owner to record initial assessment information for a new client.
 * It includes validation, submission logic, and a form reset for an efficient workflow.
 */
function ClientAssessment() {

    // STATE: Holds all assessment form data
    // Defined separately to allow for easy resetting later
    const initialAssessmentState = {
        clientName: '',
        fitnessLevel: 'Beginner', // Required dropdown default
        goals: '',                // Required text area
        injuriesConcerns: ''      // Optional text area
    };
    
    const [assessment, setAssessment] = useState(initialAssessmentState);

    // FUNCTION: Updates assessment fields dynamically based on input name
    const handleAssessmentChange = (e) => {
        setAssessment({
            ...assessment,
            [e.target.name]: e.target.value
        });
    };

    // FUNCTION: Validates, saves, displays success message, and resets the form
    const handleSubmitAssessment = (e) => {
        e.preventDefault();

        // VALIDATION (Acceptance Criterion 2): Check for required fields
        if (!assessment.clientName || !assessment.fitnessLevel || !assessment.goals) {
            alert('Validation Failed: Please fill out the Client Name, Fitness Level, and Goals fields before saving.');
            return;
        }

        // --- Simulated Submission ---
        console.log('--- PBI 2.1: SAVING CLIENT ASSESSMENT ---');
        console.log(`Client: ${assessment.clientName}, Level: ${assessment.fitnessLevel}`);
        console.log(JSON.stringify(assessment, null, 2));

        // SUCCESS MESSAGE (Acceptance Criterion 3)
        alert(`Assessment successfully recorded for ${assessment.clientName}!`);

        // RESET: Clear the form for the next client
        setAssessment(initialAssessmentState);
    };

    // RENDER: Returns the entire UI for the Client Assessment form
    return (
        <div 
            className="assessment-form" 
            style={{ 
                maxWidth: '600px', 
                margin: '0 auto', 
                padding: '20px', 
                border: '1px solid #ccc', 
                borderRadius: '8px' 
            }}
        >
            <h2>Client Initial Assessment 📝</h2>

            <form onSubmit={handleSubmitAssessment}>

                {/* -------- CLIENT DETAILS SECTION (Required Fields) -------- */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Client Name:</label>
                    <input
                        type="text"
                        name="clientName"
                        value={assessment.clientName}
                        onChange={handleAssessmentChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Fitness Level:</label>
                    <select
                        name="fitnessLevel"
                        value={assessment.fitnessLevel}
                        onChange={handleAssessmentChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        <option value="Beginner">Beginner (New to exercise)</option>
                        <option value="Intermediate">Intermediate (Consistent training)</option>
                        <option value="Advanced">Advanced (High intensity/specific training)</option>
                    </select>
                </div>

                {/* -------- GOALS & CONCERNS SECTION -------- */}
                <hr style={{ margin: '20px 0' }} />
                <h3>Assessment Details</h3>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Goals (Required):</label>
                    <textarea
                        name="goals"
                        value={assessment.goals}
                        onChange={handleAssessmentChange}
                        required
                        rows="4"
                        placeholder="Describe the client's primary fitness goals."
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    ></textarea>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Injuries/Concerns (Optional):</label>
                    <textarea
                        name="injuriesConcerns"
                        value={assessment.injuriesConcerns}
                        onChange={handleAssessmentChange}
                        rows="4"
                        placeholder="List any past injuries, chronic pain, or medical concerns."
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    ></textarea>
                </div>

                {/* -------- FINAL SAVE BUTTON (Submission AC) -------- */}
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
                    Save Assessment
                </button>

            </form>
        </div>
    );
}

export default ClientAssessment;