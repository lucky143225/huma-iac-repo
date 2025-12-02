import React from "react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Custom Handler for "Projects" / Industry Leaders
  const handleProjectsClick = (e) => {
    e.preventDefault(); // Stop default link behavior

    const targetId = "industry-leaders";
    const isHomePage = location.pathname === "/";

    if (isHomePage) {
      // If already on Home, just scroll
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate Home, then scroll
      navigate("/");
      // Use setTimeout to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="mt-12 bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* 1. Brand */}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              MainPillar
            </h3>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} MainPillar. Est. 1995.
            </p>
          </div>

          {/* 2. Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-300">
            <Link
              to="/about"
              onClick={scrollToTop}
              className="hover:text-blue-400 transition-colors"
            >
              About
            </Link>

            <Link
              to="/services"
              onClick={scrollToTop}
              className="hover:text-blue-400 transition-colors"
            >
              Services
            </Link>

            <Link
              to="/home"
              state={{ targetId: "industry-leaders" }} // MATCH THIS KEY EXACTLY
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Projects
            </Link>

            <Link
              to="/contact-us"
              onClick={scrollToTop}
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* 3. Contact */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <a
              href="tel:+911234567890"
              className="flex items-center gap-2 hover:text-white transition-colors bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700"
            >
              <PhoneIcon className="w-4 h-4 text-blue-400" />
              <span>+91 123 456 7890</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
