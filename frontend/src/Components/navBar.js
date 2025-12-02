import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle window resize to determine mobile/desktop layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.offsetTop;
      const offset = -80; // Offset for fixed header
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  };

  // Mapping links to section IDs
  const scrollMap = {
    Projects: "industry-leaders",
    About: "footer",
  };

  // Main Navigation Logic
  const handleNavClick = (link) => {
    const targetId = scrollMap[link];

    if (link === "Online Services") {
      navigate("/services");
    } else if (link === "Contact Us") {
      navigate("/contact-us");
    } else if (link === "About") {
      navigate("/about");
    } else if (location.pathname !== "/") {
      // If not on home page, navigate home first with target state
      navigate("/home", { state: { targetId } });
    } else if (targetId) {
      // If already on home page, just scroll
      handleScrollTo(targetId);
    }
    
    // Always close sidebar after clicking a link
    setSidebarOpen(false);
  };

  const navLinks = [
    "About",
    "Projects",
    "Online Services",
    "Contact Us",
  ];

  return (
    <>
      {/* Main Navbar - Fixed, Translucent */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md shadow-md transition-all duration-300"
        style={{
          height: "7vh",
          minHeight: "56px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 relative flex items-center justify-between lg:justify-between">
          
          {/* Mobile Left: Home Icon */}
          <div className="lg:hidden flex-shrink-0 w-10">
            <button
              onClick={() => navigate("/")}
              className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
              aria-label="Home"
            >
              <HomeIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Logo Section - Centered on Mobile, Left on Desktop */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 flex flex-col items-center lg:items-start group"
          >
            <h1 className="flex flex-col text-lg sm:text-xl font-bold text-gray-900 leading-tight drop-shadow-sm text-center lg:text-left group-hover:text-blue-600 transition-colors">
              <span>MainPillar</span>
            </h1>
            <p className="hidden sm:block text-[10px] sm:text-xs text-gray-800 font-medium leading-tight text-center lg:text-left">
              Excellence Since 1995
            </p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="px-4 py-2 text-sm font-semibold text-gray-900 rounded-lg transition-all duration-200 relative group  hover:text-blue-700"
                  >
                    {link}
                    {/* Animated underline effect */}
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-1/2 rounded-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Right: Menu Button */}
          <div className="lg:hidden flex items-center justify-end w-10">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 -mr-2 text-gray-900  rounded-lg transition-colors active:scale-95"
              aria-label="Open Menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar / Mobile Drawer */}
      {sidebarOpen && (
        <>
          {/* Dark Backdrop with Fade Animation */}
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          />

          {/* Sidebar Content Panel */}
          <div
            className={`fixed ${
              isMobile
                ? "bottom-0 left-0 right-0 rounded-t-3xl h-[70vh] animate-slide-up"
                : "top-0 right-0 h-full w-80 rounded-l-3xl animate-slide-left"
            } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-50 shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* Decorative Background Glows */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl" />
            </div>

            {/* Inner Content */}
            <div className="relative h-full flex flex-col p-6 z-10">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white tracking-wide">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                  aria-label="Close Menu"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-300" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => handleNavClick(link)}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold group flex items-center justify-between text-gray-100 active:bg-white/20"
                      >
                        <span className="text-base sm:text-lg">{link}</span>
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400">
                          →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="pt-6 border-t border-white/10 mt-auto">
                <p className="text-center text-xs text-gray-400 font-medium">
                  © {new Date().getFullYear()} MainPillar. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
