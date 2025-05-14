import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDoorAnimation, setShowDoorAnimation] = useState(false);  // Track animation state
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowDoorAnimation(true);  // Trigger the door animation when logging out

    // Simulate door animation with a timeout before navigating to login page
    setTimeout(() => {
      localStorage.removeItem('user'); // Clear user data from localStorage
      navigate('/login'); // Redirect to login page
    }, 2000);  // Duration matches animation time
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/home">RentNest</Link> {/* Home link */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link> {/* Home link */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-details">Profile</Link> {/* User details page */}
            </li>
            <li className="nav-item">
  <Link className="nav-link" to="/book">Book</Link>
</li>
<li>
  <Link className="nav-link" to="/admin/notifications">Admin Notifications</Link>
</li>
<li>
  <Link className="nav-link" to="/admin-announcements">Admin Announcements</Link>
</li>





            <li className="nav-item">
              <button className="nav-link btn btn-light" onClick={handleLogout}>Logout</button> {/* Logout button */}
            </li>
          </ul>
        </div>
      </div>

      {/* Door Animation */}
      {showDoorAnimation && (
        <div className="door-animation">
          <div className="door left-door">
            <div className="door-handle"></div>
            <div className="keyhole"></div>
          </div>
          <div className="door right-door">
            <div className="door-handle"></div>
            <div className="keyhole"></div>
          </div>
          <div className="welcome-message">See you again!</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
