import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/memberLogin.css";

export default function MemberLoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    // Store login data (your requirement)
    localStorage.setItem("memberEmail", email);
    localStorage.setItem("memberPassword", password);

    sessionStorage.setItem("role", "member");
    sessionStorage.setItem("memberName", email);

    nav("/member-dashboard");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign in</h2>
      <p className="login-subtitle">
        Sign in with your email address and password below.
      </p>

      <div className="login-box">
        <label>Email address</label>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Sign in
        </button>

        <p className="login-links">
          <span onClick={() => nav("/member-signup")} className="link-red">
            Create account
          </span>
          <br />
          <span 
            onClick={() => alert("Password reset flow TBD")}
            className="link-red"
          >
            Forgot your password?
          </span>
        </p>
      </div>
    </div>
  );
}
