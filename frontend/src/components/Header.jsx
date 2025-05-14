import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-semibold tracking-wide">Rent Nest</h1>
      <nav className="space-x-6">
        <Link 
          to="/home" 
          className="text-white hover:text-gray-200 transition duration-300"
        >
          Home
        </Link>
        <Link 
          to="/adminAnnouncements" 
          className="text-white hover:text-gray-200 transition duration-300"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;