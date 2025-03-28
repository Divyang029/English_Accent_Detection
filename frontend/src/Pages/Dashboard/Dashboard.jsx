import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../Components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Home from '../Home/Home.jsx';
import HistoryPage from '../History/History.jsx';
import "../../Styles/Dashboard.css";
import { Routes, Route } from "react-router-dom";
import About from '../About/About.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("accessToken");
      navigate("/login"); // Redirect to login page
    };

return (
  <div className="dashboard">
    <Header handleLogout={handleLogout} />
      <Routes>
        <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="about" element={<About />} />
        </Routes>
    <Footer/>
  </div>
);
};

export default Dashboard;

