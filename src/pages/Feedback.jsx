import React, { useState } from 'react';
import '../Styles/harmonized-styles.css';
import { postFeedback } from '../lib/api';

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postFeedback(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback submit error:', err);
    }
  };

  return (
    <section className="feedback-girly">
      <h2 className="feedback-heading">Your voice makes us stronger 💪💗</h2>
      <p className="feedback-subtext">Leave a note, share a smile, or tell us how we can glow better together ✨</p>

      {submitted ? (
        <div className="thank-you-box">
          <p className="thank-you-text">Thank you, gorgeous! 💖 Your feedback means the world to us 💫</p>
        </div>
      ) : (
        <form className="feedback-form-girly" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name (optional)"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email (optional)"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tell us everything 💌"
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
          <button type="submit">Send Your Love 💖</button>
        </form>
      )}
    </section>
  );
};

export default Feedback;
