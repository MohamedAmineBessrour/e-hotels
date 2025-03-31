import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/" className="logo-link">Seaside B&B</Link>
        <p>   </p>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/search">Search Room</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><FaUser className="login-icon" /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
