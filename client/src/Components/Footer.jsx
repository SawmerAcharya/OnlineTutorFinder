import React from "react";
import { FaPhone, FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-14">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Contact Information */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center text-gray-300"><FaMapMarkerAlt className="mr-2" /> 21 Revolution Street, Paris, France</p>
          <p className="flex items-center text-gray-300 mt-2"><FaPhone className="mr-2" /> +1 555 123456</p>
          <p className="flex items-center text-gray-300 mt-2"><FaEnvelope className="mr-2" /> support@tutorfinder.com</p>
        </div>
        
        {/* About the Company */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">About Tutor Finder</h3>
          <p className="text-gray-300">Connecting students with expert tutors to achieve their learning goals effectively.</p>
        </div>
        
        {/* Social Media Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a className="text-gray-300 hover:text-blue-500 transition" href="https://facebook.com">
              <FaFacebook size={28} />
            </a>
            <a className="text-gray-300 hover:text-red-500 transition" href="https://instagram.com">
              <FaInstagram size={28} />
            </a>
            <a className="text-gray-300 hover:text-blue-400 transition" href="https://twitter.com">
              <FaTwitter size={28} />
            </a>
            <a className="text-gray-300 hover:text-green-500 transition" href="https://mail.google.com">
              <FcGoogle size={28} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-600 pt-6">
        <p>© 2024 Tutor Finder. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
