import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div className="bg-dark d-flex justify-content-between align-items-center p-3" style={{ width: '100%' }}>
      <div
        className="text-white"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'calc(1.4rem + 2vw)', // Adjusts based on viewport size
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'none',
        }}
      >
        ModernBanking
      </div>

      {isAuthenticated ? (
        <button
          onClick={() => {
            localStorage.setItem('isAuthenticated', "false");
            navigate('/login', { replace: true });
          }}
          className="btn btn-danger"
          style={{ width: 'auto', padding: '0.5rem 1rem' }}
        >
          Logout
        </button>
      ) : (
        <ul className="nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link text-white">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link text-white">Register</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
