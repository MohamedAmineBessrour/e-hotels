import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>Seaside B&B</h1>
        <p>San Jose</p>
      </div>
      <nav className="nav-links">
        <Link to="/book">Book a Room</Link>
        <Link to="/about">About Us</Link>
        <Link to="/login">Login</Link>
        <Link to="/contact">Contact</Link>
        <FaUser className="login-icon" />
      </nav>
    </header>
  );
};

export default Header;
