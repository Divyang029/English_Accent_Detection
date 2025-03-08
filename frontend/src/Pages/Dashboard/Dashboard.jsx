import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import Home from './Home';
import "../../Styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("accessToken");
      navigate("/login"); // Redirect to login page
    };

return (
  <div className="dashboard">
    <Header handleLogout={handleLogout} />
    <Home />
    <Footer/>
  </div>
);
};

export default Dashboard;

