import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import img1 from "../photo1.webp";
import img2 from "../photo2.png";
import img3 from "../photo3.webp";
import Navbar from "./navBar";

function HeroSection() {
  const navigate = useNavigate();
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const firstImage = new Image();
    firstImage.src = img1;
    firstImage.onload = () => setIsFirstImageLoaded(true);
  }, []);

  // Preload images logic
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.src = images[nextIndex];
      img.onload = () => {
        setLoadedImages(new Set([...loadedImages, nextIndex]));
      };
    }
  }, [currentImageIndex, images, loadedImages]);

  // Rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Hide scroll hint on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToEnquiry = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex flex-col overflow-hidden">
      {/* Background Images */}
      {isFirstImageLoaded &&
        images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center h-full w-full transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          </div>
        ))}

      <Navbar />

      {/* Main Content */}
      <div className="relative flex-grow flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 text-center z-10 pt-12 pb-20">
        <div className="max-w-5xl w-full animate-fade-in-up">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl animate-slide-down mb-4 sm:mb-6">
            Welcome to <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              MainPillar
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-lg max-w-3xl mx-auto mb-8 sm:mb-10 animate-slide-up animation-delay-200 px-2">
            Professional consulting services with excellence in project
            management and regulatory compliance.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-3xl mx-auto mb-10 animate-scale-in animation-delay-400">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-4 border border-white/10">
              <TrophyIcon className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-1 sm:mb-2" />
              <div className="text-lg sm:text-3xl font-bold text-white">
                29+
              </div>
              <div className="text-[10px] sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Years
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-4 border border-white/10">
              <ChartBarIcon className="w-5 h-5 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-1 sm:mb-2" />
              <div className="text-lg sm:text-3xl font-bold text-white">
                100+
              </div>
              <div className="text-[10px] sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Projects
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-4 border border-white/10">
              <UserGroupIcon className="w-5 h-5 sm:w-8 sm:h-8 text-green-400 mx-auto mb-1 sm:mb-2" />
              <div className="text-lg sm:text-3xl font-bold text-white">
                100+
              </div>
              <div className="text-[10px] sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Clients
              </div>
            </div>
          </div>

          {/* Single "Contact Us" Button - Fixed Width & Original Color */}
          <div className="animate-fade-in animation-delay-600 flex justify-center">
            <button
              onClick={() => navigate("/contact-us", { state: { showServiceDropdown: true } })}
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-lg min-w-[200px] px-8 py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95"
              style={{ minHeight: "56px" }}
            >
              <span>Get Free Consultation</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl ring-2 ring-white/30 group-hover:ring-white/50 animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-500 ${
          showScrollHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          {/* <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">Scroll</span> */}
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm bg-black/10">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>

      {/* Image Pagination Dots */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 sm:bottom-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentImageIndex === index
                ? "bg-blue-500 w-8"
                : "bg-white/30 w-2 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
