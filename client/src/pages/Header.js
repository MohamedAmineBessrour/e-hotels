import React from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/" className="logo-link">Seaside B&B</Link>
      </div>

      <nav className="nav-links">
        <ul>
          <li><Link to="/views">Info</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><FaUser className="login-icon" /></li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
              <li>
                <FaUser className="login-icon" title={user.name || "User"} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;