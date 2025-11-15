import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import OwnerDashboard from "./pages/OwnerDashboard";
import MemberDashboard from "./pages/MemberDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
