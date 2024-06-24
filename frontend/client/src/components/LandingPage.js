import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Our Chat App</h1>
        <p>Connect with project experts in private chat rooms.</p>
        <div className="landing-buttons">
          <Link to="/signin" className="btn">Sign In</Link>
          <Link to="/signup" className="btn">Sign Up</Link>
        </div>
      </header>
      <footer className="landing-footer">
        &copy; 2024 PaisaKhooz.com
      </footer>
    </div>
  );
}

export default LandingPage;
