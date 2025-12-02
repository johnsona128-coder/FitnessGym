import { useNavigate } from "react-router-dom";

export default function MemberDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Member Dashboard</h1>
      <p>Welcome, Member!</p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/")}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Back to Role Selection
        </button>
      </div>
    </div>
  );
}

