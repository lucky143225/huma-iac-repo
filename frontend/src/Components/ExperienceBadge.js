import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { XMarkIcon, TrophyIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

function ExperienceBadge() {
  const [count, setCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasSeenOnce, setHasSeenOnce] = useState(false);

  // Hide badge when scrolling, show when stopped
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (!isExpanded) {
        setIsVisible(false);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsVisible(true), 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [isExpanded]);

  // Animated counter from 0 to 29
  useEffect(() => {
    const duration = 2000;
    const steps = 29;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 29) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // Auto-expand on first load after 3 seconds
  useEffect(() => {
    if (!hasSeenOnce) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
        setHasSeenOnce(true);
        // Auto-collapse after 5 seconds
        setTimeout(() => setIsExpanded(false), 2500);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenOnce]);

  return (
    <>
      {/* Desktop Version - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed State - Compact Badge
            <motion.button
              key="collapsed"
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: isVisible ? 1 : 0.8,
                rotate: 0,
                opacity: isVisible ? 1 : 0.7,
              }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(true)}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="relative group"
            >
              {/* Pulsing Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-xl"
              />

              {/* Main Badge Container */}
              <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl shadow-2xl p-5 border-2 border-white/20 backdrop-blur-sm">
                {/* Trophy Icon - Rotating */}
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-3 -right-3"
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg border-2 border-white">
                    <TrophyIcon className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                {/* Check Badge Icon */}
                <CheckBadgeIcon className="absolute -top-2 -left-2 w-7 h-7 text-green-400 drop-shadow-lg" />

                {/* Counter */}
                <div className="text-center">
                  <motion.div
                    className="text-4xl font-black text-white drop-shadow-lg"
                    key={count}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {count}
                    <span className="text-2xl">+</span>
                  </motion.div>
                  <div className="text-xs font-bold text-white/90 uppercase tracking-wider">
                    Years
                  </div>
                  <div className="text-[10px] font-semibold text-white/80 uppercase">
                    Experience
                  </div>
                </div>

                {/* Pulsing Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 border-4 border-white rounded-2xl pointer-events-none"
                />
              </div>

              {/* Click to expand hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Click for details
              </motion.div>
            </motion.button>
          ) : (
            // Expanded State - Detailed Card
            <motion.div
              key="expanded"
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-72 border-2 border-blue-500 overflow-hidden"
            >
              {/* Header with Gradient */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors bg-white/20 rounded-full p-1 hover:bg-white/30"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>

                {/* Trophy Icon */}
                <div className="flex justify-center mb-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                  >
                    <TrophyIcon className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                {/* Main Counter */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-6xl font-black text-white drop-shadow-lg mb-1">
                    {count}
                    <span className="text-4xl">+</span>
                  </div>
                  <div className="text-sm font-bold text-white/90 uppercase tracking-wider">
                    Years of Excellence
                  </div>
                </motion.div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Delivering exceptional consultancy services since{" "}
                  <span className="font-bold text-blue-600">1995</span>
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200"
                  >
                    <ChartBarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl font-black text-blue-600">
                      1000+
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">
                      Projects
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200"
                  >
                    <UserGroupIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-3xl font-black text-purple-600">
                      500+
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">
                      Happy Clients
                    </div>
                  </motion.div>
                </div>

                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckBadgeIcon className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-bold text-green-700">
                      Trusted & Verified Since 1995
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Version - Inline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:hidden mx-auto my-8 w-fit px-4"
      >
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl shadow-2xl p-6 border-2 border-white/20">
          {/* Trophy */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 -right-3"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg border-2 border-white">
              <TrophyIcon className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <CheckBadgeIcon className="absolute -top-2 -left-2 w-7 h-7 text-green-400" />

          <div className="text-center">
            <motion.div
              className="text-5xl font-black text-white"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              29
              <span className="text-3xl">+</span>
            </motion.div>
            <div className="text-sm font-bold text-white/90 mt-1 uppercase tracking-wider">
              Years Experience
            </div>
            <div className="text-xs font-medium text-white/80 mt-1">
              Trusted since 1995
            </div>

            {/* Mobile Stats */}
            <div className="flex gap-4 justify-center mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-[10px] text-white/80">Projects</div>
              </div>
              <div className="w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-[10px] text-white/80">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ExperienceBadge;