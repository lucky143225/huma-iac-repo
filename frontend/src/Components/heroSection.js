import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import img1 from "../photo1.webp";
import img2 from "../photo2.png";
import img3 from "../photo3.webp";
import Navbar from "./navBar";

function HeroSection() {
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const firstImage = new Image();
    firstImage.src = img1;
    firstImage.onload = () => setIsFirstImageLoaded(true);
  }, []);

  useEffect(() => {
    // Preload next image
    const nextIndex = (currentImageIndex + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.src = images[nextIndex];
      img.onload = () => {
        setLoadedImages(new Set([...loadedImages, nextIndex]));
      };
    }
  }, [currentImageIndex, images, loadedImages]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex flex-col overflow-hidden">
      {/* Rotating Background Images with Parallax */}
      {isFirstImageLoaded &&
        images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ y: currentImageIndex === index ? y : 0 }}
            className="absolute inset-0 bg-cover bg-center h-full w-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center h-full w-full"
              style={{
                backgroundImage: `url(${image})`,
                willChange: "opacity, transform",
              }}
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          </motion.div>
        ))}

      <Navbar />

      {/* Hero Content with Animations */}
      <div className="relative flex-grow flex items-center justify-center px-6 sm:px-12 md:px-24 text-center z-10">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-2xl"
          >
            Welcome to Liaison Consultancy Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-lg"
          >
            Professional consulting services with 29+ years of excellence in
            project management and regulatory compliance.
          </motion.p>

          {/* Experience Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-blue-400">29+</div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">
                  Years of
                </div>
                <div className="text-sm font-semibold text-gray-300">
                  Experience
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
