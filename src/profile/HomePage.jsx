import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  const nav = useNavigate();

  const goToOwner = () => {
    sessionStorage.setItem("role", "owner");
    nav("/owner-dashboard");
  };

  const goToMember = () => {
    nav("/member-login");
  };

  return (
    <div className="home-container">

      {/* TOP GYM HEADER */}
      <header className="home-header">
        <div className="logo">FITNESS GYM</div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>Welcome to Fitness Gym</h1>
        <p>Stronger Every Day. Start Your Fitness Journey.</p>

        <div className="home-buttons">
          <button className="btn-owner" onClick={goToOwner}>Owner</button>
          <button className="btn-member" onClick={goToMember}>Member</button>
        </div>
      </section>

    </div>
  );
}
