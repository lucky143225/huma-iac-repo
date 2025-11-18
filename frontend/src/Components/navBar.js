import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  Bars3Icon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const firstname = JSON.parse(localStorage.getItem("userInfo"))?.firstname;
  const lastname = JSON.parse(localStorage.getItem("userInfo"))?.lastname;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.offsetTop;
      const offset = -80;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  };

  const scrollMap = {
    Projects: "clients",
    About: "footer",
    Notifications: "notifications",
  };

  const handleNavClick = (link) => {
    const targetId = scrollMap[link];
    if (link === "Online Services") {
      navigate("/services");
    } else if (link === "Contact Us") {
      navigate("/contact-us");
    } else if (link === "About") {
      navigate("/about");
    } else if (location.pathname !== "/home") {
      navigate("/home", { state: { targetId } });
    } else if (targetId) {
      handleScrollTo(targetId);
    }
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setSidebarOpen(false);
    navigate("/login");
  };

  const navLinks = [
    "About",
    "Projects",
    "Online Services",
    "Notifications",
    "Contact Us",
  ];

  return (
    <>
      {/* Main Navbar - Fully Transparent with Black Text */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md shadow-md"
        style={{
          height: "7vh",
          minHeight: "56px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <div
              onClick={() => navigate("/home")}
              className="cursor-pointer flex-shrink-0"
            >
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight drop-shadow-sm">
                Liaison Consultancy
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-800 font-medium leading-tight">
                Excellence Since 1995
              </p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleNavClick(link)}
                      className="px-3 py-1.5 text-sm font-semibold text-gray-900 rounded-lg transition-all duration-200 relative group hover:bg-gray-900/10 hover:text-gray-700"
                    >
                      {link}
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-3/4" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Account Button Desktop
              {firstname ? (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs text-white">
                    {firstname[0]}
                    {lastname[0]}
                  </div>
                  <span className="hidden xl:inline text-sm">{firstname}</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-1.5 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-200 text-sm"
                >
                  Login
                </button>
              )} */}
            </div>

            {/* Mobile Hamburger & Account */}
            <div className="flex lg:hidden items-center gap-2">
              {firstname && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shadow-md text-sm"
                >
                  {firstname[0]}
                  {lastname[0]}
                </button>
              )}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-gray-900 hover:bg-gray-900/10 rounded-lg transition-colors"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar/Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{
                x: isMobile ? 0 : "100%",
                y: isMobile ? "100%" : 0,
              }}
              animate={{
                x: 0,
                y: 0,
              }}
              exit={{
                x: isMobile ? 0 : "100%",
                y: isMobile ? "100%" : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed ${
                isMobile
                  ? "bottom-0 left-0 right-0 rounded-t-3xl h-[85vh]"
                  : "top-0 right-0 h-full w-80 rounded-l-3xl"
              } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-50 shadow-2xl overflow-hidden`}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
              </div>

              <div className="relative h-full flex flex-col p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Menu</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* User Section */}
                {firstname && (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg text-white">
                        {firstname[0]}
                        {lastname[0]}
                      </div>
                      <div>
                        <p className="font-bold text-base text-white">
                          {firstname} {lastname}
                        </p>
                        <p className="text-xs text-gray-300">Welcome back!</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          navigate("/my-account");
                          setSidebarOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-colors text-white"
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        Account
                      </button>
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setSidebarOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-colors text-white"
                      >
                        <ChartBarIcon className="w-4 h-4" />
                        Dashboard
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto">
                  <ul className="space-y-1">
                    {navLinks.map((link) => (
                      <li key={link}>
                        <button
                          onClick={() => handleNavClick(link)}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold group flex items-center justify-between text-white"
                        >
                          {link}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {!firstname ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setSidebarOpen(false);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Login / Sign Up
                    </button>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl font-bold transition-all text-white"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
