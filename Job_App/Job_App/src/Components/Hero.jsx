// src/Components/Hero.jsx
import React from 'react';
import DesignPic from '../assets/design_pic.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Find your dream job</h1>
        <p className="hero-subtitle">
          Explore curated opportunities across engineering, product, design and more.
        </p>

        <div className="search-bar-new">
          <div className="search-item">
            <span className="input-icon">
              <i className="bi bi-search" />
            </span>
            <input
              type="text"
              className="input"
              placeholder="Job title or keyword"
            />
          </div>

          <button className="search-btn-new">View open positions</button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src={DesignPic}
          alt="Person working on laptop"
          className="hero-illustration"
        />
      </div>
    </section>
  );
};

export default Hero;
