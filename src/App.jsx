import './App.css';
import {BrowserRouter, Routes, Route, Link } from 'react-router';
import Demonstration from './exercises/Demonstration';

export function App() {
  return (
    <>
      <div className="mainContent"> 
        <h1>Healthy Habits Gym</h1> 
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/Demonstration">Exercises</Link>
          </nav>
          <Routes>
            <Route path="/Demonstration" element={< Demonstration/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
