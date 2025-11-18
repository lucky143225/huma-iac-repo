import React from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import playStore from "../playstore.png";
import appStore from "../appstore.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative mt-12 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
      id="footer"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Liaison Consultancy
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Your one-stop destination for real estate consultancy since 1995.
            </p>
            <div className="flex gap-2 pt-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="http://instagram.com"
                className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="http://facebook.com"
                className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="http://youtube.com"
                className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Quick Links</h4>
            <ul className="space-y-1">
              {["About", "Services", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-xs flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-3 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-gray-300 text-xs">
                <MapPinIcon className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-xs">
                <PhoneIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-blue-400">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-xs">
                <EnvelopeIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:info@Liaison.com"
                  className="hover:text-blue-400"
                >
                  info@Liaison.com
                </a>
              </div>
            </div>
          </div>

          {/* Download App */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Get Our App</h4>
            <div className="flex flex-col gap-2">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
              >
                <img
                  src={playStore}
                  alt="Google Play"
                  className="h-9 w-auto rounded-lg hover:shadow-lg transition-shadow"
                />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
              >
                <img
                  src={appStore}
                  alt="App Store"
                  className="h-9 w-auto rounded-lg hover:shadow-lg transition-shadow"
                />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <p className="text-gray-400 text-center sm:text-left">
              © 2024 Liaison Consultancy. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all z-50 group"
      >
        <ArrowUpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-y-[-2px] transition-transform" />
      </motion.button> */}
    </footer>
  );
};

export default Footer;
