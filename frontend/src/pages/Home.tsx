import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="hero">
      <div className="container">
        <h1 className="hero-title">Welcome to WeCode</h1>
        <p className="hero-subtitle">
          Improve your coding skills with our collection of programming challenges. 
          Practice with real-world problems and get better at interviews.
        </p>
        <Link to="/problems" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
          Start Coding
        </Link>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💡</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Learn by Doing</h3>
            <p style={{ color: '#64748b' }}>Practice with hands-on coding challenges and real-world problems.</p>
          </div>
          
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Instant Feedback</h3>
            <p style={{ color: '#64748b' }}>Get immediate results with our automated code evaluation system.</p>
          </div>
          
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Track Progress</h3>
            <p style={{ color: '#64748b' }}>Monitor your improvement with detailed submission history.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;