import React, { useState } from 'react';
import '../Styles/harmonized-styles.css';
import { FaInstagram, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { isValidEmail } from '../lib/email';
import { useTranslation } from 'react-i18next';

const SERVICE_ID = 'service_839t84l';
const TEMPLATE_ID = 'template_lbtk24d';
const PUBLIC_KEY = 'QYkr433CtbV-jJkbi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }
  const { t } = useTranslation('common');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (!isValidEmail(email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: 'lorimarfitness@gmail.com',
          subject: 'Newsletter Subscription',
          message: `New subscriber: ${email}`,
          reply_to: email,
        },
        PUBLIC_KEY,
      );
      setEmail('');
      setStatus({ type: 'success', text: 'Thanks for subscribing!' });
    } catch (err) {
      console.error('Newsletter submit error:', err);
      setStatus({ type: 'error', text: 'Subscription failed. Please try again later.' });
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-brand">
        <h2>Lori’s Fitness</h2>
        <p>Strong is the new beautiful.</p>
      </div>

      <div className="newsletter">
        <p>{t('newsletter_cta')}</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Honeypot field */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />
          <button type="submit">{t('submit')}</button>
        </form>
        {status && (
          <p className={`form-message ${status.type}`}>{status.text}</p>
        )}
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
