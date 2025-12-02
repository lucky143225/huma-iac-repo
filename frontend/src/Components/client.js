import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

function Client() {
  const clients = [
    { name: "DLR", initials: "DLR", color: "from-blue-500 to-blue-600" },
    { name: "ACE Constructions", initials: "ACE", color: "from-purple-500 to-purple-600" },
    { name: "Aparna Meadows", initials: "AWM", color: "from-green-500 to-green-600" },
    { name: "PMJ Jewellers", initials: "PMJ", color: "from-yellow-500 to-yellow-600" },
    { name: "Sudhir Associates", initials: "SA", color: "from-red-500 to-red-600" },
    { name: "Spira Duck", initials: "SDI", color: "from-indigo-500 to-indigo-600" },
    { name: "Sri Chaitanya", initials: "SCE", color: "from-pink-500 to-pink-600" },
    { name: "Sri Vanamali", initials: "SVA", color: "from-teal-500 to-teal-600" },
  ];

  return (
    <section id="industry-leaders" className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-1 mb-3 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">
              Our Clientele
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            We are proud to have partnered with some of the most respected names in real estate and construction.
          </p>
        </div>

        {/* Client Grid - Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 cursor-default"
            >
              {/* Logo/Initials Circle */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${client.color} shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 flex items-center justify-center mb-4`}
              >
                <span className="text-lg sm:text-xl font-bold text-white tracking-wider">
                  {client.initials}
                </span>
              </div>
              
              {/* Name */}
              <h3 className="text-sm sm:text-base font-bold text-gray-800 text-center leading-tight group-hover:text-blue-600 transition-colors">
                {client.name}
              </h3>
              
              {/* Decorative Line */}
              <div className="w-8 h-0.5 bg-gray-200 mt-3 rounded-full group-hover:bg-blue-500 group-hover:w-12 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Optional: Call to Action for Clients */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Join 100+ satisfied clients who trust us.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Client;
