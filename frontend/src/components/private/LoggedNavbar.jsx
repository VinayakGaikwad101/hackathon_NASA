import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../utils/Toast";

const LoggedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = (e) => {
    localStorage.removeItem("loggedUserEmail");
    localStorage.removeItem("loggedUserIP");
    handleSuccess("User logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
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
            <Link to="/profile" className="text-white">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/map" className="text-white">
              Map
            </Link>
          </li>
          <li>
            <button onClick={handleLogOut} className="text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* mobile menu */}
      {isMenuOpen ? (
        <ul className="flex-col md:hidden">
          <li className="py-2">
            <Link to="/profile" className="text-white">
              Profile
            </Link>
          </li>
          <li className="py-2">
            <Link to="/view-profile" className="text-white">
              View Profile
            </Link>
          </li>
          <li className="py-2">
            <button onClick={handleLogOut} className="text-white">
              Logout
            </button>
          </li>
        </ul>
      ) : null}
      <ToastContainer />
    </nav>
  );
};

export default LoggedNavbar;
