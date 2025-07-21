// src/layout/MainLayout.jsx
import React from 'react';
import TopNav from '../components/TopNav';
import Sidebar from '../components/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <TopNav />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
