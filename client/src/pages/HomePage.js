import React from "react";
import "./HomePage.css";
import Header from "./Header";
import Footer from "./Footer";


export default function HomePage() {
  return (
    <div className="home-container">
    
      {/* Hero Section with background */}
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
        {/* Booking Panel */}
        <div className="booking-panel">
          <div className="form-group">
            <label>Check-in and check-out</label>
            <input type="text" defaultValue="Apr 21, 2025 - Apr 27, 2025" />
          </div>

          <div className="form-group">
            <label>Rooms and guests</label>
            <select>
              <option>1 room, 2 adults</option>
              <option>2 rooms, 4 adults</option>
              <option>1 room, 1 adult</option>
            </select>
          </div>

          <div className="form-buttons">
            <button className="search-btn">Search</button>
            <button className="chat-btn">
              <span role="img" aria-label="user">👤</span> Let's Chat!
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome</h2>
        <p>
          I'm a paragraph. Click here to add your own text and edit me. I’m a great place
          for you to tell a story and let your users know a little more about you.
        </p>

        <div className="info-cards">
          {["Activities", "Rooms", "Location"].map((title, i) => (
            <div key={i} className="info-card">
              <h3>{title}</h3>
              <p>
                I'm a paragraph. Click here to add your own text and edit me.
                I’m a great place for you to tell a story and let your users know a little more about you.
              </p>
              <div className="card-divider" />
              <a href="#">Read More</a>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
