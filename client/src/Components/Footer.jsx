import React from "react";
//Imported icons
import { FaPhone, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        
        <div className="w-full sm:w-2/5 mb-6 sm:mb-0">
          <a href="/" className="flex items-center mb-4">
            
            <span className="font-bold text-xl">Tutor Finder</span>
          </a>
          <p>Achieve your goals with the perfect tutor.</p>
        </div>
        <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
          <h4 className="font-bold mb-2">Connect With Us</h4>
          <div className="flex justify-start items-center mt-2">
            <a className="hover:text-blue-600 mx-2" href="https://facebook.com">
              <FaFacebook size={28} />
            </a>
            <a className="hover:text-red-500 mx-2" href="https://instagram.com">
              <FaInstagram size={28} />
            </a>
            <a className="hover:text-blue-500 mx-2" href="https://twitter.com">
              <FaTwitter size={28} />
            </a>
            <a className="mx-2" href="https://mail.google.com">
              <FcGoogle size={28} />
            </a>
            <a className="hover:text-blue-600 mx-2" href="tel:+9779844839444">
              <FaPhone size={28} />
            </a>
          </div>
        </div>

        <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p>Phone: +977 9844839444</p>
          <p>Email: tutorfinder@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 mt-10 pt-10">
        <p>© 2024 Tutor Finder. All rights reserved.</p>
        <a href="/privacy" className="hover:text-blue-400 transition-colors">
          Privacy Policy
        </a>{" "}
        |
        <a href="/terms" className="hover:text-blue-400 transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}

export default Footer;
