import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Hero, CTABand, CaseStudyCard } from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Shield, CheckCircle, ArrowLeft, Quote, Users, Gauge, Trophy, Play, X, ZoomIn, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePageContent } from "@/hooks/useSiteSettings";
import { EditableText, EditableImage } from "@/components/admin";

// Import all authentic project images from PDFs
import hddNightPanorama from "@/assets/projects/hdd-night-panorama.jpg";
import hddRigNight from "@/assets/projects/hdd-rig-night.jpg";
import pipeLaying from "@/assets/projects/pipe-laying-crane.jpg";
import otumaraEscravos from "@/assets/projects/otumara-escravos.jpg";
import otumaraEscravos2 from "@/assets/projects/otumara-escravos-2.jpg";
import atlasCoveMosimi from "@/assets/projects/atlas-cove-mosimi.jpg";
import atlasCoveMosimi2 from "@/assets/projects/atlas-cove-mosimi-2.jpg";
import lekiGasPipeline from "@/assets/projects/lekki-gas-pipeline.jpg";
import multiCraneOps from "@/assets/projects/multi-crane-operations.jpg";
import hddEquipmentFleet from "@/assets/projects/hdd-equipment-fleet.jpg";
import hddEquipmentFleet2 from "@/assets/projects/hdd-equipment-fleet-2.jpg";
import hddEquipmentFleet3 from "@/assets/projects/hdd-equipment-fleet-3.jpg";
import hddEquipmentFleet4 from "@/assets/projects/hdd-equipment-fleet-4.jpg";
import drillingOps4 from "@/assets/projects/drilling-ops-4.jpg";
import drillingOps5 from "@/assets/projects/drilling-ops-5.jpg";
import drillingOps6 from "@/assets/projects/drilling-ops-6.jpg";
import drillingOps7 from "@/assets/projects/drilling-ops-7.jpg";
import weldingCrew from "@/assets/projects/welding-crew.jpg";
import pipeHandling from "@/assets/projects/pipe-handling.jpg";
import pipelineCrew from "@/assets/projects/pipeline-crew.jpg";
import hddDrillString from "@/assets/projects/hdd-drill-string.jpg";
import hddTeam1 from "@/assets/projects/hdd-team-1.jpg";
import scopeOperations from "@/assets/projects/scope-operations.jpg";
import scopeOperations2 from "@/assets/projects/scope-operations-2.jpg";
import scopeOperations3 from "@/assets/projects/scope-operations-3.jpg";
import teamSafety from "@/assets/projects/team-safety.jpg";
import workersPpe from "@/assets/projects/workers-ppe.jpg";
import drillingSite2 from "@/assets/projects/drilling-site-2.jpg";
import craneOperations from "@/assets/projects/crane-operations.jpg";
import trippingSafety from "@/assets/projects/tripping-safety.jpg";
import nipcoIbafo from "@/assets/projects/nipco-ibafo.jpg";
import nipcoIbafo2 from "@/assets/projects/nipco-ibafo-2.jpg";
import nipcoIbafo3 from "@/assets/projects/nipco-ibafo-3.jpg";
import nipcoHddOps from "@/assets/projects/hdd-operations-2.jpg";
import catExcavator from "@/assets/projects/cat-excavator.jpg";
import partnershipHddThailand from "@/assets/projects/partnership-hddthailand.jpg";
import partnershipHddThailand2 from "@/assets/projects/partnership-hddthailand-2.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ProjectData {
  title: string;
  client: string;
  location: string;
  year: string;
  capabilities: string[];
  overview: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  hseNotes: string;
  clientQuote?: { text: string; author: string; role: string };
  heroImage: string;
  scope: string[];
  youtubeId?: string;
  recordBadge?: string;
  gallery: GalleryImage[];
}

// Slug to page_slug mapping for CMS
const slugToPageSlug: Record<string, string> = {
  'oml34-chdd': 'proj-oml34',
  'otumara-escravos': 'proj-otumara',
  'atlas-cove-mosimi': 'proj-atlas',
  'lekki-gas-pipeline': 'proj-lekki',
  'yenagoa-40-crossing': 'proj-yenagoa',
  'nipco-ibafo-crossing': 'proj-nipco',
};

// Verified project data from Enikkom documents with dedicated galleries
const projectData: Record<string, ProjectData> = {
  "oml34-chdd": {
    title: "OML34 Continuous HDD - 10\" x 12km",
    client: "NPDC (Nigerian Petroleum Development Company)",
    location: "Niger Delta, Nigeria",
    year: "2020-2021",
    capabilities: ["HDD", "Pipeline", "CHDD"],
    overview: "Nigeria's longest functional Continuous Horizontal Directional Drilling (CHDD) project - installing 12 kilometers of 10-inch pipeline in a single continuous operation through challenging Niger Delta terrain.",
    challenge: "The OML34 field required a 12km pipeline crossing through extremely difficult swamp and riverine terrain with multiple water bodies, protected areas, and communities that made conventional pipeline installation impossible. The project demanded the longest continuous HDD ever attempted in Nigeria.",
    solution: "Enikkom deployed our advanced HDD fleet with 500T pullback capacity rigs and established a continuous drilling operation spanning months. Our partnership with HDDThailand provided specialized downhole tools and technical expertise. Comprehensive mud management and real-time trajectory monitoring ensured precision throughout the 12km distance.",
    results: [
      { label: "Total Length", value: "12 km" },
      { label: "Pipe Diameter", value: "10 inches" },
      { label: "Method", value: "Continuous HDD" },
      { label: "Duration", value: "14 months" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project maintained an impeccable safety record with zero LTI throughout the 14-month duration. Daily JSA reviews, comprehensive toolbox talks, and environmental monitoring ensured zero ecological impact to the sensitive Niger Delta environment.",
    clientQuote: {
      text: "Enikkom demonstrated exceptional capability in delivering this record-breaking CHDD project. Their technical expertise and commitment to safety made this complex crossing a complete success.",
      author: "Project Manager",
      role: "NPDC"
    },
    heroImage: hddNightPanorama,
    scope: [
      "Engineering design and feasibility study",
      "Continuous HDD pilot bore drilling (12km)",
      "Progressive reaming operations",
      "10\" HDPE pipeline fabrication and pullback",
      "Real-time trajectory monitoring",
      "Mud recycling and environmental management",
      "Hydrostatic testing and commissioning"
    ],
    youtubeId: "uv_ozmjIo-E",
    recordBadge: "Nigeria's Longest CHDD",
    gallery: [
      { src: hddNightPanorama, alt: "OML34 HDD Site Night Operations", caption: "Night operations at OML34 site with full lighting" },
      { src: hddRigNight, alt: "500T Maxi HDD Rig", caption: "500-ton maxi HDD rig in operation" },
      { src: hddEquipmentFleet, alt: "HDD Equipment Fleet", caption: "Complete HDD equipment spread" },
      { src: hddEquipmentFleet2, alt: "Drill Pipe Handling", caption: "Drill pipe handling operations" },
      { src: hddDrillString, alt: "Drill String Assembly", caption: "Drill string assembly and preparation" },
      { src: partnershipHddThailand, alt: "HDDThailand Partnership", caption: "Technical partnership with HDDThailand" },
      { src: partnershipHddThailand2, alt: "Specialized Downhole Tools", caption: "Specialized downhole tools deployment" },
      { src: scopeOperations, alt: "Scope Rig Operations", caption: "Scope rig operations monitoring" },
      { src: scopeOperations2, alt: "Real-time Monitoring", caption: "Real-time trajectory monitoring" },
      { src: scopeOperations3, alt: "Drilling Control Center", caption: "Drilling control and navigation" },
      { src: teamSafety, alt: "Safety Briefing", caption: "Daily safety briefing with crew" },
      { src: workersPpe, alt: "Workers in PPE", caption: "Crew in full PPE at OML34 site" },
    ]
  },
  "otumara-escravos": {
    title: "Otumara-Escravos Bundled HDD Crossing",
    client: "Saipem Contracting Nigeria / SPDC",
    location: "Delta State, Nigeria",
    year: "2016",
    capabilities: ["HDD", "Pipeline"],
    overview: "Africa's longest bundled pipeline HDD crossing - 2.78km installation of 12-inch and 3-inch bundled pipelines under the Escravos River system for Shell Petroleum Development Company.",
    challenge: "The Otumara-Escravos project required crossing one of the Niger Delta's widest river systems with bundled pipelines. The 2.78km distance was unprecedented for a bundled crossing in Africa, requiring precise trajectory control to maintain pipe separation throughout.",
    solution: "Enikkom's technical team designed a specialized bundled crossing configuration with the 12\" and 3\" pipelines secured in precise alignment. Our 500T HDD rig with real-time gyro guidance achieved the required accuracy over the record distance. The entire bundle was pulled back in a single operation.",
    results: [
      { label: "Crossing Length", value: "2.78 km" },
      { label: "12\" Pipeline", value: "Completed" },
      { label: "3\" Pipeline", value: "Bundled" },
      { label: "Completion", value: "April 2016" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project was completed with zero incidents despite the technical complexity. Environmental monitoring confirmed zero impact on the Escravos River ecosystem. Daily safety briefings and comprehensive PTW system ensured continuous safety awareness.",
    clientQuote: {
      text: "We are delighted with our experience of working with ENIKKOM on this challenging crossing. The team demonstrated unmatched professionalism. It was a pleasure working with the team.",
      author: "Construction Manager",
      role: "Saipem Contracting Nigeria"
    },
    heroImage: otumaraEscravos,
    scope: [
      "Geotechnical investigation",
      "Bundled crossing design and engineering",
      "2.78km HDD pilot bore drilling",
      "Progressive reaming to 24\" diameter",
      "12\" + 3\" bundled pipeline fabrication",
      "Single-pull bundled installation",
      "As-built survey and handover"
    ],
    recordBadge: "Africa's Longest Bundled HDD",
    gallery: [
      { src: otumaraEscravos, alt: "Otumara-Escravos HDD Site", caption: "Main HDD site at Otumara crossing" },
      { src: otumaraEscravos2, alt: "Escravos River Crossing", caption: "Escravos River aerial view" },
      { src: hddRigNight, alt: "Night Drilling Operations", caption: "24-hour drilling operations" },
      { src: hddEquipmentFleet3, alt: "HDD Rig Setup", caption: "500T rig setup at entry point" },
      { src: pipeHandling, alt: "Bundled Pipe Preparation", caption: "12\"+3\" bundled pipe preparation" },
      { src: weldingCrew, alt: "Pipeline Welding", caption: "API 1104 pipeline welding" },
      { src: pipelineCrew, alt: "Pipe String Fabrication", caption: "Pipe string fabrication onshore" },
      { src: drillingOps4, alt: "Drilling Operations", caption: "Pilot bore drilling in progress" },
      { src: drillingOps5, alt: "Reaming Operations", caption: "Progressive reaming operations" },
      { src: teamSafety, alt: "Safety Meeting", caption: "Daily safety and toolbox meeting" },
    ]
  },
  "atlas-cove-mosimi": {
    title: "Atlas Cove-Mosimi Emergency Pipeline",
    client: "NNPC / PPMC (Pipelines and Products Marketing Company)",
    location: "Lagos-Ogun States, Nigeria",
    year: "2017",
    capabilities: ["HDD", "Pipeline"],
    overview: "Africa's longest single HDD drill - a 3.1km, 16-inch pipeline crossing for the emergency reconstruction of the Atlas Cove to Mosimi petroleum products pipeline, a critical national infrastructure asset.",
    challenge: "The Atlas Cove-Mosimi pipeline was a critical national fuel supply artery that required emergency reconstruction. The route crossed the Lagos Lagoon and environmentally sensitive areas, making conventional open-cut construction impossible. Speed was essential to restore national fuel supply.",
    solution: "Enikkom mobilized rapidly and completed what became Africa's longest single HDD drill at 3.1km. Our 500T rig with advanced downhole tools maintained precise trajectory across the entire distance. The 16\" pipeline was fabricated onshore and installed in a single pullback operation.",
    results: [
      { label: "Crossing Length", value: "3.1 km" },
      { label: "Pipe Diameter", value: "16 inches" },
      { label: "Completion", value: "April 2017" },
      { label: "Client", value: "NNPC/PPMC" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Despite the emergency nature of the project, full HSE protocols were maintained throughout. Zero LTI record achieved. Environmental monitoring confirmed minimal impact on the Lagos Lagoon ecosystem.",
    heroImage: atlasCoveMosimi,
    scope: [
      "Rapid mobilization and site setup",
      "3.1km HDD pilot bore (Africa's longest)",
      "Progressive reaming to final diameter",
      "16\" steel pipeline fabrication",
      "Single-pull installation",
      "Hydrostatic testing and commissioning"
    ],
    recordBadge: "Africa's Longest Single Drill",
    gallery: [
      { src: atlasCoveMosimi, alt: "Atlas Cove HDD Site", caption: "HDD entry point at Atlas Cove" },
      { src: atlasCoveMosimi2, alt: "Pipeline String Preparation", caption: "16\" pipeline string preparation" },
      { src: hddEquipmentFleet4, alt: "500T HDD Rig", caption: "500-ton HDD rig deployed" },
      { src: pipeLaying, alt: "Pipeline Laying Operations", caption: "Pipeline fabrication and laying" },
      { src: craneOperations, alt: "Crane Operations", caption: "Heavy lift operations" },
      { src: multiCraneOps, alt: "Multi-Crane Setup", caption: "Multi-crane pipe handling" },
      { src: drillingOps6, alt: "Drilling Progress", caption: "Drilling progress at 2km mark" },
      { src: drillingOps7, alt: "Exit Point Operations", caption: "Exit point at Mosimi" },
      { src: weldingCrew, alt: "Field Welding", caption: "Field joint welding operations" },
      { src: trippingSafety, alt: "Safety Protocols", caption: "Safe tripping operations" },
    ]
  },
  "lekki-gas-pipeline": {
    title: "Lekki Gas Pipeline Project (LGPP)",
    client: "Dangote Fertilizer Limited / Zakhem Construction",
    location: "Lagos, Nigeria",
    year: "2019",
    capabilities: ["HDD", "Pipeline"],
    overview: "Major gas pipeline HDD crossing for the Lekki Gas Pipeline Project - a 36-inch x 1.5km swamp and river crossing delivering natural gas to Dangote's fertilizer complex, one of the largest in Africa.",
    challenge: "The project required crossing the Lagos lagoon and swamp areas to connect gas supply infrastructure to the Dangote Fertilizer plant. The crossing involved challenging geological conditions, tidal variations, and strict project timelines to support the plant's commissioning schedule.",
    solution: "Enikkom deployed our 500T HDD rig with advanced gyro guidance for the 1.5km crossing. The 36-inch steel pipeline was pre-fabricated onshore and pulled back in a single operation. Comprehensive geotechnical investigation informed the crossing design to avoid geological hazards.",
    results: [
      { label: "Crossing Length", value: "1.5 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Completion", value: "June 2019" },
      { label: "Client", value: "Dangote/Zakhem" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Marine safety protocols were rigorously implemented. All personnel completed water safety training. Environmental monitoring confirmed zero impact on the lagoon ecosystem. The project was completed ahead of schedule.",
    clientQuote: {
      text: "Outstanding job on the 36\" x 1.5km swamp/river crossing. Impressive drilling work done by your team. We have no hesitation in recommending Enikkom for similar projects.",
      author: "Project Director",
      role: "Dangote Fertilizer Limited"
    },
    heroImage: lekiGasPipeline,
    scope: [
      "Geotechnical investigation and crossing design",
      "36\" HDD pilot bore and reaming operations",
      "Pipeline prefabrication (1.5km string)",
      "Single-pull pipeline installation",
      "Tie-in works at both ends",
      "Hydrostatic testing and commissioning"
    ],
    gallery: [
      { src: lekiGasPipeline, alt: "Lekki Gas Pipeline Site", caption: "Main HDD site for Lekki Gas Pipeline" },
      { src: hddEquipmentFleet, alt: "HDD Equipment Spread", caption: "Complete equipment spread" },
      { src: pipeLaying, alt: "36\" Pipeline Fabrication", caption: "36-inch pipeline string fabrication" },
      { src: multiCraneOps, alt: "Heavy Lift Operations", caption: "Multi-crane pipeline handling" },
      { src: nipcoIbafo, alt: "Drilling Operations", caption: "HDD drilling operations" },
      { src: nipcoIbafo2, alt: "Mud System", caption: "Mud recycling system" },
      { src: nipcoIbafo3, alt: "Pipe Welding", caption: "Pipeline welding operations" },
      { src: teamSafety, alt: "HSE Meeting", caption: "Daily HSE briefing" },
    ]
  },
  "yenagoa-40-crossing": {
    title: "Yenagoa 40\" HDD River Crossing",
    client: "Daewoo E&C / Shell SPDC",
    location: "Bayelsa State, Nigeria",
    year: "2010",
    capabilities: ["HDD", "Pipeline"],
    overview: "Nigeria's largest pipeline HDD crossing - a 40-inch x 760m crossing at 100ft (30m) depth, setting the record for the largest diameter trenchless pipeline installation in Nigeria.",
    challenge: "The Yenagoa project required crossing a major river with Nigeria's largest diameter HDD pipeline - 40 inches. The 100ft depth requirement added significant technical complexity, requiring precise buoyancy control and pullback force management for the heavy steel pipe string.",
    solution: "Enikkom deployed our largest HDD equipment for this record-breaking crossing. The 40\" steel pipe string was carefully fabricated and prepared with buoyancy control systems. The pullback operation was executed with precision, managing the significant forces required for the heavy pipe at depth.",
    results: [
      { label: "Crossing Length", value: "760 m" },
      { label: "Pipe Diameter", value: "40 inches" },
      { label: "Depth Below River", value: "100 ft (30m)" },
      { label: "Completion", value: "February 2010" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project maintained exemplary safety standards despite the technical challenges of the largest diameter HDD crossing in Nigeria. Zero incidents recorded throughout the project duration.",
    heroImage: hddRigNight,
    scope: [
      "Geotechnical investigation",
      "Crossing design for 40\" diameter",
      "HDD pilot bore and progressive reaming",
      "40\" steel pipeline prefabrication",
      "Buoyancy control system installation",
      "Pipe pullback at 100ft depth",
      "As-built survey and handover"
    ],
    recordBadge: "Nigeria's Largest Pipeline Crossing",
    gallery: [
      { src: hddRigNight, alt: "HDD Rig Night Operations", caption: "500T rig for 40\" crossing" },
      { src: hddEquipmentFleet2, alt: "Equipment Setup", caption: "Heavy equipment mobilization" },
      { src: drillingOps4, alt: "Pilot Bore", caption: "Pilot bore drilling" },
      { src: drillingOps5, alt: "Reaming Operations", caption: "Large diameter reaming" },
      { src: pipeHandling, alt: "40\" Pipe Handling", caption: "40-inch pipe string preparation" },
      { src: multiCraneOps, alt: "Crane Operations", caption: "Multi-crane heavy lift" },
    ]
  },
  "elps-phase-2": {
    title: "Escravos-Lagos Gas Pipeline Phase II",
    client: "Zakhem Construction / NNPC",
    location: "Niger Delta to Lagos, Nigeria",
    year: "2018-2019",
    capabilities: ["HDD", "Pipeline"],
    overview: "Major gas transmission infrastructure - 36-inch pipeline HDD crossings totaling 7.2km across multiple river and creek crossings for the Escravos-Lagos Pipeline System Phase II expansion.",
    challenge: "ELPS II required multiple HDD crossings across some of the Niger Delta's most challenging waterways. The 36-inch diameter and cumulative 7.2km of HDD crossings required extensive planning and sequential execution across multiple sites.",
    solution: "Enikkom mobilized multiple HDD rigs to execute crossings in parallel where possible. Our experienced crews completed 8 major crossings with a combined length of 7.2km. Strict quality control ensured consistent weld quality and coating integrity across all crossings.",
    results: [
      { label: "Total HDD Length", value: "7.2 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Number of Crossings", value: "8" },
      { label: "Duration", value: "18 months" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Comprehensive HSE management system implementation across all 8 crossing sites. Regular third-party audits confirmed compliance with international standards. Zero environmental incidents.",
    clientQuote: {
      text: "ECL brings a level of client-side understanding to each and every project. Their technical capability and local expertise are unmatched. We have no hesitation in recommending ECL for HDD projects.",
      author: "Project Director",
      role: "Zakhem Construction Nigeria Limited"
    },
    heroImage: pipeLaying,
    scope: [
      "Multi-site mobilization and logistics",
      "8 HDD crossings (combined 7.2km)",
      "36\" pipeline fabrication and coating",
      "Sequential crossing execution",
      "Tie-in works at all locations",
      "Comprehensive testing program"
    ],
    gallery: [
      { src: pipeLaying, alt: "Pipeline Laying", caption: "36\" pipeline construction" },
      { src: hddEquipmentFleet3, alt: "Multi-rig Deployment", caption: "Multiple rigs deployed" },
      { src: weldingCrew, alt: "Welding Operations", caption: "High-quality pipeline welding" },
      { src: pipelineCrew, alt: "Crew Operations", caption: "Experienced pipeline crew" },
      { src: drillingOps6, alt: "Drilling Progress", caption: "Creek crossing drilling" },
      { src: drillingOps7, alt: "Site Operations", caption: "River crossing operations" },
      { src: teamSafety, alt: "Safety Standards", caption: "HSE compliance across sites" },
      { src: workersPpe, alt: "PPE Compliance", caption: "Full PPE enforcement" },
    ]
  },
  "ob3-river-niger": {
    title: "OB3 River Niger 48\" Microtunnelling",
    client: "NNPC / OB3 Project Consortium",
    location: "River Niger Crossing, Nigeria",
    year: "2019",
    capabilities: ["HDD", "Microtunnelling", "Pipeline"],
    overview: "A landmark 48-inch x 1.8km pipeline crossing under the River Niger using a combination of HDD and Direct Pipe Installation (DPI) - one of the most technically complex crossings ever attempted in West Africa.",
    challenge: "The OB3 gas pipeline required crossing the mighty River Niger - Nigeria's largest river - with a 48-inch diameter pipe. The geological conditions presented extreme complexity with variable soil strata including sand, clay, and rock formations. The water depth and river width made conventional HDD extremely challenging.",
    solution: "Enikkom partnered with MTS Germany to deploy Direct Pipe Installation (DPI) technology - a hybrid of HDD and microtunnelling. This allowed simultaneous drilling and pipe installation with real-time steering control. Extensive geotechnical investigation using borehole data informed the crossing profile design. Cofferdam construction and dewatering systems managed groundwater.",
    results: [
      { label: "Crossing Length", value: "1.8 km" },
      { label: "Pipe Diameter", value: "48 inches" },
      { label: "Technology", value: "HDD + DPI" },
      { label: "Equipment", value: "MTS Germany" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Complex marine safety protocols implemented for River Niger operations. Cofferdam construction required specialized safety measures. Zero LTI maintained throughout despite the technical complexity.",
    heroImage: hddNightPanorama,
    scope: [
      "Geotechnical investigation and design",
      "Cofferdam construction and dewatering",
      "Direct Pipe Installation (DPI) setup",
      "48\" pipeline fabrication",
      "HDD + microtunnelling combination",
      "Real-time trajectory monitoring",
      "Hydrostatic testing and commissioning"
    ],
    youtubeId: "PrMQDDb6ELA",
    recordBadge: "Largest DPI Crossing in Africa",
    gallery: [
      { src: hddNightPanorama, alt: "OB3 Night Operations", caption: "24-hour operations at River Niger" },
      { src: hddEquipmentFleet4, alt: "DPI Equipment", caption: "Direct Pipe Installation equipment" },
      { src: catExcavator, alt: "Cofferdam Construction", caption: "Cofferdam excavation works" },
      { src: craneOperations, alt: "Heavy Lifts", caption: "Heavy equipment mobilization" },
      { src: multiCraneOps, alt: "48\" Pipe Handling", caption: "48-inch pipe string handling" },
      { src: drillingOps4, alt: "Drilling Operations", caption: "Pilot bore operations" },
      { src: scopeOperations, alt: "Control Center", caption: "Real-time monitoring center" },
      { src: teamSafety, alt: "HSE Standards", caption: "Safety briefings and compliance" },
    ]
  },
  "ekiadolor-deep-valley": {
    title: "Ekiadolor Deep Valley HDD Crossing",
    client: "NPDC / NNPC",
    location: "Edo State, Nigeria",
    year: "2018",
    capabilities: ["HDD", "Pipeline"],
    overview: "Nigeria's deepest HDD crossing - a 36-inch x 1.2km pipeline installation at 80 meters depth through extremely challenging geological conditions including rock, sand, coal, and clay formations.",
    challenge: "The Ekiadolor crossing presented unprecedented depth requirements at 80m - the deepest HDD ever attempted in Nigeria. The geological survey revealed a complex formation with alternating layers of rock, sand, coal seams, and clay. Initial drilling attempts encountered tool losses and steering challenges in the variable formation.",
    solution: "After extensive analysis using 2D/3D Electrical Resistivity Imaging, Enikkom's engineering team designed a custom hybrid reamer specifically for the rock/sand/coal/clay formation. The tool combined rock cutting elements with sand displacement features. Three drilling attempts refined the approach, ultimately achieving success with the specialized tooling and optimized drilling parameters.",
    results: [
      { label: "Crossing Length", value: "1.2 km" },
      { label: "Pipe Diameter", value: "36 inches" },
      { label: "Maximum Depth", value: "80 meters" },
      { label: "Soil Analysis", value: "2D/3D ERI" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Deep drilling operations required enhanced safety protocols. Mud pressure monitoring critical at 80m depth. Zero incidents despite the technical challenges and multiple drilling attempts.",
    clientQuote: {
      text: "The Ekiadolor crossing pushed the boundaries of HDD capability in Nigeria. Enikkom's persistence and engineering innovation made what seemed impossible a reality.",
      author: "Project Engineer",
      role: "NPDC"
    },
    heroImage: drillingSite2,
    scope: [
      "2D/3D Electrical Resistivity Imaging survey",
      "Custom hybrid reamer design and fabrication",
      "36\" HDD pilot bore at 80m depth",
      "Progressive reaming operations",
      "Pipeline fabrication and coating",
      "Single-pull installation",
      "As-built survey and handover"
    ],
    recordBadge: "Nigeria's Deepest HDD Crossing",
    gallery: [
      { src: drillingSite2, alt: "Ekiadolor Site", caption: "Deep valley crossing site" },
      { src: hddEquipmentFleet, alt: "HDD Setup", caption: "Heavy-duty HDD equipment" },
      { src: hddDrillString, alt: "Drill String", caption: "Specialized drill string assembly" },
      { src: scopeOperations2, alt: "Depth Monitoring", caption: "Real-time depth monitoring" },
      { src: drillingOps5, alt: "Drilling Operations", caption: "Deep drilling operations" },
      { src: trippingSafety, alt: "Safe Operations", caption: "Safe tripping procedures" },
    ]
  },
  "nipco-gas-distribution": {
    title: "NIPCO Gas Distribution Network",
    client: "NIPCO PLC",
    location: "Lagos State, Nigeria",
    year: "2009",
    capabilities: ["HDD", "Pipeline"],
    overview: "50km urban gas distribution network installation with extensive HDD crossings for roads, utilities, and waterways in the Lagos metropolitan area.",
    challenge: "Installing a 50km gas distribution network across Lagos required minimizing disruption to one of Africa's most congested urban environments. Numerous road crossings, existing utilities, and waterways demanded trenchless solutions.",
    solution: "Enikkom executed extensive HDD crossings throughout the network using a range of rig sizes for different pipe diameters (4\", 8\", 12\"). Careful coordination with Lagos State authorities minimized traffic disruption. GPS-guided navigation avoided existing utilities.",
    results: [
      { label: "Total Network", value: "50 km" },
      { label: "Pipe Diameters", value: "4\"/8\"/12\"" },
      { label: "HDD Crossings", value: "50+" },
      { label: "Completion", value: "August 2009" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "Urban safety protocols strictly observed throughout. Traffic management plans coordinated with Lagos authorities. Zero third-party incidents despite work in densely populated areas.",
    clientQuote: {
      text: "Enikkom has provided Horizontal Directional Drilling services to our company, having satisfied our requirements for efficient work. We highly recommend their services.",
      author: "Operations Manager",
      role: "NIPCO PLC"
    },
    heroImage: nipcoIbafo,
    scope: [
      "Network design and engineering",
      "50+ HDD road and utility crossings",
      "Multi-diameter pipeline installation",
      "Urban traffic management",
      "Pressure testing and commissioning",
      "As-built documentation"
    ],
    gallery: [
      { src: nipcoIbafo, alt: "NIPCO Site Operations", caption: "Urban HDD crossing operations" },
      { src: nipcoIbafo2, alt: "Road Crossing", caption: "Road crossing without disruption" },
      { src: nipcoIbafo3, alt: "Pipeline Installation", caption: "Gas pipeline installation" },
      { src: nipcoHddOps, alt: "HDD Equipment", caption: "Compact urban HDD rig" },
      { src: pipeHandling, alt: "Pipe Handling", caption: "Pipe handling in urban area" },
      { src: teamSafety, alt: "Safety Protocols", caption: "Urban safety protocols" },
    ]
  },
  "calabar-gas-transmission": {
    title: "Calabar Gas Transmission Pipeline",
    client: "CMES / NDPHC",
    location: "Cross River State, Nigeria",
    year: "2015",
    capabilities: ["HDD", "Pipeline"],
    overview: "24-inch x 21.5km gas transmission pipeline construction with multiple HDD crossings for the Calabar Gas Transmission Project, providing critical gas supply infrastructure for power generation.",
    challenge: "The 21.5km pipeline route traversed multiple waterways and environmentally sensitive areas in Cross River State. The project required coordinating pipeline construction with multiple HDD crossings while maintaining strict environmental compliance.",
    solution: "Enikkom executed both the conventional pipeline construction and all HDD crossings under an integrated EPC approach. Multiple HDD rigs were deployed for parallel execution of crossings. Advanced coating systems ensured long-term pipeline integrity.",
    results: [
      { label: "Pipeline Length", value: "21.5 km" },
      { label: "Pipe Diameter", value: "24 inches" },
      { label: "HDD Crossings", value: "Multiple" },
      { label: "Completion", value: "July 2015" },
      { label: "LTI Record", value: "Zero" },
    ],
    hseNotes: "The project was completed with zero LTI incidents. Environmental monitoring confirmed compliance with Cross River State environmental requirements. Community engagement maintained positive relations throughout.",
    heroImage: pipeLaying,
    scope: [
      "Engineering, Procurement & Construction",
      "ROW preparation and access construction",
      "24\" pipeline fabrication and welding",
      "Multiple HDD river/creek crossings",
      "Field joint coating",
      "Hydrostatic testing and commissioning"
    ],
    gallery: [
      { src: pipeLaying, alt: "Pipeline Construction", caption: "24\" pipeline laying operations" },
      { src: weldingCrew, alt: "Field Welding", caption: "API 1104 field welding" },
      { src: pipelineCrew, alt: "Pipeline Crew", caption: "Experienced pipeline crew" },
      { src: hddEquipmentFleet3, alt: "HDD Operations", caption: "River crossing HDD" },
      { src: drillingOps6, alt: "Creek Crossing", caption: "Creek crossing drilling" },
      { src: teamSafety, alt: "Safety Meeting", caption: "Daily safety briefings" },
    ]
  },
  "river-niger-historic": {
    title: "River Niger Historic HDD Crossing",
    client: "NNPC",
    location: "Niger State, Nigeria",
    year: "2003",
    capabilities: ["HDD", "Pipeline"],
    overview: "Nigeria's first-ever Horizontal Directional Drilling (HDD) crossing - a pioneering project that introduced trenchless pipeline technology to Nigeria and set the foundation for Enikkom's leadership in the field.",
    challenge: "In 2003, HDD technology was virtually unknown in Nigeria. The River Niger crossing required bringing equipment, expertise, and technology from abroad while training local crews and establishing operational procedures in an entirely new market.",
    solution: "Enikkom's founder, Engr. Edward Amene, led the pioneering effort to introduce HDD to Nigeria. International partnerships provided equipment and initial expertise, while intensive local training built Nigerian capacity. The successful crossing proved the viability of HDD for Nigeria's challenging terrain.",
    results: [
      { label: "Achievement", value: "First HDD in Nigeria" },
      { label: "Year", value: "2003" },
      { label: "Location", value: "River Niger" },
      { label: "Client", value: "NNPC" },
      { label: "Legacy", value: "Industry Pioneer" },
    ],
    hseNotes: "Established safety standards that would become the foundation for all future Enikkom HDD operations. Zero incidents on this historic first crossing.",
    heroImage: hddRigNight,
    scope: [
      "Technology introduction to Nigeria",
      "Equipment importation and setup",
      "Local crew training and capacity building",
      "HDD pilot bore and reaming",
      "Pipeline installation",
      "Industry pioneering achievement"
    ],
    recordBadge: "First HDD in Nigeria",
    gallery: [
      { src: hddRigNight, alt: "Historic HDD Rig", caption: "First HDD rig in Nigeria" },
      { src: hddEquipmentFleet2, alt: "Pioneer Equipment", caption: "Pioneering HDD equipment" },
      { src: hddTeam1, alt: "Pioneer Team", caption: "The pioneering HDD team" },
      { src: teamSafety, alt: "Training", caption: "Local crew training" },
    ]
  },
};

const relatedProjects = [
  {
    title: "OML34 Continuous HDD",
    location: "Niger Delta",
    metric: "12km",
    metricLabel: "Nigeria's longest CHDD",
    tags: ["HDD"],
    href: "/projects/oml34-chdd",
    thumbnail: hddNightPanorama,
  },
  {
    title: "Lekki Gas Pipeline",
    location: "Lagos",
    metric: "36\" x 1.5km",
    metricLabel: "Dangote Fertilizer",
    tags: ["HDD"],
    href: "/projects/lekki-gas-pipeline",
    thumbnail: lekiGasPipeline,
  },
  {
    title: "Otumara-Escravos",
    location: "Delta State",
    metric: "2.78km",
    metricLabel: "Africa's longest bundled",
    tags: ["HDD"],
    href: "/projects/otumara-escravos",
    thumbnail: otumaraEscravos,
  },
  {
    title: "Atlas Cove-Mosimi",
    location: "Lagos-Ogun",
    metric: "3.1km",
    metricLabel: "Africa's longest drill",
    tags: ["HDD"],
    href: "/projects/atlas-cove-mosimi",
    thumbnail: atlasCoveMosimi,
  },
  {
    title: "OB3 River Niger 48\"",
    location: "River Niger",
    metric: "48\" x 1.8km",
    metricLabel: "HDD + DPI Technology",
    tags: ["HDD", "Microtunnelling"],
    href: "/projects/ob3-river-niger",
    thumbnail: hddNightPanorama,
  },
  {
    title: "Ekiadolor Deep Valley",
    location: "Edo State",
    metric: "80m Depth",
    metricLabel: "Nigeria's deepest HDD",
    tags: ["HDD"],
    href: "/projects/ekiadolor-deep-valley",
    thumbnail: drillingSite2,
  },
];

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Get CMS content for this project
  const pageSlug = slug ? slugToPageSlug[slug] || '' : '';
  const { content, isLoading } = usePageContent(pageSlug);

  // Filter out current project from related projects
  const filteredRelatedProjects = relatedProjects.filter(p => !p.href.includes(slug || "")).slice(0, 3);

  if (!project) {
    return (
      <Layout>
        <div className="section-padding container-wide text-center py-24">
          <h1 className="mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested project page does not exist or is coming soon.</p>
          <Button asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Merge CMS content with defaults
  const heroContent = content.hero || {};
  const overviewContent = content.overview || {};
  const challengeContent = content.challenge || {};
  const solutionContent = content.solution || {};
  const resultsContent = content.results || {};
  const scopeContent = content.scope || {};
  
  // Build merged data
  const displayTitle = heroContent.title || project.title;
  const displayClient = heroContent.client || project.client;
  const displayLocation = heroContent.location || project.location;
  const displayYear = heroContent.year || project.year;
  const displayRecordBadge = heroContent.recordBadge || project.recordBadge;
  const displayHeroImage = heroContent.backgroundImage || project.heroImage;
  const displayOverview = overviewContent.overview || project.overview;
  const displayChallenge = challengeContent.challenge || project.challenge;
  const displaySolution = solutionContent.solution || project.solution;
  const displayResults = resultsContent.results?.length > 0 ? resultsContent.results : project.results;
  const displayScope = scopeContent.scope?.length > 0 ? scopeContent.scope : project.scope;

  return (
    <Layout>
      <Hero
        title={displayTitle}
        subtitle={`${displayClient} • ${displayLocation}`}
        badge={displayRecordBadge}
        backgroundImage={displayHeroImage}
        size="default"
        pageSlug={pageSlug}
        sectionKey="hero"
        imageField="backgroundImage"
      />

      <section className="section-padding">
        <div className="container-wide">
          {/* Back Link */}
          <Link to="/projects" className="inline-flex items-center text-sm text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all projects
          </Link>

          {/* Record Badge if exists */}
          {displayRecordBadge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                <Trophy className="h-4 w-4" />
                {displayRecordBadge}
              </span>
            </motion.div>
          )}

          {/* Project Meta */}
          <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{displayLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{displayYear}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{displayClient}</span>
            </div>
            <div className="flex gap-2">
              {project.capabilities.map((cap) => (
                <span key={cap} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* YouTube Video Embed */}
              {project.youtubeId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Project Video
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0`}
                      title={displayTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  <EditableText
                    value={overviewContent.section_title || "Project Overview"}
                    pageSlug={pageSlug}
                    sectionKey="overview"
                    field="section_title"
                  />
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  <EditableText
                    value={displayOverview}
                    pageSlug={pageSlug}
                    sectionKey="overview"
                    field="overview"
                    multiline
                  />
                </p>
              </motion.div>

              {/* Scope of Work */}
              {displayScope && displayScope.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    <EditableText
                      value={scopeContent.section_title || "Scope of Work"}
                      pageSlug={pageSlug}
                      sectionKey="scope"
                      field="section_title"
                    />
                  </h2>
                  <ul className="space-y-2">
                    {displayScope.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          <EditableText
                            value={item}
                            pageSlug={pageSlug}
                            sectionKey="scope"
                            field={`item_${index}`}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  <EditableText
                    value={challengeContent.section_title || "The Challenge"}
                    pageSlug={pageSlug}
                    sectionKey="challenge"
                    field="section_title"
                  />
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={displayChallenge}
                    pageSlug={pageSlug}
                    sectionKey="challenge"
                    field="challenge"
                    multiline
                  />
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  <EditableText
                    value={solutionContent.section_title || "Our Solution"}
                    pageSlug={pageSlug}
                    sectionKey="solution"
                    field="section_title"
                  />
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={displaySolution}
                    pageSlug={pageSlug}
                    sectionKey="solution"
                    field="solution"
                    multiline
                  />
                </p>
              </motion.div>

              {/* HSE Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-900"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold">
                    <EditableText
                      value={content.hse?.section_title || "HSE & Quality Performance"}
                      pageSlug={pageSlug}
                      sectionKey="hse"
                      field="section_title"
                    />
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={content.hse?.notes || project.hseNotes}
                    pageSlug={pageSlug}
                    sectionKey="hse"
                    field="notes"
                    multiline
                  />
                </p>
              </motion.div>

              {/* Client Quote */}
              {project.clientQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-muted/30 p-8 rounded-lg border-l-4 border-primary"
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <blockquote className="text-lg italic text-foreground mb-4">
                    "<EditableText
                      value={content.quote?.text || project.clientQuote.text}
                      pageSlug={pageSlug}
                      sectionKey="quote"
                      field="text"
                      multiline
                    />"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        <EditableText
                          value={content.quote?.author || project.clientQuote.author}
                          pageSlug={pageSlug}
                          sectionKey="quote"
                          field="author"
                        />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <EditableText
                          value={content.quote?.role || project.clientQuote.role}
                          pageSlug={pageSlug}
                          sectionKey="quote"
                          field="role"
                        />
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Results */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6 sticky top-24"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  <EditableText
                    value={resultsContent.section_title || "Project Results"}
                    pageSlug={pageSlug}
                    sectionKey="results"
                    field="section_title"
                  />
                </h3>
                <div className="space-y-4">
                  {displayResults.map((result: { label: string; value: string }, index: number) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <span className="text-sm text-muted-foreground">
                        <EditableText
                          value={result.label}
                          pageSlug={pageSlug}
                          sectionKey="results"
                          field={`result_${index}_label`}
                        />
                      </span>
                      <span className="font-semibold text-primary">
                        <EditableText
                          value={result.value}
                          pageSlug={pageSlug}
                          sectionKey="results"
                          field={`result_${index}_value`}
                        />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/contact">Request a Quote</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Discuss Your Project</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <ImageIcon className="h-5 w-5 text-primary" />
                <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-primary">Project Gallery</p>
              </div>
              <h2 className="mb-3">Project Documentation</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Authentic photographs documenting our work on this project.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group cursor-pointer aspect-[4/3] rounded-xl overflow-hidden relative"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium">{image.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            <motion.div
              className="max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />
              <div className="mt-5 text-center">
                <h3 className="text-white text-xl font-bold">{selectedImage.alt}</h3>
                {selectedImage.caption && (
                  <p className="text-white/60 text-[15px] mt-2">{selectedImage.caption}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Projects */}
      {filteredRelatedProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="text-2xl font-semibold mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredRelatedProjects.map((project) => (
                <CaseStudyCard
                  key={project.href}
                  {...project}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        headline="Ready to Start Your Project?"
        primaryCTA={{ label: "Request a Quote", href: "/contact" }}
      />
    </Layout>
  );
}
