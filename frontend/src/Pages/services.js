import React, { useEffect, useState, useRef } from 'react';
import Building from '../Pictures/Building.avif';
import Land from "../Pictures/Land.webp";
import Architecture from "../Pictures/Architecture.avif"
import NOC from "../Pictures/NOC.jpg"
import Environment from "../Pictures/Environmental.jpeg"
import more from "../Pictures/more.jpeg"
import Navbar from '../Components/navBar';
import SalesDeed from '../Pictures/salesdeed.jpeg'
import LandLink from '../Pictures/LandLink.jpg'
import LatestEC from '../Pictures/LatestEC.jpeg'
import LandValue from '../Pictures/LandValue.jpeg'
import Affidavit from '../Pictures/Affidavit.webp'
import Insurance from '../Pictures/Insurance.jpg'
import Maps from '../Pictures/Maps.png'
import Coord from '../Pictures/Coord.jpeg'
import Site from '../Pictures/Site.jpg'
import SoilTest from '../Pictures/SoilTest.webp'
import Water from '../Pictures/Water.jpg'
import LRS from '../Pictures/LRS.jpeg'
import Structure from '../Pictures/Structure.jpeg'
import NALA from '../Pictures/NALA.jpeg'
import Layout from '../Pictures/Layout.jpg'
import Licence from '../Pictures/Licence.jpeg'
import Engineer from '../Pictures/Engineer.jpeg'
import Contract from '../Pictures/Contract.jpg'
import LandUse from '../Pictures/LandUse.jpg'
import Court from '../Pictures/Court.jpeg'
import Revenue from '../Pictures/Revenue.avif';
import DCNOC from '../Pictures/DCNOC.png';
import NOCIRR from '../Pictures/NOCIRR.webp';
import Khasra from '../Pictures/Khasra.jpg';
import Passbook from '../Pictures/Passbook.webp'
import ECBC from '../Pictures/ECBC.webp'
import StrAnal from '../Pictures/StrAnal.jpeg'
import ENVNOC from '../Pictures/ENVNOC.jpg'
import FIRE from '../Pictures/FIRE.jpeg'

const services = [
    {
        title: "Architectural & Structural Designs",
        description: "Professional design and planning services",
        image: Architecture,
        keyPoints: ["Customized architectural solutions", "Structural analysis and planning", "Detailed blueprints and design layouts"]
    },
    {
        title: "NOC - Airport Authority",
        description: "No Objection Certificate from Airport Authority",
        image: NOC,
        keyPoints: ["Approval for construction near airports", "Compliance with aviation regulations", "Required for safety and security measures"]
    },
    {
        title: "Sale Deed",
        description: "Submit the Sale Deed for approval.",
        image: SalesDeed,
        keyPoints: ["Legal transfer of property ownership", "Signed by both buyer and seller", "Ensures smooth property transactions"]
    },
    {
        title: "Link Documents",
        description: "Provide link documents for verification.",
        image: LandLink,
        keyPoints: ["Required for document verification", "Ensure authenticity of linked documents", "Supports compliance and legal procedures"]
    },
    {
        title: "Latest E.C",
        description: "Provide the latest Encumbrance Certificate.",
        image: LatestEC,
        keyPoints: ["Shows property ownership history", "Indicates if the property has any legal dues", "Required for property transaction and loan processing"]
    },
    {
        title: "Latest Market Value Certificate",
        description: "Submit the latest market value certificate.",
        image: LandValue,
        keyPoints: ["Indicates the current market value of the property", "Important for tax assessment", "Used for property buying/selling transactions"]
    },
    {
        title: "Common Affidavit",
        description: "Provide a common affidavit as required.",
        image: Affidavit,
        keyPoints: ["Legally binds individuals to a statement", "Used for legal claims and declarations", "Required in property-related matters"]
    },
    {
        title: "Comprehensive Insurance for 6 years",
        description: "Submit comprehensive insurance details.",
        image: Insurance,
        keyPoints: ["Covers potential risks and damages", "Important for securing property investment", "Required by financial institutions for property loans"]
    },
    {
        title: "Google Coordinates for the Proposed Site",
        description: "Provide the exact Google coordinates of the proposed site.",
        image: Coord,
        keyPoints: ["Accurate location identification", "Necessary for site approval processes", "Helps with mapping and planning"]
    },
    {
        title: "Google Location",
        description: "Share the Google location of the proposed site.",
        image: Maps,
        keyPoints: ["Pinpoints the exact location on the map", "Useful for site inspections and approvals", "Required for zoning and compliance checks"]
    },
    {
        title: "Photos of the Proposed Site",
        description: "Provide photos of the proposed site from all four sides.",
        image: Site,
        keyPoints: ["Visual documentation of the site", "Helps with site evaluation and inspection", "Required for planning and regulatory approval"]
    },
    {
        title: "Soil-Test Report",
        description: "Submit the soil-test report.",
        image: SoilTest,
        keyPoints: ["Analyzes the soil's suitability for construction", "Helps with structural design and foundation planning", "Required by building authorities"]
    },
    {
        title: "Water Feasibility Certificate",
        description: "Provide the water feasibility certificate.",
        image: Water,
        keyPoints: ["Validates water availability for the site", "Important for water-related construction approvals", "Necessary for building permits in certain areas"]
    },
    {
        title: "LRS Proceeding Copy",
        description: "Submit the Layout Regularisation Scheme proceeding copy if applicable.",
        image: LRS,
        keyPoints: ["Legally approved layout regularization", "Required for properties in regulated areas", "Helps in land development and use approval"]
    },
    {
        title: "Structural Drawings",
        description: "Provide detailed structural drawings.",
        image: Structure,
        keyPoints: ["Illustrates the design and load-bearing capacity", "Essential for construction and engineering approvals", "Shows compliance with safety standards"]
    },
    {
        title: "NALA Conversion",
        description: "Provide NALA conversion documents if applicable.",
        image: NALA,
        keyPoints: ["Converts agricultural land for non-agricultural use", "Required for changing land use in urban areas", "Helps in land development and urban planning"]
    },
    {
        title: "Layout Copy",
        description: "Submit the layout copy.",
        image: Layout,
        keyPoints: ["Outlines the property boundaries and construction details", "Important for legal and planning purposes", "Necessary for building permit applications"]
    },
    {
        title: "Architect Licence Copy",
        description: "Provide a copy of the architect's licence.",
        image: Licence,
        keyPoints: ["Validates the architect’s professional credentials", "Required for legal construction approvals", "Ensures expertise and safety in designs"]
    },
    {
        title: "Structural Engineer Certificate",
        description: "Submit the structural engineer's certificate.",
        image: Engineer,
        keyPoints: ["Certifies the structural integrity of the design", "Required for compliance with safety standards", "Necessary for approval from local building authorities"]
    },
    {
        title: "Builder Contract Agreement (Registered Copy)",
        description: "Provide a registered copy of the builder contract agreement.",
        image: Contract,
        keyPoints: ["Legal agreement between the builder and property owner", "Ensures transparency in the construction process", "Required for dispute resolution and legal protection"]
    },
    {
        title: "Land-Use Certificate",
        description: "Submit the land-use certificate.",
        image: LandUse,
        keyPoints: ["Validates the intended use of the land", "Required for property development", "Ensures compliance with zoning regulations"]
    },
    {
        title: "Court Orders",
        description: "Provide court orders if applicable.",
        image: Court,
        keyPoints: ["Required if the property is under legal dispute", "Ensures the property is free from litigation", "Helps with legal clarity and property rights"]
    },
    {
        title: "Revenue Sketch",
        description: "Submit the revenue sketch if required.",
        image: Revenue,
        keyPoints: ["Illustrates land ownership and boundaries", "Used for property legalities and disputes", "Required for official land documentation and registration"]
    },
    {
        title: "N.O.C from District Collector",
        description: "Submit the NOC from the district collector.",
        image: DCNOC,
        keyPoints: ["Government clearance for construction projects", "Ensures compliance with district regulations", "Necessary for starting major construction projects"]
    },
    {
        title: "N.O.C from Irrigation Department",
        description: "Provide the NOC from the irrigation department if required.",
        image: NOCIRR,
        keyPoints: ["Approval for construction near water bodies", "Ensures water flow is not obstructed", "Required for properties near irrigation facilities"]
    },
    {
        title: "Khasra Pahani from 1954",
        description: "Submit the Khasra Pahani document if it is a piece of land.",
        image: Khasra,
        keyPoints: ["Ownership and land use document", "Required for property verification", "Important for land transactions and registration"]
    },
    {
        title: "Pattadar Passbook",
        description: "Provide the Pattadar passbook if it is a piece of land.",
        image: Passbook,
        keyPoints: ["Official document for land ownership", "Used for land transactions and government dealings", "Required for property verification and registration"]
    },
    {
        title: "E.C.B.C Certificate",
        description: "Submit the Energy Conservation Building Code certificate.",
        image: ECBC,
        keyPoints: ["Ensures building compliance with energy efficiency standards", "Required for environmentally sustainable construction", "Helps reduce energy consumption and operational costs"]
    },
    {
        title: "N.O.C from Environmental Department",
        description: "Provide the NOC from the environmental department.",
        image: ENVNOC,
        keyPoints: ["Approval for construction based on environmental impact", "Ensures compliance with environmental regulations", "Required for large-scale construction projects"]
    },
    {
        title: "N.O.C from Fire Department",
        description: "Provide the NOC from the fire department.",
        image: FIRE,
        keyPoints: ["Validates fire safety measures in building design", "Required for obtaining building permits", "Ensures compliance with fire safety regulations"]
    },
    {
        title: "Structural Analysis Report",
        description: "Submit the structural analysis report.",
        image: StrAnal,
        keyPoints: ["Analysis of the building’s structural strength", "Required for safety and engineering approvals", "Validates building design and load capacity"]
    }
];


const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [animationState, setAnimationState] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");

    const serviceDetailsRef = useRef(null);

    const [navbarHeight, setNavbarHeight] = useState(0);
    const navbarRef = useRef(null);

    // Update navbar height after the component is mounted
    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setAnimationState(true);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            console.log('File selected:', file.name);
            // Add file handling logic here
        }
    };

    const handleUpload = () => {
        console.log('Upload button clicked');
        // Add your upload logic here
    };

    useEffect(() => {
       
        // Scroll to the service details container smoothly when selectedService is updated
        if (selectedService && serviceDetailsRef.current) {
            window.scrollTo({
                behavior: 'smooth',
                top: 0
            });
        }
    }, [selectedService]); // This will trigger whenever selectedService changes


    return (
        <div className=''>
        <div ref={navbarRef} className='w-full bg-blue/70 backdrop-blur-md z-10'>
            <Navbar />
        </div>

        <div className='p-8'>
            {selectedService && (
                <div
                    ref={serviceDetailsRef}
                    className={`mb-12 transition-transform duration-500 ease-in-out ${animationState ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                    <div className="flex flex-col md:flex-row justify-evenly shadow-2xl w-full h-[60vh] items-center mb-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-6">
                        <div className="flex flex-col items-center max-w-80 text-center space-y-4">
                            <div className="w-64 h-64 rounded-full overflow-hidden bg-white shadow-lg transform transition-transform duration-700">
                                <img
                                    src={selectedService.image}
                                    alt="Service"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">{selectedService.title}</h2>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <p className="text-lg text-gray-700">{selectedService.description}</p>
                            <ul className="mt-4 space-y-2">
                                {selectedService.keyPoints?.map((point, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                        <span className="text-green-500 text-xl">✔</span>
                                        <span className="text-gray-600">{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-row space-x-4 items-center">
                                <label
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700 flex items-center"
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                    {uploadedFileName ? uploadedFileName : "Upload File"}
                                </label>
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                                    onClick={handleUpload}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 cursor-pointer"
                        onClick={() => handleServiceClick(service)}
                    >
                        <div className="flex flex-col items-center mb-2">
                            <div className="relative group flex flex-col items-center">
                                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg">
                                    <img
                                        src={service.image}
                                        alt="Service"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>

    );
}

export default Services;
