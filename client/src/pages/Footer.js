import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-box">
        <p className="footer-heading">Call us now to book</p>
        <p className="footer-highlight">1-800-000-0000</p>
      </div>
      <div className="footer-box">
        <p className="footer-heading">Follow us</p>
        <div className="social-icons">
          <i className="fab fa-tripadvisor"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
      <div className="footer-box">
        <p className="footer-heading">© 2035 by Seaside B&B</p>
        <p>Powered and secured by <a href="#">Wix</a></p>
      </div>
    </footer>
  );
};

export default Footer;
