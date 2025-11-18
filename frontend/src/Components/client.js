import { motion } from "framer-motion";

function Client() {
  const clients = [
    { name: "DLR", initials: "DLR", color: "from-blue-500 to-blue-700" },
    { name: "ACE Constructions", initials: "ACE", color: "from-purple-500 to-purple-700" },
    {
      name: "Aparna Western Meadows",
      initials: "AWM",
      color: "from-green-500 to-green-700",
    },
    { name: "PMJ Jewellers", initials: "PMJ", color: "from-yellow-500 to-yellow-700" },
    { name: "Sudhir Associates", initials: "SA", color: "from-red-500 to-red-700" },
    { name: "Spira Duck Industries", initials: "SDI", color: "from-indigo-500 to-indigo-700" },
    {
      name: "Sri Chaitanya Education",
      initials: "SCE",
      color: "from-pink-500 to-pink-700",
    },
    {
      name: "Sri Vanamali Agro",
      initials: "SVA",
      color: "from-teal-500 to-teal-700",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20" id="clients">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Trusted by Industry Leaders
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="flex flex-col items-center group"
          >
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${client.color} shadow-lg group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center`}
            >
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {client.initials}
              </span>
            </div>
            <h3 className="mt-4 text-center text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {client.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Client;
