import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center text-light"
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(135deg, #004d40, #00796b, #26a69a)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        color: "#fff",
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">Discover Reddit Insights Smarter</h1>
        <p className="lead mb-4">
          Instantly analyze audiences, trends, and keywords across Reddit with powerful research tools.
        </p>
        <div>
          <a href="/audience-search" className="btn btn-light btn-lg me-3 shadow-sm">
            🎯 Audience Search
          </a>
          <a href="/advanced-search" className="btn btn-outline-light btn-lg shadow-sm">
            🔍 Advanced Search
          </a>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
