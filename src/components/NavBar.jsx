import React from "react";
import { Link } from "react-router";
import "../styles/nav.css";   // Import stylesheet

export default function NavBar() {
  return (
    <nav className="nav">
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/classes">Classes</Link>
      <Link className="link" to="/trainers">Trainers</Link>
      <Link className="link" to="/membership">Membership</Link>
      <Link className="link" to="/profile">Profile</Link>
      <Link className="link" to="/settings">Settings</Link>
    </nav>
  );
}