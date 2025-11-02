import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// 🧱 Pages
import Home from "./pages/Home.jsx";
import AudienceSearch from "./pages/AudienceSearch.jsx";
import AdvancedSearch from "./pages/AdvancedSearch.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-950 min-h-screen text-white">
        <Navbar />
        <div className="pt-20 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audience" element={<AudienceSearch />} />
            <Route path="/advanced" element={<AdvancedSearch />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
