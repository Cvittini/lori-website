import React from 'react';
import './TopNav.css';
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const TopNav = () => {
  return (
    <div className="top-navbar">
      <div className="top-left">
        <img src="/Lorilogo.png" alt="Lorimar Logo" className="logo" />
      </div>

      <div className="top-right">
        <a href="/" className="nav-link">Home</a>
        <a href="/events" className="nav-link">Events</a>
        <a href="/meals" className="nav-link">Meals</a>
        <a href="/plans" className="nav-link">Plans</a>
        <a href="/blog" className="nav-link">Blog</a>
        <a href="/feedback" className="nav-link">Feedback</a>
        <a href="https://www.herbalife.com/en-us/" className="nav-link-h" arget="_blank" rel="noopener noreferrer">Herbalife-Store</a>

        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
