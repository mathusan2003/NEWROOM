import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile"; // Optional if you use this
import UserDetails from "./UserDetails";
import ForgotPassword from './ForgotPassword';
import HomePageComponent from "../pages/HomePage";
import AdminNotifications from "../pages/AdminNotifications";
import AdminAnnouncements from "../pages/AdminAnnouncements";
import Sidebar from "./Sidebar"; // If you're using it somewhere

// Layout component that wraps routes
function Layout() {
  const location = useLocation();

  // Routes where Navbar and Footer should be hidden
  const hideNavbarAndFooter = [
    "/login",
    "/register",
    "/admin/notifications",
    "/admin-announcements"
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}

      <div style={{ marginTop: "-3.5rem" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/book" element={<HomePageComponent />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin-announcements" element={<AdminAnnouncements />} />
        </Routes>
      </div>

      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

// App component with router
function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
