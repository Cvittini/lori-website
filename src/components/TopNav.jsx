import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/harmonized-styles.css";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="top-navbar">
      <div className="top-left">
        <Link to="/">
          <img
            src="/lorisfitnesslogo.png"
            alt="Loris Fitness Logo"
            className="logo"
          />
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`top-right ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>
          Events
        </Link>
        <Link to="/plans" className="nav-link" onClick={() => setMenuOpen(false)}>
          Plans
        </Link>
        <Link to="/feedback" className="nav-link" onClick={() => setMenuOpen(false)}>
          Feedback
        </Link>

        <a
          href="https://lorimardejesus.herbalife.com/es-us/u"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-h"
        >
          <img
            src="/h1-header-logo.webp"
            alt="Herbalife Store"
            className="store-logo"
          />
        </a>

        <div className="social-icons">
          <a
            href="https://www.instagram.com/lorimar_djesus/profilecard/?igsh=MXJuajFlM3M2ejA4dA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://t.me/Loris_fitness"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://wa.me/message/B6EJJP3OGYM3H1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
