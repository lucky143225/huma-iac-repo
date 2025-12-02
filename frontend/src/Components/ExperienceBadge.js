import { useState, useEffect } from "react";
import { TrophyIcon, XMarkIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/solid";

function ExperienceBadge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show badge after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:block">
      {/* Expanded Card State */}
      <div
        className={`bg-white rounded-2xl shadow-2xl border-2 border-blue-500 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right ${
          isExpanded 
            ? "w-72 opacity-100 scale-100 translate-y-0" 
            : "w-0 h-0 opacity-0 scale-50 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 relative text-center">
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-white mb-2">
            <TrophyIcon className="w-6 h-6 text-white" />
          </div>
          
          <div className="text-3xl font-black text-white">29+</div>
          <div className="text-xs font-bold text-white/90 uppercase">Years of Excellence</div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
            <ChartBarIcon className="w-6 h-6 text-blue-600" />
            <div>
              <div className="font-bold text-gray-800">1000+</div>
              <div className="text-[10px] text-gray-500 uppercase">Projects</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
            <UserGroupIcon className="w-6 h-6 text-purple-600" />
            <div>
              <div className="font-bold text-gray-800">100+</div>
              <div className="text-[10px] text-gray-500 uppercase">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed Button State */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg border-2 border-white transition-all duration-500 hover:scale-110 ${
          isExpanded ? "opacity-0 translate-y-10 pointer-events-none absolute bottom-0 right-0" : "opacity-100 translate-y-0"
        }`}
      >
        <TrophyIcon className="w-8 h-8 animate-pulse" />
        
        {/* Notification Dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    </div>
  );
}

export default ExperienceBadge;
