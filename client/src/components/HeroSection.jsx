import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: '95vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--gradient-hero)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
        `,
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'var(--radius-full)',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <span>🚀</span>
          <span>Trusted by Founders & Marketers Worldwide</span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900,
          color: 'white',
          marginBottom: '1.5rem',
          lineHeight: '1.1',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          Find Your Perfect
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #d1fae5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block'
          }}>
            Reddit Audience
          </span>
        </h1>

        {/* Subheadline */}
        <p className="lead" style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '3rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.7',
          fontWeight: 400,
          animation: 'fadeIn 1s ease-out 0.4s both'
        }}>
          Unlock powerful insights from <strong>millions of active Reddit users</strong>. 
          Discover exactly where your target audience gathers, what they discuss, and how to reach them effectively.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '4rem',
          animation: 'fadeIn 1s ease-out 0.6s both'
        }}>
          <Link 
            to="/audience" 
            className="btn btn-light btn-lg"
            style={{
              padding: '1.125rem 2.5rem',
              fontSize: '1.125rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-2xl)',
              boxShadow: 'var(--shadow-2xl)',
              transform: 'translateY(0)',
              transition: 'all var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            🎯 Start Free Search
          </Link>
          <Link 
            to="/advanced" 
            className="btn btn-outline-light btn-lg"
            style={{
              padding: '1.125rem 2.5rem',
              fontSize: '1.125rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-2xl)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(0)',
              transition: 'all var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            🔍 Advanced Analytics
          </Link>
        </div>

        {/* Social Proof Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '800px',
          margin: '0 auto',
          animation: 'fadeIn 1s ease-out 0.8s both'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '0.25rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              1000+
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}>
              Active Communities
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '0.25rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              50M+
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}>
              Reddit Users
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '0.25rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              Real-Time
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}>
              Data Updates
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '2px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.5)',
            margin: '0 auto',
            borderRadius: 'var(--radius-full)'
          }}></div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
