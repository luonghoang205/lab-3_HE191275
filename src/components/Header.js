import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="site-brand">
          ProductStore
        </Link>
        <nav className="site-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Products
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
