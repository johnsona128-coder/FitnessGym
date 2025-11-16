import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Select Your Role</h1>

      <button
        onClick={() => navigate("/owner")}
        style={{
          padding: "10px 20px",
          marginRight: "20px",
          fontSize: "18px",
        }}
      >
        Owner
      </button>

      <button
        onClick={() => navigate("/member")}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
        }}
      >
        Member
      </button>
    </div>
  );
}
