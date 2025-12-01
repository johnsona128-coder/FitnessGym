import './App.css';
import {BrowserRouter, Routes, Route, Link } from 'react-router';
import WorkoutBuilder from './workout/WorkoutBuilder'; // Correctly imports the default export
import Exercises from './exercises/exercises'
//import RoleSelection from "./profile/RoleSelection";
import OwnerDashboard from "./profile/OwnerDashboard";
import MemberDashboard from "./profile/MemberDashboard";
//import HomePage from "./profile/HomePage";
import MemberLoginPage from "./profile/MemberLoginPage";
import MemberSignupPage from "./profile/MemberSignupPage";
import MemberDashboardPage from "./profile/MemberDashboardPage";
import OwnerDashboardPage from "./profile/OwnerDashboardPage";

export function App() {
  return (
    <>
      <div className="mainContent"> 
        <h1>Healthy Habits Gym</h1> 
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> |  <Link to="/new-workout">New Workout Builder</Link>| <Link to="/Exercises">Exercises</Link> | <Link to="/Owner">Owners</Link> | <Link to="/Member">Member</Link>
          </nav>
          <Routes>
            <Route path="/Exercises" element={< Exercises/>}/>
            <Route  path="/new-workout" element={<WorkoutBuilder />} />
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