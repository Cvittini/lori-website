import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Lori's Fitness & Nutrition</h1>
        <p>Your hub for fitness, wellness, and healthy fuel.</p>
        <a href="/events" className="home-cta">Join a Fit Event</a>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>What is Lori's Fitness?</h2>
        <p>
          Lori's Fitness is a community-driven wellness movement. We bring people
          together through energizing fitness camps, delicious healthy meals, and personalized plans to help you thrive.
        </p>
      </section>

      {/* Highlight Boxes */}
 <section className="feature-grid">
  <Link to="/meals" className="feature-box">
    <div className="icon">🥗</div>
    <h3>Healthy Meals</h3>
    <p>Delicious, energizing meals and drinks available at events.</p>
  </Link>

  <Link to="/plans" className="feature-box">
    <div className="icon">📋</div>
    <h3>Custom Plans</h3>
    <p>Create your ideal workout and meal strategy based on your needs.</p>
  </Link>

  <Link to="/blog" className="feature-box">
    <div className="icon">📝</div>
    <h3>Blog</h3>
    <p>Stay motivated with tips, stories, and advice for a healthy life.</p>
  </Link>

  <Link to="/feedback" className="feature-box">
    <div className="icon">💬</div>
    <h3>Feedback</h3>
    <p>Let us know how we’re doing and how we can improve.</p>
  </Link>
</section>


      {/* Newsletter Signup */}
<section className="newsletter-section">
  <h2>Stay Updated!</h2>
  <p>Get event reminders, wellness tips, and exclusive meal updates.</p>
  <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
    <input type="email" placeholder="Enter your email" required />
    <button type="submit">Subscribe</button>
  </form>
</section>


      {/* Footer CTA */}
      <section className="footer-cta">
        <p>Shop wellness products at our <a href="https://yourherbalifestore.com" target="_blank" rel="noreferrer">Herbalife Store</a></p>
      </section>
    </div>
  );
};

export default Home;
