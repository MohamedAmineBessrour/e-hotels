import React from "react";
import "./ContactPage.css";
import Header from "./Header";
import Footer from "./Footer";

export default function ContactPage() {
  return (
    <div className="contact-page">
     
      {/* Hero Section with inline background */}
      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/img2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <div className="contact-header">
        </div>
      </div>

      {/* Content Section */}
      <div className="contact-content">
        <p>
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me and you can start
          adding your own content and make changes to the font. I’m a great
          place for you to tell a story and let your users know a little more
          about you.
        </p>

        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Seaside B&B</h2>
            <p><em>
              500 Terry Francine Street<br />
              San Francisco, CA 94158<br />
              info@mysite.com<br />
              Tel: 123-456-7890<br />
              Fax: 123-456-7890
            </em></p>
          </div>

          {/* Contact Form */}
          <form className="contact-form">
            <div className="form-row">
              <div>
                <label>First Name *</label>
                <input type="text" required />
              </div>
              <div>
                <label>Last Name *</label>
                <input type="text" required />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Email *</label>
                <input type="email" required />
              </div>
              <div>
                <label>Subject</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-row">
              <div style={{ width: "100%" }}>
                <label>Message</label>
                <textarea rows="5" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Map Embed */}
        <div className="map-container">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=500%20Terry%20Francine%20Street,%20San%20Francisco,%20CA&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>


    </div>
  );
}
