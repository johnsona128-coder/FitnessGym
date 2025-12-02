import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import OwnerDashboard from "./pages/OwnerDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import ExerciseLibrary from "./pages/ExerciseLibrary";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/owner/exercises" element={<ExerciseLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}
