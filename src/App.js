// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Meals from './pages/Meals';
import Plans from './pages/Plans';
import Blog from './pages/Blog';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
