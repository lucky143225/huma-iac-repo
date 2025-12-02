
// src/data/servicesData.js

import LatestEC from "../Pictures/LatestEC.png";
import LandValue from "../Pictures/LandValue.jpeg";
import Water from "../Pictures/Water.jpg";
import Engineer from "../Pictures/Engineer.jpeg";
import LandUse from "../Pictures/LandUse.jpg";
import ECBC from "../Pictures/ECBC.webp";
import NOC from "../Pictures/NOC.jpg";
import DCNOC from "../Pictures/DCNOC.png";
import NOCIRR from "../Pictures/NOCIRR.webp";
import ENVNOC from "../Pictures/ENVNOC.jpg";
import FIRE from "../Pictures/FIRE.jpeg";
import Architecture from "../Pictures/Architecture.avif";
import Structure from "../Pictures/Structure.jpeg";
import SalesDeed from "../Pictures/salesdeed.jpeg";
import LandLink from "../Pictures/LandLink.jpg";
import Affidavit from "../Pictures/Affidavit.webp";
import Insurance from "../Pictures/Insurance.jpg";
import Coord from "../Pictures/Coord.jpeg";
import Maps from "../Pictures/Maps.png";
import Site from "../Pictures/Site.jpg";
import NALA from "../Pictures/NALA.jpeg";
import Layout from "../Pictures/Layout.jpg";
import Licence from "../Pictures/Licence.jpeg";
import LRS from "../Pictures/LRS.jpeg";
import Court from "../Pictures/Court.jpeg";
import Revenue from "../Pictures/Revenue.avif";
import Khasra from "../Pictures/Khasra.jpg";
import Passbook from "../Pictures/Passbook.webp";
import Contract from "../Pictures/Contract.jpg";
import SoilTest from "../Pictures/SoilTest.png";
import StrAnal from "../Pictures/StrAnal.jpeg";

export const services = [
  {
    title: "Latest E.C",
    description: "Provide the latest Encumbrance Certificate.",
    image: LatestEC,
    category: "Reports & Feasibility",
    keyPoints: ["Shows property ownership history", "Indicates if the property has any legal dues", "Required for property transaction and loan processing"],
  },
  {
    title: "Latest Market Value Certificate",
    description: "Submit the latest market value certificate.",
    image: LandValue,
    category: "Reports & Feasibility",
    keyPoints: ["Indicates the current market value of the property", "Important for tax assessment", "Used for property buying/selling transactions"],
  },
  {
    title: "Water Feasibility Certificate",
    description: "Provide the water feasibility certificate.",
    image: Water,
    category: "Reports & Feasibility",
    keyPoints: ["Validates water availability for the site", "Important for water-related construction approvals", "Necessary for building permits in certain areas"],
  },
  {
    title: "Structural Engineer Certificate",
    description: "Submit the structural engineer's certificate.",
    image: Engineer,
    category: "Engineering & Design",
    keyPoints: ["Certifies the structural integrity of the design", "Required for compliance with safety standards", "Necessary for approval from local building authorities"],
  },
  {
    title: "Land-Use Certificate",
    description: "Submit the land-use certificate.",
    image: LandUse,
    category: "Land & Revenue",
    keyPoints: ["Validates the intended use of the land", "Required for property development", "Ensures compliance with zoning regulations"],
  },
  {
    title: "E.C.B.C Certificate",
    description: "Submit the Energy Conservation Building Code certificate.",
    image: ECBC,
    category: "Engineering & Design",
    keyPoints: ["Ensures building compliance with energy efficiency standards", "Required for environmentally sustainable construction", "Helps reduce energy consumption and operational costs"],
  },
  {
    title: "NOC - Airport Authority",
    description: "No Objection Certificate from Airport Authority",
    image: NOC,
    category: "Approvals & NOCs",
    keyPoints: ["Approval for construction near airports", "Compliance with aviation regulations", "Required for safety and security measures"],
  },
  {
    title: "N.O.C from District Collector",
    description: "Submit the NOC from the district collector.",
    image: DCNOC,
    category: "Approvals & NOCs",
    keyPoints: ["Government clearance for construction projects", "Ensures compliance with district regulations", "Necessary for starting major construction projects"],
  },
  {
    title: "N.O.C from Irrigation Department",
    description: "Provide the NOC from the irrigation department if required.",
    image: NOCIRR,
    category: "Approvals & NOCs",
    keyPoints: ["Approval for construction near water bodies", "Ensures water flow is not obstructed", "Required for properties near irrigation facilities"],
  },
  {
    title: "N.O.C from Environmental Department",
    description: "Provide the NOC from the environmental department.",
    image: ENVNOC,
    category: "Approvals & NOCs",
    keyPoints: ["Approval for construction based on environmental impact", "Ensures compliance with environmental regulations", "Required for large-scale construction projects"],
  },
  {
    title: "N.O.C from Fire Department",
    description: "Provide the NOC from the fire department.",
    image: FIRE,
    category: "Approvals & NOCs",
    keyPoints: ["Validates fire safety measures in building design", "Required for obtaining building permits", "Ensures compliance with fire safety regulations"],
  },
  {
    title: "Architectural & Structural Designs",
    description: "Professional design and planning services",
    image: Architecture,
    category: "Engineering & Design",
    keyPoints: ["Customized architectural solutions", "Structural analysis and planning", "Detailed blueprints and design layouts"],
  },
  {
    title: "Structural Drawings",
    description: "Provide detailed structural drawings.",
    image: Structure,
    category: "Engineering & Design",
    keyPoints: ["Illustrates the design and load-bearing capacity", "Essential for construction and engineering approvals", "Shows compliance with safety standards"],
  },
  {
    title: "Sale Deed",
    description: "Submit the Sale Deed for approval.",
    image: SalesDeed,
    category: "Land & Revenue",
    keyPoints: ["Legal transfer of property ownership", "Signed by both buyer and seller", "Ensures smooth property transactions"],
  },
  {
    title: "Link Documents",
    description: "Provide link documents for verification.",
    image: LandLink,
    category: "Land & Revenue",
    keyPoints: ["Required for document verification", "Ensure authenticity of linked documents", "Supports compliance and legal procedures"],
  },
  {
    title: "Common Affidavit",
    description: "Provide a common affidavit as required.",
    image: Affidavit,
    category: "Land & Revenue",
    keyPoints: ["Legally binds individuals to a statement", "Used for legal claims and declarations", "Required in property-related matters"],
  },
  {
    title: "Comprehensive Insurance for 6 years",
    description: "Submit comprehensive insurance details.",
    image: Insurance,
    category: "Reports & Feasibility",
    keyPoints: ["Covers potential risks and damages", "Important for securing property investment", "Required by financial institutions for property loans"],
  },
  {
    title: "Google Coordinates for the Proposed Site",
    description: "Provide the exact Google coordinates of the proposed site.",
    image: Coord,
    category: "Reports & Feasibility",
    keyPoints: ["Accurate location identification", "Necessary for site approval processes", "Helps with mapping and planning"],
  },
  {
    title: "Google Location",
    description: "Share the Google location of the proposed site.",
    image: Maps,
    category: "Reports & Feasibility",
    keyPoints: ["Pinpoints the exact location on the map", "Useful for site inspections and approvals", "Required for zoning and compliance checks"],
  },
  {
    title: "Photos of the Proposed Site",
    description: "Provide photos of the proposed site from all four sides.",
    image: Site,
    category: "Reports & Feasibility",
    keyPoints: ["Visual documentation of the site", "Helps with site evaluation and inspection", "Required for planning and regulatory approval"],
  },
  {
    title: "NALA Conversion",
    description: "Provide NALA conversion documents if applicable.",
    image: NALA,
    category: "Land & Revenue",
    keyPoints: ["Converts agricultural land for non-agricultural use", "Required for changing land use in urban areas", "Helps in land development and urban planning"],
  },
  {
    title: "Layout Copy",
    description: "Submit the layout copy.",
    image: Layout,
    category: "Engineering & Design",
    keyPoints: ["Outlines the property boundaries and construction details", "Important for legal and planning purposes", "Necessary for building permit applications"],
  },
  {
    title: "Architect Licence Copy",
    description: "Provide a copy of the architect's licence.",
    image: Licence,
    category: "Engineering & Design",
    keyPoints: ["Validates the architect's professional credentials", "Required for legal construction approvals", "Ensures expertise and safety in designs"],
  },
  {
    title: "LRS Proceeding Copy",
    description: "Submit the Layout Regularisation Scheme proceeding copy if applicable.",
    image: LRS,
    category: "Land & Revenue",
    keyPoints: ["Legally approved layout regularization", "Required for properties in regulated areas", "Helps in land development and use approval"],
  },
  {
    title: "Court Orders",
    description: "Provide court orders if applicable.",
    image: Court,
    category: "Land & Revenue",
    keyPoints: ["Required if the property is under legal dispute", "Ensures the property is free from litigation", "Helps with legal clarity and property rights"],
  },
  {
    title: "Revenue Sketch",
    description: "Submit the revenue sketch if required.",
    image: Revenue,
    category: "Land & Revenue",
    keyPoints: ["Illustrates land ownership and boundaries", "Used for property legalities and disputes", "Required for official land documentation and registration"],
  },
  {
    title: "Khasra Pahani from 1954",
    description: "Submit the Khasra Pahani document if it is a piece of land.",
    image: Khasra,
    category: "Land & Revenue",
    keyPoints: ["Ownership and land use document", "Required for property verification", "Important for land transactions and registration"],
  },
  {
    title: "Pattadar Passbook",
    description: "Provide the Pattadar passbook if it is a piece of land.",
    image: Passbook,
    category: "Land & Revenue",
    keyPoints: ["Official document for land ownership", "Used for land transactions and government dealings", "Required for property verification and registration"],
  },
  {
    title: "Builder Contract Agreement (Registered Copy)",
    description: "Provide a registered copy of the builder contract agreement.",
    image: Contract,
    category: "Land & Revenue",
    keyPoints: ["Legal agreement between the builder and property owner", "Ensures transparency in the construction process", "Required for dispute resolution and legal protection"],
  },
  {
    title: "Soil-Test Report",
    description: "Submit the soil-test report.",
    image: SoilTest,
    category: "Reports & Feasibility",
    keyPoints: ["Analyzes the soil's suitability for construction", "Helps with structural design and foundation planning", "Required by building authorities"],
  },
  {
    title: "Structural Analysis Report",
    description: "Submit the structural analysis report.",
    image: StrAnal,
    category: "Engineering & Design",
    keyPoints: ["Analysis of the building's structural strength", "Required for safety and engineering approvals", "Validates building design and load capacity"],
  },
];

// Export service titles for dropdown (only title needed for contact form)
export const serviceOptions = services.map(service => ({
  value: service.title,
  label: service.title
}));
