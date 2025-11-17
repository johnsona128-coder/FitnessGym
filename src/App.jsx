import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MemberLoginPage from "./pages/MemberLoginPage";
import MemberSignupPage from "./pages/MemberSignupPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/member-login" element={<MemberLoginPage />} />
        <Route path="/member-signup" element={<MemberSignupPage />} />
        <Route path="/member-dashboard" element={<MemberDashboardPage />} />

        <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />

      </Routes>
    </BrowserRouter>
  );
}
