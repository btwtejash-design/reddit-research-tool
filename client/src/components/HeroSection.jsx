import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <h1>Discover Reddit Insights Smarter</h1>
        <p className="lead">
          Instantly analyze audiences, trends, and keywords across Reddit with powerful research tools.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/audience" className="btn btn-light btn-lg">
            🎯 Audience Search
          </Link>
          <Link to="/advanced" className="btn btn-outline-light btn-lg">
            🔍 Advanced Search
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
