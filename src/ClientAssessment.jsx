import React, { useState } from 'react';

/**
 * PBI 2.1: Assessment Data Entry
 * This component allows a gym owner to record initial assessment information for a new client.
 */
function ClientAssessment() {

    // STATE: Holds all assessment form data
    // Defined separately to allow for easy resetting later
    const initialAssessmentState = {
        clientName: '',
        fitnessLevel: 'Beginner', // Required dropdown default
        goals: '',                // Required text area (empty for now)
        injuriesConcerns: ''      // Optional text area (empty for now)
    };
    
    const [assessment, setAssessment] = useState(initialAssessmentState);

    // FUNCTION: Updates assessment fields dynamically based on input name
    const handleAssessmentChange = (e) => {
        setAssessment({
            ...assessment,
            [e.target.name]: e.target.value
        });
    };

    // Placeholder for submit logic (to be completed in commit 3)
    const handleSubmitAssessment = (e) => {
        e.preventDefault();
        console.log("Submit logic coming in later commit");
    };

    // RENDER: Returns the UI for the Client Assessment form
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
                
            </form>
        </div>
    );
}

export default ClientAssessment;