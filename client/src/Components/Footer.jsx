import React from "react";
import { FaPhone, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">Tutor Finder</h2>
          <p className="text-gray-400">Achieve your goals with the perfect tutor.</p>
        </div>
        
        {/* Connect With Us */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a className="text-gray-400 hover:text-blue-600 transition" href="https://facebook.com">
              <FaFacebook size={28} />
            </a>
            <a className="text-gray-400 hover:text-red-500 transition" href="https://instagram.com">
              <FaInstagram size={28} />
            </a>
            <a className="text-gray-400 hover:text-blue-500 transition" href="https://twitter.com">
              <FaTwitter size={28} />
            </a>
            <a className="text-gray-400 hover:text-green-500 transition" href="https://mail.google.com">
              <FcGoogle size={28} />
            </a>
            <a className="text-gray-400 hover:text-blue-400 transition" href="tel:+9779844839444">
              <FaPhone size={28} />
            </a>
          </div>
        </div>
        
        {/* Contact Us */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Phone: +977 9844839444</p>
          <p className="text-gray-400">Email: tutorfinder@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/services" className="hover:text-white transition">Services</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        <p>© 2024 Tutor Finder. All rights reserved.</p>
        <div className="space-x-3 mt-2">
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
