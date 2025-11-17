import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css';
import WorkoutBuilder from './WorkoutBuilder.jsx'; // Correctly imports the default export
import Exercises from './exercises/exercises'
import RoleSelection from "./pages/RoleSelection";
import OwnerDashboard from "./pages/OwnerDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import HomePage from "./pages/HomePage";
import MemberLoginPage from "./pages/MemberLoginPage";
import MemberSignupPage from "./pages/MemberSignupPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";

export default function App() {
  return (
     <>         
      <div className="mainContent"> 
        <h1>Healthy Habits Gym</h1> 
        <BrowserRouter>
          <nav style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            <Link to="/">Home</Link> |  <Link to="/new-workout">New Workout Builder</Link>| <Link to="/Exercises">Exercises</Link> | <Link to="/Owner">Owners</Link> | <Link to="/Member">Member</Link>
          </nav>
          <Routes>
            <Route path="/Exercises" element={< Exercises/>}/>
            <Route  path="/new-workout" element={<WorkoutBuilder />} 
            <Route path="/" element={<RoleSelection />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/member" element={<MemberDashboard />} />
            <Route path="/member-login" element={<MemberLoginPage />} />
            <Route path="/member-signup" element={<MemberSignupPage />} />
            <Route path="/member-dashboard" element={<MemberDashboardPage />} />
            <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
