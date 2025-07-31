import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

import Home from './pages/Home';
import Events from './pages/EventPage';
import Meals from './pages/Meals';
import Plans from './pages/Plans';
import Blog from './pages/Blog';
import Feedback from './pages/Feedback';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  </MainLayout>
);

export default App;
