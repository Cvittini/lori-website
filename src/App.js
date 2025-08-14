import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

import Home from './pages/Home';
import Events  from './pages/EventPage';
import Plans from './pages/Plans';
import Feedback from './pages/Feedback';



const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  </MainLayout>
);

export default App;
