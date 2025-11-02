import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HeroSection() {
  return (
    <section
      className="text-center text-white d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#059669",
        height: "90vh",
        backgroundImage:
          "linear-gradient(rgba(4,120,87,0.85), rgba(4,120,87,0.85)), url('https://images.unsplash.com/photo-1556157382-97eda2f9e2ab?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold">Discover Reddit Insights Instantly</h1>
        <p className="lead mt-3 mb-4">
          Analyze communities, uncover trends, and understand audiences — all in one place.
        </p>
        <a href="/audience-search" className="btn btn-light btn-lg px-4 me-3">
          Start Exploring
        </a>
        <a href="/advanced-search" className="btn btn-outline-light btn-lg px-4">
          Advanced Search
        </a>
      </div>
    </section>
  );
}
