import React from "react";
import "./AboutPage.css";
import Header from "./Header";
import Footer from "./Footer";

export default function AboutPage() {
  return (
    <div className="about-page">

      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="hero-title">About Us</h1>
      </div>

      {/* Content Section */}
      <div className="about-content">
        <h2 className="about-title">I'm a title. <br />Click here to add your own text and edit me.</h2>
        
        <div className="about-columns">
          <div className="about-text">
            <p>
              <em>I'm a paragraph. Click here to add your own text and edit me.
              It’s easy. Just click “Edit Text” or double click me and you can
              start adding your own content and make changes to the font. Feel
              free to drag and drop me anywhere you like on your page. I’m a
              great place for you to tell a story and let your users know a
              little more about you.</em>
            </p>

            <p>
              <em>This is a great space to write long text about your company
              and your services. You can use this space to go into a little more
              detail about your company. Talk about your team and what services
              you provide. Tell your visitors the story of how you came up with
              the idea for your business and what makes you different from your
              competitors.</em>
            </p>
          </div>

          <div className="about-text">
            <p>
              <em>At Wix we’re passionate about making templates that allow you
              to build fabulous websites and it’s all thanks to the support and
              feedback from users like you! Keep up to date with New Releases
              and what’s Coming Soon in Wixellaneous in Support. Feel free to
              tell us what you think and give us feedback in the Wix Forum.</em>
            </p>

            <p>
              <em>If you’d like to benefit from a professional designer’s touch,
              head to the Wix Arena and connect with one of our Wix Pro
              designers. Or if you need more help you can simply type your
              questions into the Support Forum and get instant answers. To keep
              up to date with everything Wix, including tips and things we think
              are cool, just head to the Wix Blog!</em>
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
