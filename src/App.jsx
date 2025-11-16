import './App.css';
import {BrowserRouter, Routes, Route, Link } from 'react-router';
import Exercises from './exercises/Exercises'

export function App() {
  return (
    <>
      <div className="mainContent"> 
        <h1>Healthy Habits Gym</h1> 
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/Exercises">Exercises</Link>
          </nav>
          <Routes>
            <Route path="/Exercises" element={< Exercises/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
