// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // Importing Link from react-scroll
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-customColor relative text-white w-full p-4 px-14 z-30 md:px-20">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:bg-white hover:text-customColor px-2 py-1 rounded transition">
            TODOLY
          </a>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-8">
          <ScrollLink
            to="hero"  // Section ID to scroll to
            smooth={true}
            duration={500}
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="benefits"  // Section ID to scroll to
            smooth={true}
            duration={500}
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="addtask"  // Section ID to scroll to
            smooth={true}
            duration={500}
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="price"  // Section ID to scroll to
            smooth={true}
            duration={500}
            className="text-lg font-medium hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Pricing
          </ScrollLink>
        </div>

        {/* Right Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/signup-page"
            className="hover:bg-white hover:text-customColor px-2 py-1 rounded transition"
          >
            Register
          </Link>
          <a
            href="/login-page"
            className="bg-white text-customColor py-2 px-4 rounded transition"
          >
            Login
          </a>
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
          <ScrollLink
            to="home"  // Scroll to Home section
            smooth={true}
            duration={500}
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="features"  // Scroll to Features section
            smooth={true}
            duration={500}
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="about"  // Scroll to About section
            smooth={true}
            duration={500}
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </ScrollLink>
          <a
            href="/register"
            className="block px-4 py-2 hover:bg-white hover:text-customColor rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </a>
          <a
            href="/login-page"
            className="block px-4 py-2 bg-white text-customColor text-center rounded-md mx-4 mt-2 hover:bg-customColor hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
