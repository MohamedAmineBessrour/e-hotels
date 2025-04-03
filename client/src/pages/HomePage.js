/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
    
      {/* Hero Section with background */}
      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/mykonos.jpg')",
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
        <h2>Welcome to Seaside B&B</h2>
        <p>
          Seaside B&B brings together five of the most well-known hotel chains across North America, offering a seamless booking experience for guests. Whether you're here for business or leisure, our platform ensures your stay is as comfortable as possible with real-time room availability and personalized services.
        </p>

        <div className="info-cards">
          {["Activities", "Rooms", "Location"].map((title, i) => (
            <div key={i} className="info-card">
              <h3>{title}</h3>
              <p>
                {title === "Activities" && "Discover a wide range of activities at Seaside B&B locations, from outdoor adventures to relaxing spa treatments. There's something for everyone!"}
                {title === "Rooms" && "Choose from a variety of room types, from cozy single rooms to spacious suites. Each room is designed for comfort and relaxation with modern amenities."}
                {title === "Location" && "Seaside B&B has locations across North America, offering prime access to some of the most popular tourist destinations. Whether you’re near the beach, city center, or mountains, we’ve got the perfect spot for your getaway."}
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
