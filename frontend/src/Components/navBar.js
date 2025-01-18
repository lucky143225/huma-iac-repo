import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State for mobile responsiveness
  const firstname = JSON.parse(localStorage.getItem("userInfo"))?.firstname;
  const lastname = JSON.parse(localStorage.getItem("userInfo"))?.lastname;

  useEffect(() => {
    // Check screen size for mobile or desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set to mobile size breakpoint
    };
    handleResize(); // Initialize on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.offsetTop;
      const offset = -80; // Adjust for fixed headers or margins
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  };

  const scrollMap = {
    "Projects": "clients",
    "Contact Us": "footer",
    "About": "footer",
    "Notifications": "notifications",
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setSidebarOpen(false)
  };

  return (
    <nav className="bg-blue/70 backdrop-blur-md shadow-md h-[7vh]">
      <div className="flex flex-row items-center justify-between sm:px-4">
        {/* Left Side: Logo */}
        <div className="flex flex-col">
          <h1
            className="sm:text-2xl font-bold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate('/home')}
          >
            Liasion Consultancy Services
          </h1>
          <span className="sm:text-sm text-gray-600 font-medium opacity-1">
            Excellence in Professional Consulting
          </span>
        </div>

        {/* Center: Years of Experience Text */}
        <div className="hidden  sm:flex text-center px-4  animate-pulsePopUp items-center pt-2 left-[-2rem]">
          <span className="text-3xl font-bold pr-2">𝟸𝟿+</span>
          <span className="text-xl">𝒴𝑒𝒶𝓇𝓈 𝐸𝓍𝓅𝑒𝓇𝒾𝑒𝓃𝒸𝑒</span>
        </div>

        {/* Right Side: Desktop Menu and Mobile Hamburger Button */}
        <div className="flex items-center gap-2">
          {/* Hamburger Icon for Mobile */}
          {/* <button
            onClick={handleSidebarToggle}
            className="lg:hidden text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center justify-center space-x-5 text-gray-900 font-semibold">
            {["About", "Projects", "Online Services", "Notifications", "Contact Us"].map((link) => (
              <li
                key={link}
                className="text-base hover:text-green-300 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  const targetId = scrollMap[link];
                  if (link === "Online Services") {
                    navigate("/services");
                  } else if (location.pathname !== "/home") {
                    navigate("/home", { state: { targetId } });
                  } else if (targetId) {
                    handleScroll(targetId);
                  }
                }}
              >
                {link}
              </li>
            ))}
          </ul>

          {/* Login/Account Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (firstname) {
                  handleSidebarToggle();
                } else {
                  navigate('/login');
                }
              }}
              className={
                firstname
                  ? 'w-full text-xl p-2 bg-[#26abff] text-white rounded-full font-semibold space-x-2 uppercase'
                  : 'px-6 py-2 bg-[#26abff] text-white rounded-lg font-semibold focus:outline-none focus:ring-2 transition duration-200'
              }
            >
              {firstname ? firstname[0] + ' ' + lastname[0] : 'Login'}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={sidebarOpen}
        enter="transform transition duration-300 ease-in-out"
        enterFrom="translate-y-full sm:translate-y-full"
        enterTo="translate-y-0 sm:translate-y-0"
        leave="transform transition duration-300 ease-in-out"
        leaveFrom="translate-y-0 sm:translate-x-0"
        leaveTo="translate-y-full sm:translate-x-full"
      >
        <div className="fixed sm:top-0 sm:right-0 w-full h-[93vh] sm:w-64 sm:h-[100vh]  bg-black bg-opacity-80 backdrop-blur-[90%] text-white z-50 shadow-lg">
          <div className="flex flex-col p-4  ">
            <button
              onClick={() => {
                // navigate('/myaccount'); // Navigate to My Account
                // setSidebarOpen(false);
              }}
              className="py-2 px-4 text-lg font-semibold text-white  rounded mt-10 mb-4"
            >
              My Account
            </button>
            <ul className="lg:hidden flex flex-col items-center justify-center text-gray-900 font-semibold">
              {["About", "Projects", "Online Services", "Notifications", "Contact Us"].map((link) => (
                <li
                  key={link}
                  className="py-2 px-4 text-lg font-semibold text-white  rounded mb-4"
                  onClick={() => {
                    const targetId = scrollMap[link];
                    if (link === "Online Services") {
                      navigate("/services");
                    } else if (location.pathname !== "/home") {
                      navigate("/home", { state: { targetId } });
                    } else if (targetId) {
                      handleScroll(targetId);
                    }
                  }}
                >
                  {link}
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogout} // Handle logout
              className=" px-4 text-lg font-semibold text-white  rounded"
            >
              Logout
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="sm:absolute sm:top-0 mt-7 sm:mt-0 text-white text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      </Transition>




    </nav>
  );
}

export default Navbar;
