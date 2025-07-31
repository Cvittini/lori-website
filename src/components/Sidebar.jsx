import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/meals">Meals</a></li>
        <li><a href="/plans">Plans</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/feedback">Feedback</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
