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
      <div className="min-h-screen">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audience" element={<AudienceSearch />} />
            <Route path="/advanced" element={<AdvancedSearch />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
