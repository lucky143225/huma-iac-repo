import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import Navbar from "../Components/navBar";
import Footer from "../Components/footer";

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      {/* 1. Hero Section - CSS Pattern Background */}
      <div className="relative pt-32 pb-20 px-6 border-b border-gray-100 overflow-hidden">
        {/* Background Pattern (0kb Data) */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
            Engineering Trust. <br />
            {/* UPDATED: Gradient Text to match Home Page Liaison style */}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Simplifying Approvals.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Since 1995, MainPillar has been the bridge between property owners and regulatory success in Hyderabad.
          </p>
        </div>
      </div>

      {/* 2. Key Metrics - Clean Row */}
      <div className="w-full border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-center"> {/* Changed to grid-cols-3 since you have 3 items */}
          {[
            { label: "Years Active", value: "29+" },
            { label: "Projects", value: "100+" },
            { label: "Success Rate", value: "100%" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-4xl font-black text-gray-900">{stat.value}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Expertise - Grid Layout */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why <span className="text-blue-600">MainPillar?</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We simplify the complex. Navigating government regulations for land and construction requires precise technical knowledge and legal clarity. We provide both.
              </p>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-4">
              {[
                "End-to-End Liasioning (NOCs, Permissions)",
                "Structural & Architectural Engineering",
                "Land Revenue Services (Conversion, Surveys)",
                "Legal Feasibility Reports"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/services")}
              className="group inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              Explore Our Services
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Abstract Graphic (CSS Only) */}
          <div className="relative h-80 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40 -translate-x-1/2 translate-y-1/2"></div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900">One Stop Solution</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
                  From soil testing to final occupancy certificate, we handle every step of the lifecycle.
                </p>
             </div>
          </div>

        </div>
      </div>

      {/* 4. CTA - Minimal */}
      <div className="mt-auto bg-white border-t border-gray-100 py-16 px-6 text-center">
         <h2 className="text-2xl font-bold text-gray-900 mb-2">Have a project in mind?</h2>
         <p className="text-gray-500 mb-8">Let's discuss feasibility and approvals.</p>
         <button 
            onClick={() => navigate("/contact-us")}
            className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all transform active:scale-95 shadow-lg hover:shadow-xl"
         >
            Start Consultation
         </button>
      </div>

      <Footer />
    </div>
  );
}
