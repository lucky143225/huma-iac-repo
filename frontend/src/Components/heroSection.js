import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import img1 from "../photo1.webp";
import img2 from "../photo2.png";
import img3 from '../photo3.webp';
import Navbar from "./navBar";

// rgb(236,255,252)

function HeroSection() {
  const images = [img1,img2,img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    // Set up interval for automatic image change
    const interval = setInterval(nextImage, 5000); // 3 seconds interval

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); 

  return (
    <section className="relative bg-gray-700 text-white h-[70vh]">
      {/* Carousel Background Images */}
      {images.map((image, index) => (
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
            className="absolute inset-0 bg-cover bg-center h-full"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </Transition>
      ))}
   
      {/* Navigation Menu */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
      
      <div className="fixed top-0 w-full bg-blue/70 backdrop-blur-md">
      <Navbar />
      
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
