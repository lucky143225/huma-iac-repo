import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../Components/navBar";
import { useNavigate, useLocation } from "react-router-dom";
import { services } from "../data/servicesData"; // Shared Data Import

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Approvals & NOCs",
    "Engineering & Design",
    "Land & Revenue",
    "Reports & Feasibility",
  ];

  // Handle Incoming Navigation State
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedCategory) {
        setActiveCategory(location.state.selectedCategory);
      }

      if (location.state.selectedServiceTitle) {
        const targetService = services.find(
          (s) =>
            s.title.toLowerCase() ===
            location.state.selectedServiceTitle.toLowerCase()
        );

        if (targetService) {
          setSelectedService(targetService);
          if (!location.state.selectedCategory) {
            setActiveCategory(targetService.category);
          }
          setTimeout(() => {
            const detailElement = document.getElementById("service-detail-view");
            if (detailElement) {
              detailElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 300);
        }
      } else {
        setTimeout(() => {
          const gridStart = document.getElementById("services-grid-start");
          if (gridStart) {
            const yOffset = -120;
            const y =
              gridStart.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [location.state]);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setTimeout(() => {
      document
        .getElementById("service-detail-view")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero & Search Section */}
      <div className="pt-24 pb-8 px-4 bg-white shadow-sm rounded-b-3xl mb-8">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Our Services
          </h1>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Category Filter Tabs */}
          <div
            id="services-grid-start"
            className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center px-2 scroll-mt-32"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedService(null);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105" // UPDATED GRADIENT
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail View Area */}
      <div id="service-detail-view" className="scroll-mt-28 px-4 mb-8 transition-all duration-500 ease-in-out">
         <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedService ? 'max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
            {selectedService && (
               <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative group min-h-[400px] flex flex-col justify-center">
                 
                 {/* Background Image Layer */}
                 <div className="absolute inset-0 z-0">
                    <img 
                      src={selectedService.image} 
                      alt="" 
                      className="w-full h-full object-cover opacity-40" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/40"></div>
                 </div>

                 {/* Content Layer */}
                 <div className="relative z-10 p-6 sm:p-10 flex flex-col items-center text-center">
                    
                    <button 
                       onClick={() => setSelectedService(null)}
                       className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all shadow-sm border border-white/20"
                    >
                       <XMarkIcon className="w-6 h-6" />
                    </button>

                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight mt-4 drop-shadow-sm">
                      {selectedService.title}
                    </h2>
                    
                    <p className="text-gray-700 font-medium mb-8 text-sm sm:text-base max-w-xl leading-relaxed drop-shadow-sm">
                      {selectedService.description}
                    </p>
                    
                    <div className="w-full max-w-md text-left bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm mb-8">
                       <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                         <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                         Key Requirements
                       </h3>
                       <ul className="space-y-3">
                          {selectedService.keyPoints?.map((point, i) => (
                             <li key={i} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                                <span className="text-sm text-gray-800 font-medium leading-snug">{point}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                    
                    {/* CTA Button - Updated Gradient */}
                    <button 
                       onClick={() => {
                        navigate('/contact-us', { 
                          state: { 
                            selectedService: selectedService.title,
                            selectedServiceDescription: selectedService.description
                          } 
                        });
                       }}
                       className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0"
                    >
                       Enquiry Now
                    </button>
                 </div>
               </div>
            )}
         </div>
      </div>

      {/* Filtered Grid */}
      <div className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {activeCategory} Services{" "}
            <span className="text-gray-400 text-sm font-normal">
              ({filteredServices.length})
            </span>
          </h2>
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline"
            >
              <ArrowPathIcon className="w-4 h-4" /> Reset
            </button>
          )}
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service)}
                className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col items-center text-center transform hover:-translate-y-1 ${
                  selectedService?.title === service.title
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <div className="w-12 h-12 mb-3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 animate-fade-in">
            <p className="text-gray-500">No services found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-2 text-blue-600 font-bold hover:underline"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
