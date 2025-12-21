// src/Components/Footer.jsx
import React from 'react';
import Logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer text-white">
      <img src={Logo} alt="Searchflow logo" height="40" className="mb-2 rounded" />
      <p className="mb-1">We're Always Happy to Help</p>
      <p>
        <a href="mailto:searchflow@gmail.com" className="footer-link">
          searchflow@gmail.com
        </a>
      </p>
      <div className="social-icons mt-2">
        <i className="bi bi-facebook mx-2" />
        <i className="bi bi-twitter mx-2" />
        <i className="bi bi-linkedin mx-2" />
      </div>
    </footer>
  );
};

export default Footer;
