// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', height: '100vh', position: 'fixed', top: '60px', left: 0, backgroundColor: '#f9c5d1' }}>
      <ul style={{ listStyle: 'none', padding: '1rem' }}>
        <li><a href="/">Home</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/meals">Meals</a></li>
        <li><a href="/plans">Plans</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/feedback">Feedback</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar; // ✅ MUST BE DEFAULT EXPORT
