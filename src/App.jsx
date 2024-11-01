import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // 방금 만든 홈 화면 컴포넌트
import PitchPerfect from "./pages/PitchPerfect.jsx"; // 빈 페이지로 시작
import HarmonyBuilder from "./pages/HarmonyBuilder"; // 빈 페이지로 시작

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈 화면 */}
        <Route path="/" element={<Home />} />

        {/* 게임 1 - Pitch Perfect */}
        <Route path="/pitch-perfect" element={<PitchPerfect />} />

        {/* 게임 2 - Harmony Builder */}
        <Route path="/harmony-builder" element={<HarmonyBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
