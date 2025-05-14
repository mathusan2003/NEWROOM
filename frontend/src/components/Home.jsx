import React, { useState } from 'react';
import './Home.css';

import demoImage from '../assets/demo.jpg';
import bookingImage from '../assets/booking.jpg';
import liveEditingImage from '../assets/live-editing.jpg';
import pluginsImage from '../assets/plugins.jpg';
import multilingualImage from '../assets/multilingua.jpg';
import hotelWpImage from '../assets/hotel-wp.jpg';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme Toggle Button */}
      <div className="theme-toggle">
        <br></br><br></br>
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>ROOM RENT</h1>
        <p>Your perfect place to stay!</p>
        <button className="cta-button">BOOK NOW</button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>BEST FOR YOU</h2>
        <div className="features-grid">
          {/* Feature Cards */}
          {[{
            img: demoImage, title: "ROOM1"
          }, {
            img: bookingImage, title: "ROOM@"
          }, {
            img: multilingualImage, title: "ROOM@"
          }, {
            img: bookingImage, title: "ROOM@"
          }, {
            img: liveEditingImage, title: "ROOM#"
          }, {
            img: pluginsImage, title: "ROOM4"
          }, {
            img: multilingualImage, title: "ROOM5"
          }, {
            img: hotelWpImage, title: "HROOM6"
          }].map((feature, index) => (
            <div className="feature-card" key={index}>
              <img src={feature.img} alt={feature.title} className="feature-image" />
              <h3>{feature.title}</h3>
              <p>Explore.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exclusive Offer Section */}
      <section className="exclusive-offer-section">
        <h2>SEARCH YOUR BEST NEST</h2>
        <p>AND START YOUR FUTURE</p>
        <button className="cta-button">BOOK NOW</button>
      </section>
    </div>
  );
};

export default Home;
