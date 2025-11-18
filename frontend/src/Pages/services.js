import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  XMarkIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/navBar";
import { useNavigate } from "react-router-dom";

// [Keep all your image imports - same as before]
import Building from "../Pictures/Building.avif";
import Land from "../Pictures/Land.webp";
import Architecture from "../Pictures/Architecture.avif";
import NOC from "../Pictures/NOC.jpg";
import Environment from "../Pictures/Environmental.jpeg";
import SalesDeed from "../Pictures/salesdeed.jpeg";
import LandLink from "../Pictures/LandLink.jpg";
import LatestEC from "../Pictures/LatestEC.png";
import LandValue from "../Pictures/LandValue.jpeg";
import Affidavit from "../Pictures/Affidavit.webp";
import Insurance from "../Pictures/Insurance.jpg";
import Maps from "../Pictures/Maps.png";
import Coord from "../Pictures/Coord.jpeg";
import Site from "../Pictures/Site.jpg";
import SoilTest from "../Pictures/SoilTest.png";
import Water from "../Pictures/Water.jpg";
import LRS from "../Pictures/LRS.jpeg";
import Structure from "../Pictures/Structure.jpeg";
import NALA from "../Pictures/NALA.jpeg";
import Layout from "../Pictures/Layout.jpg";
import Licence from "../Pictures/Licence.jpeg";
import Engineer from "../Pictures/Engineer.jpeg";
import Contract from "../Pictures/Contract.jpg";
import LandUse from "../Pictures/LandUse.jpg";
import Court from "../Pictures/Court.jpeg";
import Revenue from "../Pictures/Revenue.avif";
import DCNOC from "../Pictures/DCNOC.png";
import NOCIRR from "../Pictures/NOCIRR.webp";
import Khasra from "../Pictures/Khasra.jpg";
import Passbook from "../Pictures/Passbook.webp";
import ECBC from "../Pictures/ECBC.webp";
import StrAnal from "../Pictures/StrAnal.jpeg";
import ENVNOC from "../Pictures/ENVNOC.jpg";
import FIRE from "../Pictures/FIRE.jpeg";

// [Keep your services array - same as before]
const services = [
  {
    title: "Latest E.C",
    description: "Provide the latest Encumbrance Certificate.",
    image: LatestEC,
    keyPoints: [
      "Shows property ownership history",
      "Indicates if the property has any legal dues",
      "Required for property transaction and loan processing",
    ],
  },
  {
    title: "Latest Market Value Certificate",
    description: "Submit the latest market value certificate.",
    image: LandValue,
    keyPoints: [
      "Indicates the current market value of the property",
      "Important for tax assessment",
      "Used for property buying/selling transactions",
    ],
  },
  {
    title: "Water Feasibility Certificate",
    description: "Provide the water feasibility certificate.",
    image: Water,
    keyPoints: [
      "Validates water availability for the site",
      "Important for water-related construction approvals",
      "Necessary for building permits in certain areas",
    ],
  },
  {
    title: "Structural Engineer Certificate",
    description: "Submit the structural engineer's certificate.",
    image: Engineer,
    keyPoints: [
      "Certifies the structural integrity of the design",
      "Required for compliance with safety standards",
      "Necessary for approval from local building authorities",
    ],
  },
  {
    title: "Land-Use Certificate",
    description: "Submit the land-use certificate.",
    image: LandUse,
    keyPoints: [
      "Validates the intended use of the land",
      "Required for property development",
      "Ensures compliance with zoning regulations",
    ],
  },
  {
    title: "E.C.B.C Certificate",
    description: "Submit the Energy Conservation Building Code certificate.",
    image: ECBC,
    keyPoints: [
      "Ensures building compliance with energy efficiency standards",
      "Required for environmentally sustainable construction",
      "Helps reduce energy consumption and operational costs",
    ],
  },
  {
    title: "NOC - Airport Authority",
    description: "No Objection Certificate from Airport Authority",
    image: NOC,
    keyPoints: [
      "Approval for construction near airports",
      "Compliance with aviation regulations",
      "Required for safety and security measures",
    ],
  },
  {
    title: "N.O.C from District Collector",
    description: "Submit the NOC from the district collector.",
    image: DCNOC,
    keyPoints: [
      "Government clearance for construction projects",
      "Ensures compliance with district regulations",
      "Necessary for starting major construction projects",
    ],
  },
  {
    title: "N.O.C from Irrigation Department",
    description: "Provide the NOC from the irrigation department if required.",
    image: NOCIRR,
    keyPoints: [
      "Approval for construction near water bodies",
      "Ensures water flow is not obstructed",
      "Required for properties near irrigation facilities",
    ],
  },
  {
    title: "N.O.C from Environmental Department",
    description: "Provide the NOC from the environmental department.",
    image: ENVNOC,
    keyPoints: [
      "Approval for construction based on environmental impact",
      "Ensures compliance with environmental regulations",
      "Required for large-scale construction projects",
    ],
  },
  {
    title: "N.O.C from Fire Department",
    description: "Provide the NOC from the fire department.",
    image: FIRE,
    keyPoints: [
      "Validates fire safety measures in building design",
      "Required for obtaining building permits",
      "Ensures compliance with fire safety regulations",
    ],
  },
  {
    title: "Architectural & Structural Designs",
    description: "Professional design and planning services",
    image: Architecture,
    keyPoints: [
      "Customized architectural solutions",
      "Structural analysis and planning",
      "Detailed blueprints and design layouts",
    ],
  },
  {
    title: "Structural Drawings",
    description: "Provide detailed structural drawings.",
    image: Structure,
    keyPoints: [
      "Illustrates the design and load-bearing capacity",
      "Essential for construction and engineering approvals",
      "Shows compliance with safety standards",
    ],
  },
  {
    title: "Sale Deed",
    description: "Submit the Sale Deed for approval.",
    image: SalesDeed,
    keyPoints: [
      "Legal transfer of property ownership",
      "Signed by both buyer and seller",
      "Ensures smooth property transactions",
    ],
  },
  {
    title: "Link Documents",
    description: "Provide link documents for verification.",
    image: LandLink,
    keyPoints: [
      "Required for document verification",
      "Ensure authenticity of linked documents",
      "Supports compliance and legal procedures",
    ],
  },
  {
    title: "Common Affidavit",
    description: "Provide a common affidavit as required.",
    image: Affidavit,
    keyPoints: [
      "Legally binds individuals to a statement",
      "Used for legal claims and declarations",
      "Required in property-related matters",
    ],
  },
  {
    title: "Comprehensive Insurance for 6 years",
    description: "Submit comprehensive insurance details.",
    image: Insurance,
    keyPoints: [
      "Covers potential risks and damages",
      "Important for securing property investment",
      "Required by financial institutions for property loans",
    ],
  },
  {
    title: "Google Coordinates for the Proposed Site",
    description: "Provide the exact Google coordinates of the proposed site.",
    image: Coord,
    keyPoints: [
      "Accurate location identification",
      "Necessary for site approval processes",
      "Helps with mapping and planning",
    ],
  },
  {
    title: "Google Location",
    description: "Share the Google location of the proposed site.",
    image: Maps,
    keyPoints: [
      "Pinpoints the exact location on the map",
      "Useful for site inspections and approvals",
      "Required for zoning and compliance checks",
    ],
  },
  {
    title: "Photos of the Proposed Site",
    description: "Provide photos of the proposed site from all four sides.",
    image: Site,
    keyPoints: [
      "Visual documentation of the site",
      "Helps with site evaluation and inspection",
      "Required for planning and regulatory approval",
    ],
  },
  {
    title: "NALA Conversion",
    description: "Provide NALA conversion documents if applicable.",
    image: NALA,
    keyPoints: [
      "Converts agricultural land for non-agricultural use",
      "Required for changing land use in urban areas",
      "Helps in land development and urban planning",
    ],
  },
  {
    title: "Layout Copy",
    description: "Submit the layout copy.",
    image: Layout,
    keyPoints: [
      "Outlines the property boundaries and construction details",
      "Important for legal and planning purposes",
      "Necessary for building permit applications",
    ],
  },
  {
    title: "Architect Licence Copy",
    description: "Provide a copy of the architect's licence.",
    image: Licence,
    keyPoints: [
      "Validates the architect's professional credentials",
      "Required for legal construction approvals",
      "Ensures expertise and safety in designs",
    ],
  },
  {
    title: "LRS Proceeding Copy",
    description:
      "Submit the Layout Regularisation Scheme proceeding copy if applicable.",
    image: LRS,
    keyPoints: [
      "Legally approved layout regularization",
      "Required for properties in regulated areas",
      "Helps in land development and use approval",
    ],
  },
  {
    title: "Court Orders",
    description: "Provide court orders if applicable.",
    image: Court,
    keyPoints: [
      "Required if the property is under legal dispute",
      "Ensures the property is free from litigation",
      "Helps with legal clarity and property rights",
    ],
  },
  {
    title: "Revenue Sketch",
    description: "Submit the revenue sketch if required.",
    image: Revenue,
    keyPoints: [
      "Illustrates land ownership and boundaries",
      "Used for property legalities and disputes",
      "Required for official land documentation and registration",
    ],
  },
  {
    title: "Khasra Pahani from 1954",
    description: "Submit the Khasra Pahani document if it is a piece of land.",
    image: Khasra,
    keyPoints: [
      "Ownership and land use document",
      "Required for property verification",
      "Important for land transactions and registration",
    ],
  },
  {
    title: "Pattadar Passbook",
    description: "Provide the Pattadar passbook if it is a piece of land.",
    image: Passbook,
    keyPoints: [
      "Official document for land ownership",
      "Used for land transactions and government dealings",
      "Required for property verification and registration",
    ],
  },
  {
    title: "Builder Contract Agreement (Registered Copy)",
    description: "Provide a registered copy of the builder contract agreement.",
    image: Contract,
    keyPoints: [
      "Legal agreement between the builder and property owner",
      "Ensures transparency in the construction process",
      "Required for dispute resolution and legal protection",
    ],
  },
  {
    title: "Soil-Test Report",
    description: "Submit the soil-test report.",
    image: SoilTest,
    keyPoints: [
      "Analyzes the soil's suitability for construction",
      "Helps with structural design and foundation planning",
      "Required by building authorities",
    ],
  },
  {
    title: "Structural Analysis Report",
    description: "Submit the structural analysis report.",
    image: StrAnal,
    keyPoints: [
      "Analysis of the building's structural strength",
      "Required for safety and engineering approvals",
      "Validates building design and load capacity",
    ],
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [file, setFile] = useState(null);
  const [simplifiedFiles, setsimplifiedFiles] = useState(null);
  const [matchingFiles, setMatchingFiles] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";
  const navigate = useNavigate();

  // [Keep all your useEffects - same as before]
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (token) {
      const cachedFiles = localStorage.getItem("allFiles");
      let filessimplify;

      if (cachedFiles) {
        filessimplify = JSON.parse(cachedFiles);
      } else {
        async function fetchData() {
          try {
            const { data } = await axios.get(
              `http://${port}/api/users/getAllUsersFiles`,
              {
                headers: { Authorization: token },
              }
            );
            localStorage.setItem("allFiles", JSON.stringify(data.files));
            filessimplify = data.files;
          } catch (err) {
            console.error(err?.response?.data?.message || "Something went wrong");
          }
        }
        fetchData();
      }

      const simplifiedFiles = filessimplify?.map((file) => ({
        serviceName: file.serviceName,
        fileLocation: file.fileLocation,
        fileName: file.fileName,
      }));

      setsimplifiedFiles(simplifiedFiles);
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      const matchingFiles = simplifiedFiles?.find(
        (file) => file.serviceName === selectedService.title
      );
      setMatchingFiles(matchingFiles);
    }
  }, [selectedService, simplifiedFiles]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setUploadedFileName("");
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        navigate("/login");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setUploadedFileName(file.name);
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    const form = new FormData();
    form.append("files", file);
    form.append("serviceName", selectedService.title);
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    try {
      await axios.post(`http://${port}/api/users/uploadFiles`, form, {
        headers: { Authorization: token },
      });
      localStorage.removeItem("allFiles");
      toast.success("File Uploaded Successfully!");
      setFile(null);
      setUploadedFileName("");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const isPDF = (fileName) => fileName?.endsWith(".pdf");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />

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
              Our Services
            </h1>
            <SparklesIcon className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Professional consultancy services for all your property and
            construction needs
          </p>
        </motion.div>
      </div>

      {/* Selected Service Detail */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="px-4 sm:px-6 lg:px-8 mb-12"
          >
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden relative border-2 border-blue-200">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl transition-all group"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="flex flex-col items-center space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-1"
                  >
                    <div className="w-full h-full bg-white rounded-3xl p-4 flex items-center justify-center">
                      <img
                        src={selectedService.image}
                        alt={selectedService.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-center">
                    {selectedService.title}
                  </h2>
                  <p className="text-gray-700 text-center font-medium">
                    {selectedService.description}
                  </p>
                </div>

                <div className="flex flex-col justify-between space-y-6">
                  <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      Key Requirements:
                    </h3>
                    {selectedService.keyPoints?.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-8 text-center border-2 border-blue-200">
  <h4 className="font-bold text-gray-900 text-xl mb-3">
    Get in Touch
  </h4>
  <p className="text-gray-700 text-sm mb-6">
    Have questions? We're here to help!
  </p>
  
  <button
    onClick={() => navigate('/contact-us')}
    className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all text-lg"
  >
    Contact Us →
  </button>
</div>

                  {/* <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 space-y-4 border-2 border-blue-200">
                    {!matchingFiles ? (
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          <DocumentArrowUpIcon className="w-5 h-5 text-blue-600" />
                          Upload Document
                        </h4>
                        <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-blue-400 rounded-xl hover:border-purple-500 hover:bg-white/50 transition-all cursor-pointer group bg-white/30 backdrop-blur-sm">
                          <DocumentArrowUpIcon className="w-14 h-14 text-blue-500 group-hover:text-purple-600 transition-colors group-hover:scale-110 transform" />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                          <div className="text-center">
                            <p className="text-sm font-bold text-gray-800">
                              {uploadedFileName || "Click to upload file"}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              PDF, JPG, PNG or DOC (max 10MB)
                            </p>
                          </div>
                        </label>

                        {file && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                          >
                            {isUploading ? "Uploading..." : "Submit Document 🚀"}
                          </motion.button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                          Document Uploaded Successfully!
                        </h4>
                        <div className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-green-300 shadow-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                              <DocumentArrowUpIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">
                                {matchingFiles.fileName}
                              </p>
                              <p className="text-xs text-gray-600">
                                Click eye icon to view
                              </p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowPopup(true)}
                            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl hover:shadow-xl transition-all"
                          >
                            <EyeIcon className="w-6 h-6 text-white" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Grid - FASTER & WORKS ON REVERSE SCROLL */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const gradients = [
                "from-blue-100 to-cyan-100",
                "from-purple-100 to-pink-100",
                "from-green-100 to-emerald-100",
                "from-orange-100 to-red-100",
                "from-indigo-100 to-blue-100",
                "from-pink-100 to-rose-100",
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ 
                    once: false, // Changed to false for reverse scroll
                    margin: "0px", // Reduced margin for faster trigger
                    amount: 0.2 // Trigger when 20% visible
                  }}
                  transition={{ 
                    duration: 0.3, // Faster animation
                    delay: index * 0.02, // Reduced stagger delay
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  onClick={() => handleServiceClick(service)}
                  className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-2 border-white`}
                >
                  <div className="p-6 flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl p-3 group-hover:shadow-2xl transition-shadow"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="pt-2 text-blue-700 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      View Details
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      <AnimatePresence>
        {showPopup && matchingFiles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="font-bold text-lg text-gray-900">
                  {matchingFiles.fileName}
                </h3>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-2 hover:bg-red-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-red-600" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {isPDF(matchingFiles.fileName) ? (
                  <embed
                    src={matchingFiles.fileLocation}
                    type="application/pdf"
                    className="w-full h-[70vh] rounded-lg"
                  />
                ) : (
                  <img
                    src={matchingFiles.fileLocation}
                    alt={matchingFiles.fileName}
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
