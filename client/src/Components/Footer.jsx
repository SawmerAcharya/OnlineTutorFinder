import React from "react";
import { FaPhone, FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-12"> {/* Change to light orange gradient */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="flex items-center text-gray-200">
            <FaMapMarkerAlt className="mr-2 text-orange-300" />
            Kathmandu
          </p>
          <p className="flex items-center mt-2 text-gray-200">
            <FaPhone className="mr-2 text-orange-300" />
            98488484848
          </p>
          <p className="flex items-center mt-2 text-gray-200">
            <FaEnvelope className="mr-2 text-orange-300" />
            contact@tutorfinder.com
          </p>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="text-gray-200">
            Tutor Finder connects students with expert tutors to unlock their full potential and achieve academic excellence.
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-orange-400 transition">
              <FaFacebook size={30} />
            </a>
            <a href="https://instagram.com" className="hover:text-orange-400 transition">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
