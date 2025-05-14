import React from 'react';
import './Home.css';

// Import feature images
import demoImage from '../assets/demo.jpg';
import bookingImage from '../assets/booking.jpg';
import liveEditingImage from '../assets/live-editing.jpg';
import pluginsImage from '../assets/plugins.jpg';
import multilingualImage from '../assets/multilingua.jpg';
import hotelWpImage from '../assets/hotel-wp.jpg';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>ROOM RENT</h1>
        <p>Your perfect place to stay!</p>
        <button className="cta-button">BOOK NOW</button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>BEST FEATURES</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={demoImage} alt="Demos" className="feature-image" />
            <h3>DEMOS</h3>
            <p>Explore our interactive demos.</p>
          </div>
          <div className="feature-card">
            <img src={bookingImage} alt="Booking System" className="feature-image" />
            <h3>BOOKING SYSTEM</h3>
            <p>Efficient and user-friendly booking system.</p>
          </div>
          <div className="feature-card">
            <img src={liveEditingImage} alt="Live Editing" className="feature-image" />
            <h3>LIVE EDITING</h3>
            <p>Customize your experience in real-time.</p>
          </div>
          <div className="feature-card">
            <img src={pluginsImage} alt="Plugins" className="feature-image" />
            <h3>PLUGINS</h3>
            <p>Extend functionality with our plugins.</p>
          </div>
          <div className="feature-card">
            <img src={multilingualImage} alt="Multilingual Demo" className="feature-image" />
            <h3>MULTILINGUAL DEMO</h3>
            <p>Supports multiple languages for global users.</p>
          </div>
          <div className="feature-card">
            <img src={hotelWpImage} alt="Hotel WP" className="feature-image" />
            <h3>HOTEL WP</h3>
            <p>Seamless integration with WordPress.</p>
          </div>
        </div>
      </section>

      {/* Exclusive Offer Section */}
      <section className="exclusive-offer-section">
        <h2>TAKE ADVANTAGE OF THIS AMAZING EXCLUSIVE OFFER</h2>
        <p>DON'T MISS THIS OPPORTUNITY FOR YOUR BUSINESS</p>
        <button className="cta-button">BUY NOW AT $5.43</button>
      </section>
    </div>
  );
};

export default Home;