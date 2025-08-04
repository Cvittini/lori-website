import React from 'react';
import '../Styles/harmonized-styles.css';
import { FaInstagram, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-brand">
        <h2>Lori’s Fitness</h2>
        <p>Strong is the new beautiful.</p>
      </div>

      <div className="newsletter">
        <p>Stay updated on events & wellness tips</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://wa.me/11234567890" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
        <a href="https://t.me/YourTelegramUsername" target="_blank" rel="noreferrer">
          <FaTelegramPlane />
        </a>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Lori’s Fitness. All rights reserved.</p>
        <a href="https://herbalife.com" target="_blank" rel="noreferrer" className="herbalife-link">
          Visit our Herbalife Store
        </a>
      </div>
    </footer>
  );
};

export default Footer;
