import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon,
  UserIcon,
  ClockIcon,
  BuildingOfficeIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from 'react-icons/fa'; // npm install react-icons
import { toast } from "react-toastify";
import bgimageicon from "../photo1.webp";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `*New Contact Form Submission*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📱 *Phone:* ${formData.phone || 'Not provided'}\n\n` +
      `💬 *Message:*\n${formData.message}`
    );

    // Your WhatsApp business number (format: country code + number, no + or spaces)
    const whatsappNumber = '91i7y98798789'; // Replace with your number

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    toast.success("Redirecting to WhatsApp... 💚");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    { icon: PhoneIcon, label: "Call Us", value: "+91 98765 43210", color: "from-blue-500 to-blue-600" },
    { icon: EnvelopeIcon, label: "Email Us", value: "info@liaison.com", color: "from-violet-500 to-violet-600" },
    { icon: MapPinIcon, label: "Visit Us", value: "123 Street, NY 10001", color: "from-indigo-500 to-indigo-600" },
    { icon: ClockIcon, label: "Working Hours", value: "Mon-Fri: 9AM-6PM", color: "from-blue-500 to-violet-600" },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 p-4">
      {/* Background */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgimageicon})` }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-violet-400' : 'bg-indigo-400'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <motion.div 
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" 
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl"
      >
        <motion.div
          animate={{ 
            rotateY: (mousePosition.x - window.innerWidth / 2) / 150,
            rotateX: -(mousePosition.y - window.innerHeight / 2) / 150,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{ transformStyle: "preserve-3d" }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/20 to-violet-600/20 p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <SparklesIcon className="w-8 h-8 text-violet-400 animate-pulse" />
                  <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 text-transparent bg-clip-text">
                    Contact Us
                  </h1>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Have questions? We'd love to hear from you. Send us a message via WhatsApp.
                </p>
              </motion.div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-br ${info.color} rounded-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{info.label}</p>
                          <p className="text-white font-semibold text-sm">{info.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-violet-400" />
                  <h3 className="text-white font-bold text-sm">Liaison Consultancy</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Professional consulting services since 1995. 29+ years of excellence.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                <p className="text-gray-400 text-sm mb-6">Fill the form and click to message us on WhatsApp.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                          placeholder="+91 1234567890"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* WhatsApp Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg transition-all relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    
                    <span className="relative flex items-center justify-center gap-2">
                      <FaWhatsapp className="w-6 h-6" />
                      Send via WhatsApp
                    </span>
                  </motion.button>

                  <p className="text-xs text-center text-gray-400 mt-2">
                    💚 You'll be redirected to WhatsApp with your message
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
