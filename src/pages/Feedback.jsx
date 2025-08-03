import React, { useState } from 'react';
import './Feedback.css'; // You can rename FeedbackSection.css to just Feedback.css

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          <input type="text" placeholder="Your Name (optional)" />
          <textarea placeholder="Tell us everything 💌" rows="4" required></textarea>
          <select defaultValue="">
            <option value="" disabled>How are we doing? 💬</option>
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
