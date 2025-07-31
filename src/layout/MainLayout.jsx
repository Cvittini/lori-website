import React from 'react';
import TopNav from '../components/TopNav';
import './MainLayout.css';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <TopNav />
    <main className="main-content">
      {children}
    </main>
  </div>
);

export default MainLayout;
