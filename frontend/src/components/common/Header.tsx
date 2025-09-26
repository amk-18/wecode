import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            💻 WeCode
          </Link>
          
          <nav className="nav">
            <Link to="/problems" className="nav-link">Problems</Link>
            <Link to="/submissions" className="nav-link">Submissions</Link>
          </nav>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary">Login</button>
            <button className="btn btn-success">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
