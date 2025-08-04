import React, { useState } from "react";
import '../Styles/harmonized-styles.css';
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="top-navbar">
      <div className="top-left">
        <img src="/Lori'sfitnesslogo.png" alt="Lorimar Logo" className="logo" />
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`top-right ${menuOpen ? 'active' : ''}`}>
        <a href="/" className="nav-link">Home</a>
        <a href="/events" className="nav-link">Events</a>
        <a href="/meals" className="nav-link">Meals</a>
        <a href="/plans" className="nav-link">Plans</a>
        <a href="/blog" className="nav-link">Blog</a>
        <a href="/feedback" className="nav-link">Feedback</a>

        <a
          href="https://lorimardejesus.herbalife.com/es-us/u"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-h"
        >
          <img src="/h1-header-logo.webp" alt="Herbalife Store" className="store-logo" />
        </a>

        <div className="social-icons">
          <a
            href="https://www.instagram.com/lorimar_djesus/profilecard/?igsh=MXJuajFlM3M2ejA4dA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a href="https://t.me/Loris_fitnes" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane />
          </a>
          <a href="https://wa.me/message/B6EJJP3OGYM3H1" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
