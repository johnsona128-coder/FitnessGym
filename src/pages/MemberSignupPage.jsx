import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function MemberSignupPage() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [plan, setPlan] = useState("");

  const handleSignup = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !plan
    ) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Save user data to localStorage
    localStorage.setItem("memberFirstName", firstName);
    localStorage.setItem("memberLastName", lastName);
    localStorage.setItem("memberEmail", email);
    localStorage.setItem("memberPhone", mobile);
    localStorage.setItem("memberPassword", password);
    localStorage.setItem("memberPlan", plan);

    alert("Account created successfully!");
    nav("/member-login");
  };

  return (
    <div className="signup-container">

      <h2 className="signup-title">CREATE YOUR ACCOUNT</h2>
      <p className="signup-subtext">* Indicates a required field</p>

      <div className="signup-box">

        {/* NAME FIELDS */}
        <div className="name-fields">
          <div className="field-group">
            <label>First Name*</label>
            <input 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label>Last Name*</label>
            <input 
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* EMAIL */}
        <label>Email*</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* MOBILE */}
        <label>Mobile Phone*</label>
        <input 
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* PASSWORD */}
        <label>Password*</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM PASSWORD */}
        <label>Confirm Password*</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* PLAN DROPDOWN */}
        <label>Member Plan*</label>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Plan</option>
          <option value="basic">Basic - $15/month</option>
          <option value="premium">Premium - $25/month</option>
          <option value="elite">Elite - $35/month</option>
        </select>

        {/* CREATE ACCOUNT BUTTON */}
        <button className="continue-btn" onClick={handleSignup}>
          CREATE ACCOUNT
        </button>

      </div>
    </div>
  );
}
