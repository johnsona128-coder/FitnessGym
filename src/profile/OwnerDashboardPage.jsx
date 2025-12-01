import { useEffect } from "react";

export default function OwnerDashboardPage() {
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "owner") {
      alert("Access denied.");
    }
  }, []);

  return (
    <div>
      <h2>Owner Dashboard</h2>
      <p>Owner features coming soon...</p>
    </div>
  );
}
