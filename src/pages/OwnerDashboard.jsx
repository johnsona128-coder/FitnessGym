import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Owner Dashboard</h1>
      <p>Welcome, Gym Owner!</p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/owner/exercises")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "15px",
          }}
        >
          Manage Exercise Library
        </button>

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
