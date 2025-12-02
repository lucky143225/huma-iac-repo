import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../Components/navBar";
import Footer from "../Components/footer";
import { serviceOptions } from "../data/servicesData";

export default function ContactUsPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
    serviceDescription: "",
  });

  // Check if coming from home (dropdown) or services (pre-filled)
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (location.state?.selectedService) {
      // Coming from Services page with specific service
      setFormData(prev => ({
        ...prev,
        service: location.state.selectedService,
        serviceDescription: location.state.selectedServiceDescription || ""
      }));
      setShowDropdown(false);
    } else if (location.state?.showServiceDropdown) {
      // Coming from Home page - show dropdown
      setShowDropdown(true);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = encodeURIComponent(
      `*New Consultation Request*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Phone:* ${formData.phone || "Not provided"}\n\n` +
        (formData.service ? `🔧 *Service Requested:* ${formData.service}\n\n` : "") +
        `💬 *Message:*\n${formData.message}`
    );

    const whatsappNumber = "919876543210";
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
    toast.success("Redirecting to WhatsApp... 💚");
    setFormData({ name: "", email: "", phone: "", message: "", service: "", serviceDescription: "" });
  };

  const contactInfo = [
    { icon: PhoneIcon, label: "Call", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: EnvelopeIcon, label: "Email", value: "info@MainPillar.com", href: "mailto:info@MainPillar.com" },
    { icon: ClockIcon, label: "Hours", value: "Mon-Fri: 9am-6pm", href: null },
    { icon: MapPinIcon, label: "Visit", value: "Financial District, HYD", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-6 px-4 bg-white border-b border-gray-100 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-sm">We're here to help and answer any question you might have.</p>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full max-w-5xl mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Send a Message</h2>
            
            {/* Service Banner (if pre-selected from Services page) */}
            {formData.service && !showDropdown && (
              <div className="mb-5 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-blue-900">Consultation for:</p>
                    <p className="text-base font-black text-blue-800 mt-0.5">{formData.service}</p>
                    {formData.serviceDescription && (
                      <p className="text-xs text-blue-700 mt-1">{formData.serviceDescription}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Dropdown (if coming from Home page) */}
              {showDropdown && (
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Select Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="">-- Choose a service --</option>
                    {serviceOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required 
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Phone</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} 
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Email</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required 
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required 
                  rows="4" 
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
              >
                <FaWhatsapp className="w-5 h-5" />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {contactInfo.map((info, index) => (
                <a 
                  key={index} 
                  href={info.href || '#'}
                  className={`flex flex-col lg:flex-row items-center lg:items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all text-center lg:text-left ${!info.href ? 'pointer-events-none' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase">{info.label}</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-4 p-4 bg-slate-900 rounded-xl text-white text-center lg:text-left">
              <h3 className="font-bold text-sm mb-1">MainPillar Office</h3>
              <p className="text-xs text-slate-400">Financial District, Hyderabad</p>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
}
