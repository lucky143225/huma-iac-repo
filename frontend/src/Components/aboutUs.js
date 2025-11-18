import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  HeartIcon,
  RocketLaunchIcon,
  TrophyIcon,
  ArrowLeftIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function AboutUsPage() {
  const navigate = useNavigate();

  const stats = [
    { icon: BuildingOfficeIcon, value: "29+", label: "Years Experience" },
    { icon: UserGroupIcon, value: "500+", label: "Happy Clients" },
    { icon: HeartIcon, value: "100%", label: "Satisfaction" }
  ];

  const values = [
    { icon: RocketLaunchIcon, title: "Innovation", description: "Cutting-edge solutions for modern challenges" },
    { icon: HeartIcon, title: "Integrity", description: "Honest and transparent in everything we do" },
    { icon: UserGroupIcon, title: "Collaboration", description: "Working together to achieve your goals" },
    { icon: TrophyIcon, title: "Excellence", description: "Delivering quality that exceeds expectations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 p-2 bg-white rounded-lg shadow-sm hover:shadow transition-all z-50"
      >
        <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
      </button>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparklesIcon className="w-8 h-8 text-blue-600 animate-pulse" />
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              About Us
            </h1>
            <SparklesIcon className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Empowering businesses since 1995
          </p>
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-6 mb-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border-2 border-blue-100"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg mb-12 border-2 border-blue-100"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
              Our Story
            </h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p>
                Founded in 1995 in Hyderabad, <span className="font-bold text-purple-600">Liaison Consultancy</span> has grown from a small team to serve thousands of clients across India.
              </p>
              <p>
                For 29 years, we've helped businesses navigate digital transformation and achieve their goals through expert guidance and innovative solutions.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, index) => {
                const Icon = value.icon;
                const gradients = [
                  "from-blue-100 to-cyan-100",
                  "from-purple-100 to-pink-100",
                  "from-green-100 to-emerald-100",
                  "from-orange-100 to-yellow-100"
                ];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className={`bg-gradient-to-br ${gradients[index]} rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border-2 border-white`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-md"
                    >
                      <Icon className="w-8 h-8 text-purple-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-10 text-center shadow-lg border-2 border-blue-200"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-gray-700 mb-6 font-medium">
              Join thousands of satisfied clients
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact-us')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all text-lg"
            >
              Contact Us →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}