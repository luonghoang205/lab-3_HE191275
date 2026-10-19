import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to ProductStore</h1>
        <p className="hero-subtitle">Manage and explore products for your needs.</p>
        <Link to="/products" className="btn-view-products">
          View Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
