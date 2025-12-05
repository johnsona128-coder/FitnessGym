// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import WorkoutBuilder from "./WorkoutBuilder.jsx";
import Exercises from "./exercises/Exercises";
import RoleSelection from "./pages/RoleSelection";
import OwnerDashboard from "./pages/OwnerDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import HomePage from "./pages/HomePage";
import MemberLoginPage from "./pages/MemberLoginPage";
import MemberSignupPage from "./pages/MemberSignupPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";
import WorkoutVersionPage from "./pages/WorkoutVersionPage";
import WorkoutDashboard from "./pages/WorkoutDashboard"; 
import WorkoutDashboard from "./pages/WorkoutDashboard";  

export default function App() {
  return (
    <BrowserRouter>
      <div className="mainContent">
        <h1>Healthy Habits Gym</h1>

      <nav style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}>
  <Link to="/">Home</Link> |{" "}
  <Link to="/new-workout">New Workout Builder</Link> |{" "}
  <Link to="/exercises">Exercises</Link> |{" "}
  <Link to="/owner">Owners</Link> |{" "}
  <Link to="/member">Member</Link> |{" "}
  <Link to="/workout-dashboard">Current Workouts</Link> |{" "}
  <Link to="/workout-versions">Workout Versions</Link>
</nav>

     

        <Routes>
  {/* main / home */}
  <Route path="/" element={<RoleSelection />} />

  {/* workouts */}
  <Route path="/new-workout" element={<WorkoutBuilder />} />
  <Route path="/workout-versions" element={<WorkoutVersionPage />} />
  <Route path="/workout-dashboard" element={<WorkoutDashboard />} />

  {/* exercises */}
  <Route path="/exercises" element={<Exercises />} />

  {/* owner + member stuff */}
  <Route path="/owner" element={<OwnerDashboard />} />
  <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
  <Route path="/member" element={<MemberDashboard />} />
  <Route path="/member-login" element={<MemberLoginPage />} />
  <Route path="/member-signup" element={<MemberSignupPage />} />
  <Route path="/member-dashboard" element={<MemberDashboardPage />} />

  {/* optional home */}
  <Route path="/home" element={<HomePage />} />
</Routes>
      </div>
    </BrowserRouter>
  );
}
