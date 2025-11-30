import { useEffect, useState } from "react";
import "../styles/memberDashboard.css";

export default function MemberDashboardPage() {
  const [memberData, setMemberData] = useState({});

  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (role !== "member") {
      alert("Access denied. This page is for members only.");
      return;
    }

    // Load stored info from localStorage
    const data = {
      firstName: localStorage.getItem("memberFirstName"),
      lastName: localStorage.getItem("memberLastName"),
      email: localStorage.getItem("memberEmail"),
      phone: localStorage.getItem("memberPhone"),
      plan: localStorage.getItem("memberPlan"),
      joinDate: new Date().toLocaleDateString() // optional
    };

    setMemberData(data);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Member Dashboard</h1>

      {/* USER INFORMATION */}
      <div className="info-card">
        <h2>Your Account Information</h2>

        <p><strong>Name:</strong> {memberData.firstName} {memberData.lastName}</p>
        <p><strong>Email:</strong> {memberData.email}</p>
        <p><strong>Phone:</strong> {memberData.phone}</p>
        <p><strong>Membership Plan:</strong> {memberData.plan}</p>
        <p><strong>Join Date:</strong> {memberData.joinDate}</p>
      </div>

      {/* WEEKLY TIMETABLE */}
      <h2 className="schedule-title">Weekly Workout Schedule</h2>

      <div className="timetable">
        <div className="day"><strong>Monday</strong><p>Chest + Triceps</p></div>
        <div className="day"><strong>Tuesday</strong><p>Back + Biceps</p></div>
        <div className="day"><strong>Wednesday</strong><p>Legs</p></div>
        <div className="day"><strong>Thursday</strong><p>Shoulders</p></div>
        <div className="day"><strong>Friday</strong><p>Core + Cardio</p></div>
        <div className="day"><strong>Saturday</strong><p>Full Body</p></div>
        <div className="day"><strong>Sunday</strong><p>Rest Day</p></div>
      </div>

    </div>
  );
}
