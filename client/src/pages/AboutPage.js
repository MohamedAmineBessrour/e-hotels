import React from "react";
import "./AboutPage.css";
import Header from "./Header";
import Footer from "./Footer";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Content Section */}
      <div className="about-content">
        <h2 className="about-title">
          Welcome to Seaside B&B <br />
          Your seamless hotel booking experience starts here.
        </h2>

        <div className="about-columns">
          <div className="about-text">
            <p>
              <em>
                Seaside B&B brings together five of the most renowned hotel chains
                with a presence across more than 14 locations in North America.
                We've developed a platform to help you easily book rooms across
                these hotels with real-time availability updates. Our goal is to
                provide you with a seamless and convenient experience for all
                your travel and accommodation needs.
              </em>
            </p>

            <p>
              <em>
                Whether you're planning a quick getaway or an extended stay, we
                offer a wide range of rooms across different categories (1-star to
                5-star hotels). You can easily find hotels based on your location
                preference, budget, and desired amenities. Our system allows you
                to book, check-in, and rent rooms with ease, ensuring a smooth
                journey every time you choose us.
              </em>
            </p>
          </div>

          <div className="about-text">
            <p>
              <em>
                The Seaside B&B platform allows customers to check real-time room
                availability, choose from a variety of room features such as price,
                amenities, and views, and book rooms for specific dates. For
                our valued customers, we make sure your booking history is
                well-maintained, and you can always check in and book rooms on
                short notice too.
              </em>
            </p>

            <p>
              <em>
                Our platform also connects you with employees who manage your
                bookings and check-ins, all while keeping your information secure.
                We work with each hotel chain to ensure you receive the best
                experience during your stay. The Seaside B&B team is committed to
                improving the travel experience and creating lasting memories for
                you.
              </em>
            </p>
          </div>

          <div className="about-image">
            <img src="/img1.jpg" alt="Interior View" />
          </div>
        </div>
      </div>
    </div>
  );
}
