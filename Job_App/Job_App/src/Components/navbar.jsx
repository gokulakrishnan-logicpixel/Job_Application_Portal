// src/Components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';

const Navbar = ({ showAuthButtons = false }) => {
  return (
    <nav
      className="navbar navbar-dark px-4 py-3 shadow-sm"
      style={{ backgroundColor: '#202530' }}
    >
      {/* Logo -> Home */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={Logo}
          alt="Searchflow logo"
          height="60"
          className="me-2 rounded"
        />
      </Link>

      {/* Center links */}
      <div className="ms-auto me-3 d-flex align-items-center">
       
      </div>

      {/* Right side auth buttons only on home (showAuthButtons=true) */}
      {showAuthButtons && (
        <div className="d-flex align-items-center">
          <Link className="btn btn-outline-light me-2" to="/login">
            In-Sign-Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
