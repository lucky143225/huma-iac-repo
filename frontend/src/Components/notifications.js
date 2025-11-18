import {
  BellIcon,
  ArrowRightIcon,
  ClockIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { getRelativeTime } from "./utils";

function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "info",
      icon: InformationCircleIcon,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      title: "TDR Platform Digitized",
      message:
        "All TDRs under HMDA jurisdiction are now processed exclusively online. Apply for digital TDR certificates today.",
      badge: "NEW",
      badgeColor: "bg-blue-500",
      startDate: "2025-11-18T10:00:00",
    },
    {
      id: 2,
      type: "success",
      icon: CheckCircleIcon,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      title: "TG-bPASS Now Active",
      message:
        "Building permissions, O.C, and layout approvals now processed through TG-bPASS. Apply at tgbpass.telangana.gov.in",
      badge: "UPDATED",
      badgeColor: "bg-green-500",
      startDate: "2025-11-11T14:30:00",
    },
    {
      id: 3,
      type: "warning",
      icon: ExclamationTriangleIcon,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-500",
      title: "Manual TDR Certificates",
      message:
        "Digitize your manual TDR certificates now. Complete migration required for all future transactions.",
      badge: "ACTION REQUIRED",
      badgeColor: "bg-amber-500",
      startDate: "2025-11-04T09:15:00",
    },
  ];

  const services = [
    {
      img: Engineer,
      alt: "Structural Engineer Certificate Service",
      title: "Structural Engineer Certificate",
      gradient: "from-blue-100 to-cyan-100",
    },
    {
      img: Architecture,
      alt: "Architectural and Structural Design Service",
      title: "Architectural & Structural Designs",
      gradient: "from-purple-100 to-pink-100",
    },
    {
      img: NOC,
      alt: "Airport Authority NOC Service",
      title: "NOC - Airport Authority",
      gradient: "from-green-100 to-emerald-100",
    },
    {
      img: Environment,
      alt: "Environmental NOC Service",
      title: "Environmental NOC",
      gradient: "from-orange-100 to-red-100",
    },
    {
      img: LandLink,
      alt: "Link Documents Service",
      title: "Link Documents",
      gradient: "from-indigo-100 to-blue-100",
    },
    {
      img: Land,
      alt: "Land and Zone Conversion Service",
      title: "Land & Zone Conversion",
      gradient: "from-pink-100 to-rose-100",
    },
    {
      img: SoilTest,
      alt: "Soil Test Report Service",
      title: "Soil-Test Report",
      gradient: "from-teal-100 to-cyan-100",
    },
    {
      img: NALA,
      alt: "NALA Conversion Service",
      title: "NALA Conversion",
      gradient: "from-amber-100 to-yellow-100",
    },
    {
      img: Revenue,
      alt: "Revenue Sketch Service",
      title: "Revenue Sketch",
      gradient: "from-violet-100 to-purple-100",
    },
    {
      img: NOCIRR,
      alt: "Irrigation Department NOC Service",
      title: "Irrigation Department NOC",
      gradient: "from-sky-100 to-blue-100",
    },
    {
      img: Water,
      alt: "Water Feasibility Certificate Service",
      title: "Water Feasibility Certificate",
      gradient: "from-fuchsia-100 to-pink-100",
    },
  ];

  return (
    <div
      className="flex flex-col justify-around lg:flex-row my-6 mx-4 mt-20 lg:mx-10 rounded-2xl min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      id="notifications"
    >
      {/* Left Column - Notifications */}
      <div className="my-4 lg:w-2/5 lg:pr-8 space-y-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
          Latest Updates
        </h2>

        <div className="space-y-3">
          {notifications.map((notification, index) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`${notification.bgColor} ${notification.borderColor} border-l-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-slideInRight overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <IconComponent
                        className={`w-6 h-6 ${notification.iconColor} flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-gray-900">
                            {notification.title}
                          </h3>
                          <span
                            className={`${notification.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              notification.badge === "NEW" ? "animate-pulse" : ""
                            }`}
                          >
                            {notification.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs ml-2 flex-shrink-0">
                      <ClockIcon className="w-3 h-3" />
                      <span className="whitespace-nowrap">
                        {getRelativeTime(notification.startDate)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed ml-9">
                    {notification.message}
                  </p>

                  <button className="mt-3 ml-9 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                    Learn more
                    <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300">
          View All Notifications
        </button>
      </div>

      {/* Right Column - Services with SMALLER ROUND ICONS */}
      <div className="w-full lg:w-1/2 my-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <SparklesIcon className="w-6 h-6 text-purple-500 animate-pulse" />
          <h1 className="font-black text-3xl lg:text-4xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            OUR SERVICES
          </h1>
          <SparklesIcon className="w-6 h-6 text-pink-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => navigate("/services")}
            >
              {/* Smaller Round Icon with Gradient Background */}
              <div
                className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${service.gradient} p-1 shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-white`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-all">
                  <img
                    src={service.img}
                    alt={service.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="mt-3 text-xs lg:text-sm font-bold text-gray-900 text-center group-hover:text-blue-600 transition-colors px-2 leading-tight">
                {service.title}
              </h3>
            </motion.div>
          ))}

          {/* View All Button - SMALLER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => navigate("/services")}
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-white">
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRightIcon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </motion.div>
            </div>
            <p className="mt-3 text-xs lg:text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              View All
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;