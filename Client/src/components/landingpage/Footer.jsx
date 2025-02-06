// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-customColor text-white py-10 px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold text-white">TODOLY</h2>
          <p className="text-white mt-2 leading-relaxed">
            A simple and powerful way to manage your daily tasks efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-white hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-white transition">About</Link>
            </li>
            <li>
              <Link to="/features" className="text-white hover:text-white transition">Features</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-white transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <img src="/assets/images/whiteFacebook.svg" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <img src="/assets/images/whiteInstagram.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <img src="/assets/images/whiteX.svg" alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} TODOLY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
