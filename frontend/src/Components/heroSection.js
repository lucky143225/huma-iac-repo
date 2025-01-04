import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import img1 from "../photo1.webp";
import img2 from "../photo2.png";
import img3 from '../photo3.webp';

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

      <div className="container mx-auto px-4 py-32 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Smart Infrastructure
        </h1>
        <p className="text-xl md:text-2xl text-[#26abff] mt-4">
          Modern Urban Planning
        </p>
        <p className="text-sm md:text-base text-gray-300 mt-2">
          Creating world-class infrastructure for tomorrow
        </p>

        {/* Learn More Button */}
        <button className="mt-6 px-6 py-3 bg-[#26abff] text-white rounded-lg shadow-lg transition">
          Learn More
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
