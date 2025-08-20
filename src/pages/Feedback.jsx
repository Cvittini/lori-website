import React, { useState } from 'react';
import '../Styles/harmonized-styles.css';
import emailjs from 'emailjs-com';
import { isValidEmail } from '../lib/email';
import { useTranslation } from 'react-i18next';

const SERVICE_ID = 'service_839t84l';
const TEMPLATE_ID = 'template_lbtk24d';
const PUBLIC_KEY = 'QYkr433CtbV-jJkbi';

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState(null); // {type, text}
  const { t } = useTranslation('common');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (
      !formData.message ||
      !formData.rating ||
      (formData.email && !isValidEmail(formData.email))
    ) {
      setStatus({ type: 'error', text: 'Please provide a message, rating, and valid email if included.' });
      return;
    }
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: 'lorimarfitness@gmail.com',
          subject: 'Site Feedback',
          message: `Name: ${formData.name}\nEmail: ${formData.email}\nRating: ${formData.rating}\nMessage: ${formData.message}`,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );
      setStatus({ type: 'success', text: 'Thank you! Your feedback has been sent.' });
      setFormData({ name: '', email: '', message: '', rating: '' });
    } catch (err) {
      console.error('Feedback submit error:', err);
      setStatus({ type: 'error', text: 'Failed to send feedback. Please try again later.' });
    }
  };

  return (
    <section className="feedback-girly">
      <h2 className="feedback-heading">{t('feedback_title')}</h2>
      <p className="feedback-subtext">Leave a note, share a smile, or tell us how we can glow better together ✨</p>

      <form className="feedback-form-girly" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={`${t('name')} (optional)`}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={`${t('email')} (optional)`}
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder={`${t('message')} 💌`}
          rows="4"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            How are we doing? 💬
          </option>
          <option value="5">🌟🌟🌟🌟🌟 - Amazing!</option>
          <option value="4">🌟🌟🌟🌟 - Great!</option>
          <option value="3">🌟🌟🌟 - Okay</option>
          <option value="2">🌟🌟 - Needs love</option>
          <option value="1">🌟 - Not great</option>
        </select>
        <input
          type="text"
          name="comment"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />
        <button type="submit">{t('submit')}</button>
        {status && <p className={`form-message ${status.type}`}>{status.text}</p>}
      </form>
    </section>
  );
};

export default Feedback;
