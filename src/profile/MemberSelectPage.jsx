import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function MemberSelectPage() {
  const [name, setName] = useState("");
  const nav = useNavigate();

  const goToDashboard = () => {
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    sessionStorage.setItem("role", "member");
    sessionStorage.setItem("memberName", name);

    nav("/member-dashboard");
  };

  return (
    <div>
      <h2>Select Member</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={goToDashboard}>Continue</button>
    </div>
  );
}
