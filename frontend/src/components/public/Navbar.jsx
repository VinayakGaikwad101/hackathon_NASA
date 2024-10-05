import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://img.icons8.com/doodle/48/internet--v1.png"
            alt="Logo"
            className="h-10 rounded-lg animate-spin"
          />
          <span className="ml-2 text-white font-bold text-3xl">
            Community Mapping
          </span>
        </div>
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white">
              HeatMap
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-white">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>

      {/* mobile menu  */}
      {isMenuOpen ? (
        <ul className="flex-col md:hidden ">
          <li className="py-2">
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link to="/about" className="text-white">
              HeatMap
            </Link>
          </li>
          <li className="py-2">
            <Link to="/login" className="text-white">
              Login
            </Link>
          </li>
          <li className="py-2">
            <Link to="/signup" className="text-white">
              Sign Up
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;
