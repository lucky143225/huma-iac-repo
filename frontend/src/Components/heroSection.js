import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import img1 from "../photo1.webp";
import img2 from "../photo2.png";
import img3 from "../photo3.webp";
import Navbar from "./navBar";

function HeroSection() {
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);

  useEffect(() => {
    const firstImage = new Image();
    firstImage.src = img1;
    firstImage.onload = () => setIsFirstImageLoaded(true);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gray-700 text-white min-h-screen flex flex-col">
      {/* Rotating Background Images */}
      {isFirstImageLoaded &&
        images.map((image, index) => (
          <Transition
            key={image}
            show={currentImageIndex === index}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center h-full w-full"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </Transition>
        ))}

      {/* Navigation Menu */}
      <div className="relative z-10 w-full">
        <div className="fixed top-0 w-full bg-blue/70 backdrop-blur-md">
          <Navbar />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative  flex-grow flex items-center justify-center px-6 sm:px-12 md:px-24 text-center">
        <div  className={`${
            currentImageIndex === 0 || currentImageIndex === 2
              ? "text-black"
              : "text-white"
          }`}>
          <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold leading-tight">
            Welcome to Liasion Consultancy Services
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg">
            Explore our services and experience the best we have to offer.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
