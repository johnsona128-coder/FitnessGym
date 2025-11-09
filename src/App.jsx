import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import WorkoutBuilder from './WorkoutBuilder.jsx'; // Correctly imports the default export

import './App.css';

export function App() {
  return (
    <>
      <div className="mainContent">
        <h1>Healthy Habits Gym</h1>
        
        {/* The BrowserRouter enables client-side routing */}
        <BrowserRouter>
          <nav style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            {/* Navigation Links */}
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            <Link to="/new-workout">New Workout Builder</Link>
          </nav>

          {/* Routes define which component loads for which path */}
          <Routes>
            {/* The root path loads the default content */}
            <Route 
                path="/" 
                element={
                    <div style={{ padding: '20px' }}>
                        <h2>Welcome!</h2>
                        <p>Use the navigation above to access the features.</p>
                        <p>This starter app uses React, Parcel, and React Router.</p>
                    </div>
                } 
            />
            
            {/* PBI 3.1: Route for the Workout Builder */}
            <Route 
                path="/new-workout" 
                element={<WorkoutBuilder />} 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}