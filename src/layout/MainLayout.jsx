import React from "react";
import TopNav from "../components/TopNav";
import '../Styles/harmonized-styles.css';
import Footer from "../pages/Footer";

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <TopNav />
    <main className="main-content">
      {children}
      <Footer />
    </main>
  </div>
);

export default MainLayout;
