import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-section contact">
        <h3>Contact Us</h3>
        <p>Email: info@seasidebb.com</p>
        <p>Phone: 1-800-000-0000</p>
        <p>123, Laurier Ave</p>
      </div>

      <div className="footer-section follow">
        <h3>Follow Us</h3>
        <div className="social-links">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter" />
          </a>
        </div>
      </div>

      <div className="footer-section credits">
        <p>© 2035 by Seaside B&B</p>
        <p>Powered and secured by <a href="#">Wix</a></p>
      </div>
    </footer>
  );
};

export default Footer;
