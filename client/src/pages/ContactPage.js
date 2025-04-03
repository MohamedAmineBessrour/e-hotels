import React, { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  // State for handling the form submission and confirmation message
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    setSubmitted(true);  // Sets the submission state to true, showing the confirmation message
  };

  return (
    <div className="contact-page">
     
      {/* Content Section */}
      <div className="contact-content">
        <p>
          Welcome to Seaside B&B, your home away from home. We are a network of
          five prestigious hotel chains, offering guests the perfect accommodation
          options across North America. Our goal is to make your stay as comfortable
          and enjoyable as possible, with rooms available to book in real-time.
        </p>

        <p>
          Whether you're traveling for business or pleasure, Seaside B&B offers 
          a wide range of rooms to suit every need. You can easily book a room 
          through our online platform, check availability, and enjoy a seamless 
          check-in experience. If you need any assistance, our dedicated team 
          is ready to help you with any queries you might have.
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
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
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
          ) : (
            <div className="confirmation-message">
              <h3>Your message has been sent successfully!</h3>
              <p>Thank you for reaching out to us. We'll get back to you as soon as possible.</p>
            </div>
          )}
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
