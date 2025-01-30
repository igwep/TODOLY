// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-customColor   relative text-white w-full  p-4 px-14 z-30  md:px-20">
      <div className=" w-full   flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:bg-white hover:text-customColor px-2 py-1 rounded transition">
            TODOLY
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-8">
          <Link
            to="/"
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Features
          </Link>
          <Link
            to="/"
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            About
          </Link>
        </div>

        {/* Right Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/register"
            className="hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Register
          </Link>
          <Link
            to="/"
            className="bg-white text-customColor py-2 px-4 rounded   transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-customColor border-t border-gray-200">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 bg-white text-customColor text-center rounded-md mx-4 mt-2 hover:bg-customColor hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
