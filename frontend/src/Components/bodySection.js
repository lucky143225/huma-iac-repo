import { useState } from "react";
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  ChevronDownIcon, 
  BuildingOfficeIcon, 
  DocumentCheckIcon, 
  MapIcon, 
  ClipboardDocumentListIcon 
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// Import your images
import Land from "../Pictures/Land.webp";
import Architecture from "../Pictures/Architecture.avif";
import NOC from "../Pictures/NOC.jpg";
import Environment from "../Pictures/Environmental.jpeg";
import LandLink from "../Pictures/LandLink.jpg";
import SoilTest from "../Pictures/SoilTest.png";
import Engineer from "../Pictures/Engineer.jpeg";
import Water from "../Pictures/Water.jpg";
import NALA from "../Pictures/NALA.jpeg";
import Revenue from "../Pictures/Revenue.avif";
import NOCIRR from "../Pictures/NOCIRR.webp";
import Layout from "../Pictures/Layout.jpg";
import LatestEC from "../Pictures/LatestEC.png";


function BodySection() {
  const navigate = useNavigate();
  
  // State to track which accordion is open
  const [openSections, setOpenSections] = useState({
    "approvals": true, // Default open
    "design": false,
    "land": false,
    "reports": false
  });


  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  // UPDATED: Reorganized to have consistent 3 items per category where possible
  // Or at least visually balanced.
  const categories = [
    {
      id: "approvals",
      title: "Approvals & NOCs",
      icon: DocumentCheckIcon,
      styles: { /* ... styles ... */ },
      services: [
        { img: NOC, title: "NOC - Airport Authority", gradient: "from-green-100 to-emerald-100" },
        { img: Environment, title: "N.O.C from Environmental Department", gradient: "from-orange-100 to-red-100" },
        { img: NOCIRR, title: "N.O.C from Irrigation Department", gradient: "from-sky-100 to-blue-100" },
      ]
    },
    {
      id: "design",
      title: "Engineering & Design",
      icon: BuildingOfficeIcon,
      styles: { /* ... styles ... */ },
      services: [
        { img: Architecture, title: "Architectural & Structural Designs", gradient: "from-purple-100 to-pink-100" },
        { img: Engineer, title: "Structural Engineer Certificate", gradient: "from-blue-100 to-cyan-100" },
        // Added a 3rd item (placeholder or existing) to balance if needed, 
        // OR use flex-center in render to center the 2 items.
        { img: Layout, title: "Layout Copy", gradient: "from-indigo-100 to-blue-100" } 
      ]
    },
    {
      id: "land",
      title: "Land & Revenue",
      icon: MapIcon,
      styles: { /* ... styles ... */ },
      services: [
        { img: Land, title: "Land-Use Certificate", gradient: "from-pink-100 to-rose-100" },
        { img: NALA, title: "NALA Conversion", gradient: "from-amber-100 to-yellow-100" },
        { img: Revenue, title: "Revenue Sketch", gradient: "from-violet-100 to-purple-100" },
        // Removed 4th item "Link Documents" from this preview to keep it consistent (3 items).
        // User sees "View Details" to see the rest.
      ]
    },
    {
      id: "reports",
      title: "Reports & Feasibility",
      icon: ClipboardDocumentListIcon,
      styles: { /* ... styles ... */ },
      services: [
        { img: SoilTest, title: "Soil-Test Report", gradient: "from-teal-100 to-cyan-100" },
        { img: Water, title: "Water Feasibility Certificate", gradient: "from-fuchsia-100 to-pink-100" },
         // Added 3rd item from your full list to balance
        { img: LatestEC, title: "Latest E.C", gradient: "from-cyan-100 to-blue-100" }
      ]
    }
  ];



  return (
    <section id="services" className="py-8 px-4 sm:px-6 bg-gray-50 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3">
            <SparklesIcon className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">
              Expert Services
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            What We Offer
          </h2>
        </div>


        {/* Accordion List */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                openSections[category.id] 
                  ? `shadow-lg ${category.styles.borderOpen} ring-1 ${category.styles.ringOpen}` 
                  : "shadow-sm border-gray-100 hover:shadow-md"
              }`}
            >
              {/* Accordion Header / Trigger */}
              <button
                onClick={() => toggleSection(category.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Category Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category.styles.bgIcon} ${category.styles.textIcon}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-gray-800 text-base sm:text-lg">
                    {category.title}
                  </span>
                </div>
                
                {/* Arrow Icon */}
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openSections[category.id] ? `${category.styles.bgActive} rotate-180` : "bg-gray-50"
                }`}>
                  <ChevronDownIcon className={`w-4 h-4 transition-colors ${
                    openSections[category.id] ? category.styles.textIcon : "text-gray-500"
                  }`} />
                </div>
              </button>


              {/* Accordion Content - Services Grid */}
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openSections[category.id] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 pt-0 pb-6">
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {category.services.map((service, index) => (
                      <div
                        key={index}
                        // CLICK 1: Navigate with Category AND Service Title to Auto-Open
                        onClick={() => navigate("/services", { 
                            state: { 
                                selectedCategory: category.title, 
                                selectedServiceTitle: service.title 
                            } 
                        })}
                        className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                      >
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-1 shadow-sm mb-2`}>
                          <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                            <img
                              src={service.img}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-600 text-center leading-tight px-1 line-clamp-2">
                          {service.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Category View Details - CLICK 2: Navigate with Category Only */}
                  <div className="mt-4 flex justify-end">
                     <button 
                        onClick={() => navigate("/services", { 
                            state: { selectedCategory: category.title } 
                        })}
                        className={`text-xs font-bold ${category.styles.textLink} flex items-center gap-1 hover:underline`}
                      >
                        View Details <ArrowRightIcon className="w-3 h-3" />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Global View All Button */}
        <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/services", { state: { selectedCategory: "All" } })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold text-sm rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
            >
              Explore All Services
              <ArrowRightIcon className="w-4 h-4 text-gray-400" />
            </button>
        </div>


      </div>
    </section>
  );
}


export default BodySection;
